import { View, Text } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "#F3F3F3",
        borderBottomRightRadius: 0,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginHorizontal: 4,
        alignSelf: "flex-start",
        marginLeft: "auto",
      }}
    >
      <Text>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
