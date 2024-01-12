import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";

const ModalScreen = () => {
  const { userInfo } = useAuth();
  const navigation = useNavigation();
  const [picture, setPicture] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteProfile = !picture || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", userInfo.uid), {
      id: userInfo.uid,
      displayName: userInfo.displayName,
      photoURL: picture,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("Document successfully written!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <View style={styles.modalContainer}>
      <Image
        source={{ uri: "https://mirri.link/cKC3KEw" }}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <Text style={styles.modalText}>Welcome {userInfo?.displayName}</Text>
      <Text style={styles.modalTitle}>1. Add profile picture url</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Enter URL here"
        value={picture}
        onChangeText={setPicture}
      />
      <Text style={styles.modalTitle}>2. Add job title</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Enter current occupation"
        value={job}
        onChangeText={setJob}
      />
      <Text style={styles.modalTitle}>3. Add age</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Enter current age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        maxLength={2}
      />
      <TouchableOpacity
        style={[styles.modalButton, { opacity: incompleteProfile ? 0.3 : 1 }]}
        onPress={updateUserProfile}
        disabled={incompleteProfile}
      >
        <Text style={styles.modalButtonText}>
          {incompleteProfile ? "Complete your profile" : "Update your profile"}
        </Text>
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
