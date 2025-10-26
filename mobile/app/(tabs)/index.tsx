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

    // Animate map to the search result
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: searchLocationData.latitude,
          longitude: searchLocationData.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
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
