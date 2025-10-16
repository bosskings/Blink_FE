import { SolidMainButton } from '@/components/Btns'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Dimensions, ImageBackground, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')



const Onboarding = () => {

    const handleContinue = async () => {
      await AsyncStorage.setItem("blink_onboarding", "true");
      router.push("/(noaccess)/register");
    };
  return (
    <View className="flex-1">
      <StatusBar style='light'/>
      
      <ImageBackground
        source={require('../../assets/images/map.png')}
        className="flex-1"
        resizeMode="cover"
      >
        <View className="flex-1" />

        <View className="bg-white rounded-t-3xl px-6 pt-10 pb-8">
          <Animated.View 
            entering={FadeInDown.duration(500).springify()}
          >
            <Text className="text-3xl font-extrabold text-center text-gray-900 mb-3" style={{fontFamily: 'HankenGrotesk_900Black'}}>
              Your No. 1 Community{'\n'}Marketplace
            </Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(600).delay(200).springify()}
          >
            <Text className="text-center text-gray-600 text-base mb-8" style={{fontFamily: 'HankenGrotesk_400Regular'}}>
              Find what you need and support{'\n'}people around you instantly
            </Text>
          </Animated.View>


          <Animated.View 
            className='mb-4'
            entering={FadeInDown.duration(600).delay(200).springify()}
          >
            <SolidMainButton text='Get Started' onPress={handleContinue}/>
          </Animated.View>


          <View className="items-center">
            <View className="w-32 h-1 bg-gray-900 rounded-full" />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Onboarding