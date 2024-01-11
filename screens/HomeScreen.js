import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { MessageCircle } from "react-native-feather";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userInfo, signOut } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      {/* <Text>{JSON.stringify(userInfo ? userInfo : "no user info")}</Text> */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileImageButton}>
          <Image
            source={{ uri: userInfo?.picture }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoButton}
          onPress={() => {
            signOut();
            navigation.navigate("Login");
          }}
        >
          <Image
            source={{
              uri: "https://mirri.link/cKC3KEw",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Chat");
          }}
          style={styles.chatButton}
        >
          <MessageCircle stroke="#CC2248" width={32} height={32} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImageButton: {
    position: "absolute",
    left: -5,
    top: 3,
  },
  profileImage: {
    marginLeft: 16,
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  logoButton: {},
  logo: {
    width: 64,
    height: 48,
  },
  chatButton: {
    position: "absolute",
    right: 8,
  },
});
