import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: loggedInProfile.photoURL }}
          />
          <Image style={styles.image} source={{ uri: userSwiped.photoURL }} />
        </View>
        <View>
          <Text style={styles.title}>
            It's a Match, {loggedInProfile.displayName.split(" ")[0]}
          </Text>
          <Text style={styles.text}>
            You and {userSwiped.displayName} like each other
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={styles.buttonText}>Say hello</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: "#ffffff",
          borderWidth: 1,
          borderColor: "#CC2248",
          marginBottom: 128,
        }}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Home");
        }}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: "#CC2248",
          }}
        >
          keep swiping
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 64,
    opacity: 0.9,
    justifyContent: "space-between", // Align items vertically
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 24,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    color: "#000000",
    opacity: 0.7,
    textAlign: "center",
    marginTop: 16,
  },
  title: {
    fontSize: 32,
    color: "#CC2248",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#CC2248",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 48,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
});
