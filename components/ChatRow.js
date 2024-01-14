import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const ChatRow = ({ matchDetails }) => {
  // get the navigation object
  const navigation = useNavigation();
  // get the current user
  const { userInfo } = useAuth();
  // set up a state variable to store the matched user's info
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  // last message in the chat to display in the chat row
  const [lastMessage, setLastMessage] = useState([]);

  useEffect(() => {
    // uses lib function to get the matched user's info and set it to state
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, userInfo.uid));
  }, [matchDetails, userInfo]);

  // subscribe to the messages collection in firestore and update the last message state
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),

    [matchDetails, db]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Message", { matchDetails })}
    >
      <Image
        style={styles.profilePic}
        source={{
          uri: matchedUserInfo?.photoURL,
        }}
      />
      <View style={{ marginLeft: 4 }}>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {matchedUserInfo?.displayName.split(" ")[0]}
        </Text>
        <Text>{lastMessage || "New Match, be authentic say something!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  profilePic: {
    borderRadius: 100,
    height: 50,
    width: 50,
    marginRight: 8,
  },
});
