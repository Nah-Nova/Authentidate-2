import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as Google from 'expo-auth-session';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const signInWithGoogleAsync = async () => {
		await Google.loadAsync()
	}		
  return (
	<AuthContext.Provider 
		value={{
			user: "Noa",
		}}	
	>	
		{children}
	</AuthContext.Provider>
  )
}

export default function useAuth() {
	return useContext(AuthContext)
}

