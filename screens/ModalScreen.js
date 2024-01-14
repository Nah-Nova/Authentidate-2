import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";

// array of interests with icon type
const interestOptions = [
  "Photography",
  "Shopping",
  "Karaoke",
  "Travel",
  "Fitness",
  "Reading",
  "Coding",
  "Cooking",
  "Gaming",
  "Art",
  "Movies",
  "Technology",
  "Writing",
  "Coffee",
  "Soccer",
  "Pets",
  "Yoga",
  "Crafting",
  "Science",
  "Dancing",
];

const ModalScreen = () => {
  const { userInfo } = useAuth();
  const navigation = useNavigation();
  const [picture, setPicture] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [interests, setInterests] = useState([]);
  const [location, setLocation] = useState(null);

  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleInterestToggle = (interest) => {
    // Check if the interest is already selected
    const isInterestSelected = selectedInterests.includes(interest);

    // Update the selected interests array accordingly
    if (isInterestSelected) {
      setSelectedInterests((prevInterests) =>
        prevInterests.filter(
          (selectedInterest) => selectedInterest !== interest
        )
      );
    } else {
      setSelectedInterests((prevInterests) => [...prevInterests, interest]);
    }
  };

  const incompleteProfile = !picture || !job || !age || !interests;

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
      interests: selectedInterests,
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

  const getUserProfile = async () => {
    const docRef = doc(db, "users", userInfo.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const { photoURL, job, age, interests } = docSnap.data();
      setPicture(photoURL);
      setJob(job);
      setAge(age);
      setInterests(interests);
      setSelectedInterests(interests);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
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
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.modalTitle}>1. Profile photo url</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Enter URL here"
          value={picture}
          onChangeText={setPicture}
        />
        <Text style={styles.modalTitle}>2. Occupation</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Enter current occupation"
          value={job}
          onChangeText={setJob}
        />
        <Text style={styles.modalTitle}>3. Age</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Enter current age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          maxLength={2}
        />
        <Text style={styles.modalTitle}>4. Interests</Text>
        {/* TODO:   create a list with 2 vertical colums with buttons to select interestOptions and add them to an array of interests */}
        <View style={styles.interestsContainer}>
          {interestOptions.map((interest, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.interestButton,
                selectedInterests.includes(interest) && styles.selectedInterest,
              ]}
              onPress={() => handleInterestToggle(interest)}
            >
              <Text
                style={[
                  styles.interestButtonText,
                  selectedInterests.includes(interest) &&
                    styles.selectedInterestText,
                ]}
              >
                {interest}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.modalTitle}>5. Location</Text>
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
      </ScrollView>
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
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  interestButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: "48%",
  },
  selectedInterest: {
    backgroundColor: "#CC2248", // Change the background color for selected interests
  },
  selectedInterestText: {
    color: "#ffffff", // Change the text color for selected interests
  },
  interestButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
});
