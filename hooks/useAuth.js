import React, { createContext, useContext, useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const config = {
    androidClientId:
      "40219467777-o1qk9oaekkeceke0o9h2f76uho3bckui.apps.googleusercontent.com",
    iosClientId:
      "40219467777-4cs1k65dno9m5pkgkaiamh23nd9t0tcd.apps.googleusercontent.com",
    expoClientId:
      "40219467777-pfn77adlsaq4qafm9jqa70n6uo98je2u.apps.googleusercontent.com",
    useProxy: true,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const getUserInfo = async (token) => {
    //absent token
    if (!token) return;
    //present token
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      //store user information  in Asyncstorage
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(
        "Failed to fetch user data:",
        response.status,
        response.statusText
      );
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Attempt to retrieve user information from AsyncStorage
      const userJSON = await AsyncStorage.getItem("user");

      if (userJSON) {
        // If user information is found in AsyncStorage, parse it and set it in the state
        setUserInfo(JSON.parse(userJSON));
      } else if (response?.type === "success") {
        // If no user information is found and the response type is "success" (assuming response is defined),
        // call getUserInfo with the access token from the response
        getUserInfo(response.authentication.accessToken);
      }
    } catch (error) {
      // Handle any errors that occur during AsyncStorage retrieval or other operations
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
  };

  const signOut = async () => {
    // Remove the user from the state
    setUserInfo(null);
    // Remove the user from AsyncStorage
    await AsyncStorage.removeItem("user");
  };

  //add it to a useEffect with response as a dependency
  useEffect(() => {
    signInWithGoogle();
  }, [response]);

  //log the userInfo to see user details
  console.log(JSON.stringify(userInfo));
  return (
    <AuthContext.Provider
      value={{
        userInfo,
        promptAsync, // Make sure promptAsync is included in the context value
        signOut, // Make sure signOut is included in the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
