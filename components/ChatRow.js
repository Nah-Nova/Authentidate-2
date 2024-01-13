import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
  // get the navigation object
  const navigation = useNavigation();
  // get the current user
  const { userInfo } = useAuth();
  // set up a state variable to store the matched user's info
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    // uses lib function to get the matched user's info and set it to state
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, userInfo.uid));
  }, [matchDetails, userInfo]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Chat", { matchDetails })}
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
        <Text>{"Be authentic and say something!"}</Text>
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
