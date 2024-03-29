import { View, Text, Image } from "react-native";
import React from "react";

const ReceiverMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "#FBE9ED",
        borderBottomLeftRadius: 0,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginHorizontal: 48,
        marginVertical: 8,
        alignSelf: "flex-start",
      }}
    >
      <Image
        source={{ uri: message.photoURL }}
        style={{
          height: 48,
          width: 48,
          borderRadius: 99,
          position: "absolute",
          top: 0,
          left: -52,
        }}
      />
      <Text>{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;
