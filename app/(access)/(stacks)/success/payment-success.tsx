import { SolidMainButton } from '@/components/Btns';
import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

const PaymentSuccess = () => {
  return (
    <View className="flex-1 bg-white items-center justify-between px-6 py-12">
      <View className="flex-1 items-center justify-center">
        <Animated.View className="mb-8" entering={FadeInDown.duration(600).springify()}>
          <Svg width="120" height="120" viewBox="0 0 80 80" fill="none">
            <Path
              d="M40 0C43.5 0 45.5 2 48 4C50.5 2 52.5 0 56 0C59.5 0 62 2.5 64 6C66 6 70 6.5 72 10C74 13.5 73.5 17 72 20C75 22 78 25 78 29C78 33 75 36 72 38C73.5 41 74 44.5 72 48C70 51.5 66 52 64 52C62 55.5 59.5 58 56 58C52.5 58 50.5 56 48 54C45.5 56 43.5 58 40 58C36.5 58 34.5 56 32 54C29.5 56 27.5 58 24 58C20.5 58 18 55.5 16 52C14 52 10 51.5 8 48C6 44.5 6.5 41 8 38C5 36 2 33 2 29C2 25 5 22 8 20C6.5 17 6 13.5 8 10C10 6.5 14 6 16 6C18 2.5 20.5 0 24 0C27.5 0 29.5 2 32 4C34.5 2 36.5 0 40 0Z"
              fill="#10B981"
            />
            <Path
              d="M32 29L37 34L50 21"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Animated.View>

        {/* Text Content */}
        <Animated.View className="items-center" entering={FadeInDown.duration(600).delay(200).springify()}>
          <Text 
            className="text-2xl font-bold text-green-600 mb-2"
            style={{ fontFamily: 'HankenGrotesk_700Bold' }}
          >
            Awesome!
          </Text>
          <Text 
            className="text-xl font-bold text-black mb-3"
            style={{ fontFamily: 'HankenGrotesk_700Bold' }}
          >
            {"Payment Successful"}
          </Text>


          <Text 
            className="text-base text-gray-600 text-center"
            style={{ fontFamily: 'HankenGrotesk_400Regular' }}
          >
            Share your pickup code only with{'\n'}the seller to collect your item
          </Text>

          <View className='bg-gray-100 px-6 py-4 rounded-lg mt-4'>
            <Text className='text-sm' style={{fontFamily: 'HankenGrotesk_500Medium'}}>Pickup Code: 847-XXG</Text>
          </View>
        </Animated.View>
      </View>

       <Animated.View className="mb-4 w-full" entering={FadeInDown.duration(600).delay(400).springify()}>
            <SolidMainButton text="Chat with Alexa" onPress={()=>router.push('/(access)/(tabs)/messages')}/>
        </Animated.View>
    </View>
  );
};

export default PaymentSuccess;