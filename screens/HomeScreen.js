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
import { MessageCircle } from "react-native-feather";
import Swiper from "react-native-deck-swiper";

import useAuth from "../hooks/useAuth";

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
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userInfo, signOut } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
            source={{ uri: userInfo?.picture }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoButton}>
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
      {/* End Header */}
      {/* Start Swipeable cards */}
      <View style={styles.cardContainer}>
        <Swiper
          containerStyle={{
            backgroundColor: "transparent",
          }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => console.log("Swiped Nope")}
          onSwipedRight={() => console.log("Swiped Match")}
          overlayLabels={{
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
                  color: "#CC2248",
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
          renderCard={(card) => (
            <View key={card.id} style={styles.card}>
              <Image
                source={{ uri: card.picture }}
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
          )}
        />
      </View>
      {/* End Swipeable cards */}
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
});
