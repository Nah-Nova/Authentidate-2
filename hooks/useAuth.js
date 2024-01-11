import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import * as Google from "expo-auth-session";

const AuthContext = createContext({});

const config = {
  androidClientId:
    "40219467777-o1qk9oaekkeceke0o9h2f76uho3bckui.apps.googleusercontent.com",
  iosClientId:
    "40219467777-4cs1k65dno9m5pkgkaiamh23nd9t0tcd.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogleAsync = async () => {
    Google.loadAsync(config)
      .then((logInResult) => {
        if (logInResult.responseType === "success") {
          console.log(logInResult);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <AuthContext.Provider
      value={{
        user: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
