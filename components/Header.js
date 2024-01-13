import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "react-native-feather";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color="#CC2248" width={32} height={32} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 32,
            color: "#000000",
            marginLeft: 8,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
