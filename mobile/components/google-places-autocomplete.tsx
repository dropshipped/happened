import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface GooglePlacesAutocompleteProps {
  placeholder?: string;
  onSelect: (data: any, details: any) => void;
  apiKey?: string;
  styles?: any;
}

// For Expo, environment variables need to be prefixed with EXPO_PUBLIC_
// They're available at runtime via process.env
const getApiKey = () => {
  // Check if running in Expo and has environment variable
  if (typeof process !== "undefined" && process.env) {
    return (
      process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ||
      process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY ||
      ""
    );
  }
  return "";
};

export default function GooglePlacesAutocomplete({
  placeholder = "Search for a location...",
  onSelect,
  apiKey,
  styles: customStyles = {},
}: GooglePlacesAutocompleteProps) {
  const [searchText, setSearchText] = useState("");
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchPredictions = async (input: string) => {
    console.log("fetchPredictions called with:", input);
    if (input.length < 2) {
      setPredictions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const key = apiKey || getApiKey();
      console.log("API Key:", key ? "Found" : "NOT FOUND");
      if (!key) {
        console.warn(
          "Google Places API key not configured. Add EXPO_PUBLIC_GOOGLE_PLACES_API_KEY to your .env.local or pass as prop."
        );
        setIsLoading(false);
        return;
      }

      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&key=${key}`;
      console.log("Fetching from URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.predictions) {
        console.log("Found predictions:", data.predictions.length);
        setPredictions(data.predictions);
        setShowSuggestions(true);
      } else {
        console.log("No predictions in response:", data);
      }
    } catch (error) {
      console.error("Autocomplete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTextChange = (text: string) => {
    console.log("Text changed:", text);
    setSearchText(text);

    // Debounce the API call
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      console.log("Debounced - fetching predictions for:", text);
      if (text.length >= 2) {
        fetchPredictions(text);
      } else {
        setPredictions([]);
        setShowSuggestions(false);
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleSelect = async (placeId: string, description: string) => {
    try {
      // Get place details to get coordinates
      const key = apiKey || getApiKey();
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.result) {
        const location = data.result.geometry.location;
        onSelect(
          { description },
          {
            geometry: {
              location: {
                lat: location.lat,
                lng: location.lng,
              },
            },
            formatted_address: data.result.formatted_address || description,
          }
        );
      }

      setSearchText(description);
      setShowSuggestions(false);
      setPredictions([]);
    } catch (error) {
      console.error("Place details error:", error);
    }
  };

  return (
    <View style={[styles.container, customStyles.container]}>
      <View style={[styles.inputContainer, customStyles.inputContainer]}>
        <TextInput
          style={[styles.input, customStyles.input]}
          placeholder={placeholder}
          value={searchText}
          onChangeText={handleTextChange}
          onFocus={() => {
            if (predictions.length > 0) setShowSuggestions(true);
          }}
        />
        {isLoading && (
          <ActivityIndicator size="small" color="#666" style={styles.loader} />
        )}
      </View>
      {showSuggestions && predictions.length > 0 && (
        <View style={[styles.listContainer, customStyles.listContainer]}>
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelect(item.place_id, item.description)}
              >
                <Text style={styles.listItemText}>{item.description}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 10,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 999,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loader: {
    position: "absolute",
    right: 15,
    top: 12,
  },
  listContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 5,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  listItemText: {
    fontSize: 14,
    color: "#333",
  },
});
