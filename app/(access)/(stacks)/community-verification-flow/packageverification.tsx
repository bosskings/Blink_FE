import { Headers } from '@/components/Headers';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Packageverification = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const verificationTiers = [
    {
      id: 'bronze',
      name: 'Bronze',
      subtitle: 'Basic Verification',
      features: [
        'Phone number verification',
        'Email verification'
      ],
      image: require('../../../../assets/images/bronze.png'),
      link: '/(access)/(stacks)/community-verification-flow/verifyBronze'
    },
    {
      id: 'gold',
      name: 'Gold',
      subtitle: 'Advanced Verification',
      features: [
        'An Identity Card',
        'Business document upload',
        'Social media account linking'
      ],
      image: require('../../../../assets/images/gold.png'),
      link: '/(access)/(stacks)/community-verification-flow/verifyGold'
    }
  ];

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='dark' />
      <View className='flex-1 px-6'>
        <View className='mt-6 mb-6'>
          <Headers onPress={() => router.back()} />
        </View>

        {/* Header Section */}
        <View className='mb-6'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text 
              className='text-blue-600 text-base'
              style={{fontFamily: 'HankenGrotesk_500Medium'}}
            >
              Verification Tier
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text 
                className='text-gray-600 text-base'
                style={{fontFamily: 'HankenGrotesk_400Regular'}}
              >
                Skip →
              </Text>
            </TouchableOpacity>
          </View>

          <Text 
            className='text-2xl font-bold mb-2'
            style={{fontFamily: 'HankenGrotesk_700Bold'}}
          >
            Build Trust in your Community
          </Text>
          <Text 
            className='text-gray-600 text-base'
            style={{fontFamily: 'HankenGrotesk_400Regular'}}
          >
            Choose a verification level to trade safely and be more trusted by others
          </Text>
        </View>

        {/* Verification Tiers */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          className='flex-1'
          contentContainerStyle={{paddingBottom: 100}}
        >
          {verificationTiers.map((tier) => (
            <TouchableOpacity
              key={tier.id}
              onPress={() => {setSelectedTier(tier.id)}}
              activeOpacity={0.7}
              className='mb-4'
            >
              <View 
                className={`rounded-2xl p-5 bg-gray-50 ${
                  selectedTier === tier.id ? 'border-blue-600 border-2' : 'border   border-gray-200'
                }`}
              >
                <View className='flex-row justify-between items-start mb-4'>
                  <View className='flex-1'>
                    <Text 
                      className='text-xl font-bold mb-1'
                      style={{fontFamily: 'HankenGrotesk_700Bold'}}
                    >
                      {tier.name}
                    </Text>
                    <Text 
                      className='text-sm text-blue-600'
                      style={{fontFamily: 'HankenGrotesk_400Regular'}}
                    >
                      {tier.subtitle}
                    </Text>
                  </View>



                  {/* Badge Icon */}
                  <View className='relative'>
                    <View 
                      className='rounded-full absolute right-0 items-center justify-center'
                    >
                        <Image
                          source={tier.image}
                          className='w-fit'
                        />
                    </View>
                  </View>
                </View>

                {/* Features List */}
                <View className='space-y-2'>
                  {tier.features.map((feature, index) => (
                    <View key={index} className='flex-row items-center mb-2'>
                      <View className='w-1.5 h-1.5 rounded-full bg-gray-400 mr-3' />
                      <Text 
                        className='text-sm text-gray-700 flex-1'
                        style={{fontFamily: 'HankenGrotesk_400Regular'}}
                      >
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Selection Indicator */}
                {selectedTier === tier.id && (
                  <View className='absolute top-5 right-5'>
                    <View className='w-6 h-6 border-2 border-white rounded-full bg-blue-600 items-center justify-center'>
                      <Ionicons name="checkmark" size={15} color="white" />
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Proceed Button */}
        <View className='absolute bottom-0 bg-white left-0 right-0'>
          <View className='w-[90%] self-center py-4'>
            <TouchableOpacity 
              className={`py-4 rounded-lg ${
                selectedTier !== null ? 'bg-[#0066CC]' : 'bg-gray-300'
              }`}
                disabled={selectedTier === null}
                onPress={() => {
                    console.log('Selected tier:', selectedTier);
                    const selected = verificationTiers.find(tier => tier.id === selectedTier);
                    if (selected) {
                        router.push(selected.link as any);
                    }
                }}
                >
              <Text 
                className={`text-center text-base font-semibold ${
                  selectedTier !== null ? 'text-white' : 'text-gray-400'
                }`}
                style={{fontFamily: 'HankenGrotesk_600SemiBold'}}
              >
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Packageverification;