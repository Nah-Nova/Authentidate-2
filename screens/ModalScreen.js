import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";

const ModalScreen = () => {
  const { userInfo } = useAuth();
  const navigation = useNavigation();
  const [picture, setPicture] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [location, setLocation] = useState(null);

  const incompleteProfile = !picture || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", userInfo.uid), {
      id: userInfo.uid,
      displayName: userInfo.displayName,
      photoURL: picture,
      job: job,
      age: age,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  return (
    <View style={styles.modalContainer}>
      <Image
        source={{ uri: "https://mirri.link/cKC3KEw" }}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <Text style={styles.modalText}>Welcome {userInfo?.displayName}</Text>
      <View style={styles.formContainer}>
        <Text style={styles.modalTitle}>1. Add profile picture URL</Text>
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
        <Text style={styles.modalTitle}>4. Location</Text>
        {location && (
        <MapView
          style={{ width: "100%", height: 200, borderRadius: 16 }}
          showsUserLocation 
          initialRegion={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        )}
      </View>
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
    paddingHorizontal: 16,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
    textAlign: "center",
  },
  formContainer: {
    alignSelf: "stretch",
  },
  modalTitle: {
    textAlign: "left",
    paddingVertical: 8,
    fontWeight: "bold",
    fontSize: 16,
    color: "#CC2248",
  },
  modalInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: "100%",
  },
  modalButton: {
    width: "100%",
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
