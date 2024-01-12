import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { userInfo } = useAuth();
  return (
    <View style={styles.modalContainer}>
      <Image
        source={{ uri: "https://mirri.link/cKC3KEw" }}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <Text style={styles.modalText}>Welcome {userInfo?.name}</Text>
      <Text style={styles.modalTitle}>1. Add profile picture url</Text>
      <TextInput style={styles.modalInput} placeholder="Enter URL here" />
      <Text style={styles.modalTitle}>2. Add job title</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Enter current occupation"
      />
      <Text style={styles.modalTitle}>3. Add age</Text>
      <TextInput style={styles.modalInput} placeholder="Enter current age" />
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.modalButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  },
  modalTitle: {
    textAlign: "center",
    padding: 16,
    fontWeight: "bold",
    fontSize: 16,
    color: "#CC2248",
  },
  modalInput: {
    textAlign: "center",
    paddingBottom: 4,
    fontSize: 20,
  },
  modalButton: {
    width: "80%",
    padding: 16,
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: "#CC2248",
    position: "absolute",
    bottom: 0,
  },
  modalButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});