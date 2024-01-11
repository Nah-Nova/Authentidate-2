import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { promptAsync } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }
  , [navigation]);

  return (
    <LinearGradient
      colors={["#FFDDE4", "#D65A73", "#CC2248"]}
      style={styles.container}
    >
      <Image
        source={{
          uri: "https://mirri.link/lVTukH7",
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={() => {
          promptAsync();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: 200, height: 200 },
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  buttonText: {
    fontFamily: "Helvetica Neue",
    fontSize: 16,
    fontWeight: "bold",
    color: "#CC2248",
    marginHorizontal: 48,
  },
});
