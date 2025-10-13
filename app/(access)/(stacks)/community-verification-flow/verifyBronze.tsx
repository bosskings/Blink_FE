import { Headers } from '@/components/Headers';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VerifyBronze = () => {
  const [phoneNumber, setPhoneNumber] = useState('+234802194139');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-gray-200 pt-6 ">

        <View className='px-6'>
            <Headers onPress={()=>router.back()}/>
        </View>

            <View className="flex-1 items-center justify-center px-6">
                <View className="mb-8">
                    <Image
                        source={require('../../../../assets/images/bronzegray.png')}
                        className="w-60 h-60"
                        resizeMode="contain"
                    />
                    <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="text-base text-center text-gray-500 font-bold mb-2">Bronze</Text>
                </View>
        </View>


      {/* Bottom Section */}
      <View className="bg-white rounded-t-3xl py-8 px-6 pb-20">
        <Text style={{fontFamily: 'HankenGrotesk_700Bold'}} className="text-xl text-center font-bold mb-2">Basic Verification</Text>
        <Text style={{fontFamily: 'HankenGrotesk_400Regular'}} className="text-gray-600 text-sm text-center mb-6">Verify your contact details</Text>

        {/* Phone Input */}
        <View className="flex-row items-center border border-gray-300 rounded-full px-5 py-2.5 mb-4">

            <View className='border-2 border-gray-300 p-1 rounded-full mr-2 flex-row items-center'>
                <Ionicons name="checkmark" size={14} color="#646363ff" />
            </View>

            <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                className="flex-1 text-base"
                keyboardType="phone-pad"
                style={{fontFamily: 'HankenGrotesk_500Medium'}}
            />

          <TouchableOpacity className="ml-2 p-2 bg-gray-100 rounded-full">
            <Ionicons name="pencil" size={16} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full ml-2">
            <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="text-white text-sm font-semibold">Verify</Text>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
        <View className="flex-row items-center border border-gray-300 rounded-full px-5 py-3 mb-6">
            <View className='border-2 border-gray-300 p-1 rounded-full mr-2 flex-row items-center'>
                <Ionicons name="checkmark" size={14} color="#727272ff" />
            </View>
            <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="flex-1 text-gray-400">No email found</Text>
            <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-full">
                <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="text-white font-semibold text-sm">Add an email</Text>
            </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View className="flex-row justify-center space-x-2 mt-4">
          <View className="w-12 h-1 bg-black rounded-full" />
          <View className="w-12 h-1 bg-gray-300 rounded-full" />
          <View className="w-12 h-1 bg-gray-300 rounded-full" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyBronze;