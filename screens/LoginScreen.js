import React from 'react';
import { View, Text, Button } from 'react-native';
import useAuth from '../hooks/useAuth'; // Make sure the import path is correct

const LoginScreen = () => {
  const { promptAsync } = useAuth();

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button
        title="Sign in with Google"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};

export default LoginScreen;