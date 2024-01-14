import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const ProfileScreen = () => {
  const { params } = useRoute();
  const { profile } = params;
  return (
    <View style={styles.profile}>
      <Image
        source={{ uri: profile.photoURL }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
          top: 0,
        }}
      />
      <View style={styles.cardInnerContainer}>
        <View>
          <Text style={styles.cardName}>{profile.displayName}</Text>
          <Text>{profile.job}</Text>
        </View>
        <Text style={styles.cardAge}>{profile.age}</Text>
      </View>
      <View style={{ padding: 24 }}>
        <Text>{profile.bio}</Text>
      </View>
      <Text style={{ marginLeft: 24, fontWeight: "bold" }}>Interests:</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 16 }}>
        {profile.interests.map((interest, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#CC2248",
              borderRadius: 16,
              padding: 16,
              marginRight: 8,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "#ffffff" }}>{interest}</Text>
          </View>
        ))}
      </View>
      <MapView
        style={{ width: "100%", height: 200, borderRadius: 16 }}
        showsUserLocation
        initialRegion={{
          latitude: profile.location.latitude,
          longitude: profile.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: profile.location.latitude,
            longitude: profile.location.longitude,
          }}
          title={profile.displayName}
          description={profile.job}
        />
      </MapView>
    </View>
  );
};

export default ProfileScreen;

styles = StyleSheet.create({
  profile: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    height: 400,
  },
  cardInnerContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#ffffff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardAge: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
