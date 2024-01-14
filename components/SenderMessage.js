import { View, Text } from "react-native";
import React from "react";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "#e3e3e3",
        borderBottomRightRadius: 0,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginHorizontal: 24,
        marginVertical: 8,
        alignSelf: "flex-start",
        marginLeft: "auto",
      }}
    >
      <Text>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
