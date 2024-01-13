import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import ChatRow from "./ChatRow";

const ChatList = () => {
  // get the current user
  const { userInfo } = useAuth();
  // set up a state variable to store the matches
  const [matches, setMatches] = useState([]);
  // uses the onSnapshot function to listen for changes to the matches collection
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", userInfo.uid)
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [userInfo]);

  return matches.length > 0 ? (
    <FlatList
      style={styles.container}
      data={matches}
      keyExtractor={(item) => item.id}
	  ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#000" }} />}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    /> // render the matches
  ) : (
    <View
      style={{ justifyContent: "center", alignItems: "center", color: "#000" }}
    >
      <Text>No matches yet 🥲</Text>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
});
