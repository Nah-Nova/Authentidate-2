import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Send } from "react-native-feather";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const MessageScreen = () => {
  const { userInfo } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const { matchDetails } = params;

  useEffect(() => {
    // subscribe to messages collection in firestore and update messages state
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, [matchDetails, db]);

  // add message to firestore and clear input field on submit message function call
  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: userInfo.uid,
      displayName: userInfo.displayName,
      photoURL: matchDetails.users[userInfo.uid].photoURL,
      message: input,
    });
    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, userInfo.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={{ paddingLeft: 16 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === userInfo.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View style={styles.messageContainer}>
          <TextInput
            placeholder="Your message"
            style={styles.messageInput}
            onChange={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.messageSubmit}>
            <Send stroke="#CC2248" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 16,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 2,
    height: 50,
    flex: 1,
  },
  messageSubmit: {
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 16,
    padding: 8,
    margin: 8,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
