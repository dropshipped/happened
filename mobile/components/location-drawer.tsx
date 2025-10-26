import React from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LocationInfo {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationDrawerProps {
  location: LocationInfo | null;
  visible: boolean;
  onClose: () => void;
}

export default function LocationDrawer({
  location,
  visible,
  onClose,
}: LocationDrawerProps) {
  const insets = useSafeAreaInsets();
  const translateY = React.useRef(new Animated.Value(600)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 10,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 600,
        useNativeDriver: true,
        tension: 50,
        friction: 10,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!location) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        !visible && styles.hidden,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.drawer}>
        {/* Drag handle */}
        <View style={styles.handle} />

        {/* Header with actions */}
        <View style={styles.header}>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>🔖</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>📤</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onClose}>
              <Text style={styles.iconText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        >
          {/* Title */}
          <Text style={styles.title}>{location.name}</Text>
          <Text style={styles.address}>{location.address}</Text>

          {/* Rating and details */}
          <View style={styles.detailsRow}>
            <View style={styles.rating}>
              <Text style={styles.ratingValue}>4.5</Text>
              <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.ratingCount}>(127)</Text>
            </View>
          </View>

          {/* Distance/Time */}
          <View style={styles.metaInfo}>
            <Text style={styles.metaText}>📍 6 min</Text>
            <Text style={styles.divider}>•</Text>
            <Text style={styles.metaText}>Restaurant</Text>
            <Text style={styles.divider}>•</Text>
            <Text style={styles.metaText}>$$</Text>
          </View>

          {/* Status */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusClosed}>Closed</Text>
            <Text style={styles.statusHours}>Opens 7 AM</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButtonPrimary}>
              <Text style={styles.actionButtonTextPrimary}>Directions</Text>
              <Text style={styles.actionButtonIconPrimary}>→</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.actionButtonIcon}>▲</Text>
              <Text style={styles.actionButtonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.actionButtonIcon}>⭐</Text>
              <Text style={styles.actionButtonText}>Ask</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.actionButtonIcon}>🍽️</Text>
              <Text style={styles.actionButtonText}>Order</Text>
            </TouchableOpacity>
          </View>

          {/* Photos Section */}
          <View style={styles.photosSection}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>📷</Text>
              </View>
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>📷</Text>
              </View>
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>📷</Text>
              </View>
            </ScrollView>
          </View>

          {/* Coordinates (for debugging) */}
          <View style={styles.coordsSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Coordinates</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Lat:</Text>
              <Text style={styles.value}>{location.latitude.toFixed(6)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Lng:</Text>
              <Text style={styles.value}>{location.longitude.toFixed(6)}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "transparent",
  },
  hidden: {
    display: "none",
  },
  drawer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginVertical: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingBottom: 4,
    color: "#212121",
  },
  address: {
    fontSize: 15,
    paddingHorizontal: 16,
    paddingBottom: 12,
    color: "#757575",
  },
  detailsRow: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#212121",
  },
  stars: {
    fontSize: 16,
  },
  ratingCount: {
    fontSize: 14,
    color: "#757575",
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: "#757575",
  },
  divider: {
    fontSize: 14,
    color: "#757575",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  statusClosed: {
    fontSize: 14,
    color: "#d32f2f",
    fontWeight: "500",
  },
  statusHours: {
    fontSize: 14,
    color: "#757575",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 20,
  },
  actionButtonPrimary: {
    flex: 2.5,
    backgroundColor: "#14a085",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingVertical: 12,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#212121",
  },
  actionButtonTextPrimary: {
    fontSize: 13,
    fontWeight: "500",
    color: "white",
  },
  actionButtonIcon: {
    fontSize: 16,
  },
  actionButtonIconPrimary: {
    fontSize: 16,
    color: "white",
  },
  photosSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholderText: {
    fontSize: 48,
  },
  coordsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    color: "#757575",
    fontWeight: "500",
  },
  value: {
    fontSize: 12,
    color: "#212121",
    fontFamily: "monospace",
  },
});
