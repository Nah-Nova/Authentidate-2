import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
	const navigation = useNavigation()
	const { userInfo, signOut } = useAuth();

  return (
	<View>
		<Text>{JSON.stringify(
			userInfo ? userInfo : "no user info"
		)}</Text>
		<Button title="sign out" onPress={() => {
			signOut()
			navigation.navigate("Login")
			}}/>
	  <Button title="go to chat" onPress={() => navigation.navigate("Chat")}/>
	</View>
  )
}

export default HomeScreen