import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MessageCircle, Star, Heart, XCircle } from "react-native-feather";
import Swiper from "react-native-deck-swiper";

import useAuth from "../hooks/useAuth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const DUMMY_DATA = [
  {
    id: 1,
    displayName: "Chelsey Hoogeveen",
    job: "Health sciences student",
    age: 20,
    picture: "https://mirri.link/pxXOYqq",
  },
  {
    id: 2,
    displayName: "Noa Heutz",
    job: "Full Stack Developer",
    age: 20,
    picture: "https://mirri.link/YMRkZbO",
  },
  {
    id: 3,
    displayName: "Maurice Wijman",
    job: "IT Network Specialist",
    age: 20,
    picture: "https://mirri.link/WavR8-j",
  },
  {
    id: 4,
    displayName: "Job Vreuls",
    job: "Hue Craftsman.",
    age: 20,
    picture: "https://mirri.link/s2atqe5",
  },
  {
    id: 5,
    displayName: "Jaymian-Lee Reinartz",
    job: "Software Engineer",
    age: 20,
    picture: "https://mirri.link/jg6Tc_d",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userInfo, signOut } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db, "users", userInfo.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        console.log(profiles);
      });
    };

    fetchCards();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Start Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileImageButton}
          onPress={() => {
            signOut();
          }}
        >
          <Image
            source={{ uri: userInfo?.photoURL }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoButton}
          onPress={() => {
            navigation.navigate("Modal");
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
          <MessageCircle
            stroke="#CC2248"
            width={32}
            height={32}
            fill="#CC2248"
          />
        </TouchableOpacity>
      </View>
      {/* End Header */}
      {/* Start Swipeable cards */}
      <View style={styles.cardContainer}>
        <Swiper
          ref={swipeRef}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          onSwipedLeft={() => console.log("Swiped Nope")}
          onSwipedRight={() => console.log("Swiped Match")}
          onSwipedTop={() => console.log("Swiped Top")}
          disableBottomSwipe
          overlayLabels={{
            top: {
              title: "SUPER LIKE",
              style: {
                label: {
                  backgroundColor: "#ffffff",
                  color: "#F27121",
                  fontSize: 24,
                  fontWeight: "bold",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
            },
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "#ffffff",
                  color: "#CC2248",
                  fontSize: 24,
                  fontWeight: "bold",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 16,
                  marginLeft: -16,
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  backgroundColor: "#ffffff",
                  color: "#8A2487",
                  fontSize: 24,
                  fontWeight: "bold",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 16,
                  marginLeft: 16,
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View key={card.id} style={styles.card}>
                <Image
                  source={{ uri: card.photoURL }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                    top: 0,
                  }}
                />
                <View style={styles.cardInnerContainer}>
                  <View>
                    <Text style={styles.cardName}>{card.displayName}</Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={styles.cardAge}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.card}>
                <Image
                  source={{ uri: "https://mirri.link/jDzF3nr" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 16,
                    top: 0,
                  }}
                />
                <View style={styles.cardInnerContainer}>
                  <View>
                    <Text style={styles.cardName}>Bhuddah</Text>
                    <Text>Informing u there are no more profiles 🥲</Text>
                  </View>
                  <Text style={styles.cardAge}>14</Text>
                </View>
              </View>
            )
          }
        />
      </View>
      {/* End Swipeable cards */}
      {/* Start Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            ...styles.bottomButton,
          }}
          onPress={() => {
            swipeRef.current.swipeLeft();
          }}
        >
          <XCircle stroke="#F27121" width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#CC2248",
            ...styles.bottomButton,
          }}
          onPress={() => {
            swipeRef.current.swipeTop();
          }}
        >
          <Heart stroke="#ffffff" width={48} height={48} fill="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            ...styles.bottomButton,
          }}
          onPress={() => {
            swipeRef.current.swipeRight();
          }}
        >
          <Star stroke="#8A2487" width={32} height={32} fill="#8A2487" />
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
  cardContainer: {
    flex: 1,
    marginTop: -8,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    height: 500,
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
    height: 64,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardAge: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bottomButton: {
    padding: 16,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.24,
    shadowRadius: 8,
    elevation: 8,
  },
});
