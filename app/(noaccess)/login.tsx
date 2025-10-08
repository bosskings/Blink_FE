import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Login = () => {

  const queryCLient = useQueryClient();

  const handleLogout = async () => {
    await queryCLient.clear();

    await AsyncStorage.removeItem("blink_onboarding");
    // await clearFavorites()
    router.replace("/(noaccess)/onboarding");
  };
  return (
    <View>
      <Text>login</Text>
      <Button onPress={handleLogout} title='Logout'/>
    </View>
  )
}

export default Login
