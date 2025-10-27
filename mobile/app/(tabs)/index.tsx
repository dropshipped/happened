import GooglePlacesAutocomplete from "@/components/google-places-autocomplete";
import LocationDrawer from "@/components/location-drawer";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SearchResult {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Recenter map when drawer closes
  useEffect(() => {
    if (!drawerVisible && searchResult && mapRef.current) {
      // Get current region to preserve zoom level
      mapRef.current.getCamera().then((camera) => {
        // Just adjust the center point without changing zoom
        mapRef.current?.animateCamera(
          {
            center: {
              latitude: searchResult.latitude,
              longitude: searchResult.longitude,
            },
            zoom: camera.zoom,
          },
          { duration: 250 }
        );
      });
    }
  }, [drawerVisible, searchResult]);

  if (errorMsg) {
    console.error(errorMsg);
  }

  const handlePlaceSelect = (data: any, details: any) => {
    const searchLocationData = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      name:
        details.name ||
        data.structured_formatting?.main_text ||
        data.description.split(",")[0],
      address: details.formatted_address || data.description,
    };
    setSearchResult(searchLocationData);
    setDrawerVisible(true);

    // Animate map to the search result (offset for drawer visibility)
    if (mapRef.current) {
      // Shift latitude to center in the visible area (drawer takes 60%, so center in top 40%)
      // To center in the top 40%, shift up by 30% of the total
      const adjustedLatitude = searchLocationData.latitude - 0.05 * 0.3;

      mapRef.current.animateToRegion(
        {
          latitude: adjustedLatitude,
          longitude: searchLocationData.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
  };

  const handlePoiClick = async (e: any) => {
    const poi = e.nativeEvent;
    if (!poi.placeId) return;

    // Close any open drawer first
    if (drawerVisible) {
      setDrawerVisible(false);
    }

    // Clear previous search result
    setSearchResult(null);

    try {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY || "";

      if (apiKey) {
        // Get place details using the place ID
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${poi.placeId}&key=${apiKey}`;
        const response = await fetch(detailsUrl);
        const data = await response.json();

        if (data.result) {
          const locationData = {
            latitude: data.result.geometry.location.lat,
            longitude: data.result.geometry.location.lng,
            name: data.result.name,
            address:
              data.result.formatted_address || data.result.vicinity || "",
          };

          setSearchResult(locationData);
          setDrawerVisible(true);

          // Animate map to the POI (offset for drawer visibility)
          if (mapRef.current) {
            // Shift latitude to center in the visible area (drawer takes 60%, so center in top 40%)
            // To center in the top 40%, shift up by 30% of the total
            const adjustedLatitude = locationData.latitude - 0.005 * 0.3;

            mapRef.current.animateToRegion(
              {
                latitude: adjustedLatitude,
                longitude: locationData.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              },
              500
            );
          }
        }
      }
    } catch (error) {
      console.error("POI click error:", error);
    }
  };

  const handleMapPress = async (e: any) => {
    const coordinate = e.nativeEvent.coordinate;
    if (!coordinate) return;

    try {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY || "";

      // First, try to find a nearby place using Google Places Nearby Search
      let locationData = null;

      if (apiKey) {
        try {
          const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate.latitude},${coordinate.longitude}&radius=50&key=${apiKey}`;
          const nearbyResponse = await fetch(nearbyUrl);
          const nearbyData = await nearbyResponse.json();

          if (nearbyData.results && nearbyData.results.length > 0) {
            const place = nearbyData.results[0];

            // Get full place details
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${apiKey}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();

            if (detailsData.result) {
              locationData = {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
                name: place.name,
                address: detailsData.result.formatted_address || place.vicinity,
              };
            }
          }
        } catch (error) {
          console.error("Places API error:", error);
        }
      }

      // Fallback to reverse geocoding if no place found
      if (!locationData) {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        });

        if (reverseGeocode.length > 0) {
          const geo = reverseGeocode[0];
          const addressParts = [
            geo.street,
            geo.city,
            geo.region,
            geo.country,
          ].filter(Boolean);

          const addressName =
            addressParts.join(", ") ||
            `Location (${coordinate.latitude.toFixed(
              4
            )}, ${coordinate.longitude.toFixed(4)})`;

          locationData = {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            name: geo.street || geo.city || addressName,
            address:
              addressParts.join(", ") ||
              `${coordinate.latitude.toFixed(
                6
              )}, ${coordinate.longitude.toFixed(6)}`,
          };
        }
      }

      if (locationData) {
        setSearchResult(locationData);
        setDrawerVisible(true);
      }
    } catch (error) {
      console.error("Map press error:", error);
    }
  };

  const initialRegion = searchResult
    ? {
        latitude: searchResult.latitude,
        longitude: searchResult.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }
    : {
        latitude: location?.coords.latitude || 37.78825,
        longitude: location?.coords.longitude || -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.OS === "ios" ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        showsBuildings={false}
        showsPointsOfInterest={true}
        onPress={handleMapPress}
        onPoiClick={handlePoiClick}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Current Location"
            description={`Lat: ${location.coords.latitude.toFixed(
              4
            )}, Lng: ${location.coords.longitude.toFixed(4)}`}
            pinColor="blue"
          />
        )}
        {searchResult && (
          <Marker
            coordinate={{
              latitude: searchResult.latitude,
              longitude: searchResult.longitude,
            }}
            title={searchResult.name}
            description={searchResult.address}
            pinColor="red"
          />
        )}
      </MapView>
      <View style={[styles.searchContainer, { top: insets.top + 10 }]}>
        <GooglePlacesAutocomplete
          onSelect={handlePlaceSelect}
          placeholder="Search for a location..."
          apiKey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY}
        />
      </View>
      <LocationDrawer
        location={searchResult}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    zIndex: 1,
  },
});
