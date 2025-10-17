import { SolidMainButton } from '@/components/Btns';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const Item = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTransactModal, setShowTransactModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showMessageEveryTime, setShowMessageEveryTime] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const { itemData } = useLocalSearchParams()
  const eachItemData = JSON.parse(itemData as string);
  console.log('itemData', JSON.parse(itemData as string));

  const handleThumbnailPress = (index: number) => {
    setCurrentImageIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };


  return (
    <View className="flex-1 bg-white">
      <StatusBar style='dark'/>
      <ScrollView className="flex-1">
        <View className="relative">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentImageIndex(Math.round(x / width));
            }}
            scrollEventThrottle={16}
          >
            {eachItemData.images.map((img: any, idx: any) => (
              <View key={idx} style={{ width }}>
                <Image
                  source={{ uri: img }}
                  style={{ width, height: 380 }}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
          
          {/* Top Icons */}
          <View className="absolute top-10 pt-5 left-4 right-4 flex-row justify-between">
            <TouchableOpacity className='w-12 h-12 rounded-full bg-white/80 items-center justify-center' onPress={()=>router.back()}>
              <Ionicons name="arrow-back" size={25} color="#3A3541" />
            </TouchableOpacity>

            <TouchableOpacity className="w-12 h-12 rounded-full bg-white/80 items-center justify-center">
              <Ionicons name='heart-outline' size={25} color='#374151' />
            </TouchableOpacity>
          </View>

          {/* Image Indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {eachItemData.images.map((_: any, idx: number) => (
              <View
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </View>

          {/* Thumbnail Images */}
          <Animated.View entering={FadeInDown.duration(600).springify()} className="absolute m-auto bottom-2 left-0 right-0 justify-center flex-row gap-2">
            {eachItemData.images.map((img: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleThumbnailPress(idx)}
                className={`border rounded-md overflow-hidden  ${
                  idx === currentImageIndex ? 'border-gray-300' : 'border-gray-300/50'
                }`}
              >
                <Image
                  source={{ uri: img }}
                  style={{ width: 60, height: 50 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>

        {/* Content */}
        <View className="p-4 px-6 pb-32">

          <Animated.View entering={FadeInDown.duration(600).delay(200).springify()}>
            <View className="flex-row items-center justify-between mb-2">
              <View className="bg-green-700 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  {eachItemData.tag}
                </Text>
              </View>
              <Text className="text-xl font-bold text-[#0066CC]" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                {eachItemData.price}
              </Text>
            </View>

            {/* Title */}
            <Text className="text-xl font-bold mb-2" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
              {eachItemData.title}
            </Text>

            {/* Description */}
            <Text className="text-gray-600 text-sm mb-4 leading-5" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
              {eachItemData.description}
            </Text>

            {/* Posted Info */}
            <View className="flex-row items-center gap-4 mb-6">
              <View className="flex-row items-center gap-1">
                <Text className="text-gray-500 text-sm">🕐</Text>
                <Text className="text-gray-500 text-sm" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Posted {eachItemData.timePosted}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-gray-500 text-sm">📍</Text>
                <Text className="text-gray-500 text-sm" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  {eachItemData.distance}
                </Text>
              </View>
            </View>
          </Animated.View>


          {/* Details Section */}
          <View className="mb-14 mt-5">
            
            <Animated.View className="mb-4" entering={FadeInDown.duration(600).delay(400).springify()}>
              <Text className="text-base font-bold " style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                Details & Category
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(600).delay(600).springify()} className="flex-row mb-2">
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  BRAND
                </Text>
                <Text className="text-base font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Trek
                </Text>
              </View>
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  FRAME SIZE
                </Text>
                <Text className="text-base font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  54 CM
                </Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(600).delay(800).springify()} className="flex-row mb-2">
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Category
                </Text>
                <Text className="text-base font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Sports
                </Text>
              </View>
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Condition
                </Text>
                <Text className="text-base font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  New
                </Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInDown.duration(600).delay(1000).springify()} className="flex-row">
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  YEAR
                </Text>
                <Text className="text-base font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  2018
                </Text>
              </View>
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Color
                </Text>
                <Text className="text-base font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Red
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Seller Information at Bottom */}
      <View className="absolute bottom-0 left-0 right-0 py-8 pt-6  bg-white border-t border-gray-100 px-6">
        <Text className="text-base font-bold mb-5" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
          Seller Information
        </Text>
            
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="relative">
              <Image
                source={require('../../../../assets/avatars/avatar1.png')}
                style={{ width: 40, height: 40 }}
                className="rounded-full"
              />
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-700 rounded-full border-2 border-white" />
            </View>
            
            <View>
              <Text className="text-sm font-semibold mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                Alexa Johnson
              </Text>
              <View className="flex-row items-center gap-1">
                <Ionicons name='star' size={10} color='#FBBF24' />
                <Text className="text-xs" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  4.8
                </Text>
                <Text className="text-gray-500 text-sm">·</Text>
                <Text className="text-gray-500 text-xs" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  23 reviews
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity 
              className="w-14 rounded-lg bg-gray-100 items-center justify-center"
              onPress={() => setShowSellerModal(true)}
            >
              <Ionicons name='eye' size={20} color='#374151' />
            </TouchableOpacity>

            <TouchableOpacity 
              className="rounded-lg bg-[#0066CC] flex-row gap-2 p-3 px-6 items-center justify-center"
              onPress={() => setShowTransactModal(true)}
            >
              <Text className='text-sm text-white' style={{fontFamily: 'HankenGrotesk_500Medium'}}>Transact</Text>
              <Ionicons name='card-outline' size={15} color='#61ADFA' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Transaction Modal */}
      <Modal
        visible={showTransactModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTransactModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-5">
          <View className="bg-white rounded-3xl w-full max-w-[98%] overflow-hidden">
            <View className="p-6 pb-8">

              <View>
                <Text className="text-2xl font-bold text-[#0066CC] mb-2" style={{fontFamily: 'HankenGrotesk_600SemiBold'}}>
                  How Purchases{'\n'}Work on Blink
                </Text>
              <TouchableOpacity className='absolute top-0 right-0' onPress={() => setShowTransactModal(false)}>
                <Ionicons name="close-circle" size={28} color="#9CA3AF" className='absolute top-0 right-0' onPress={() => setShowTransactModal(false)}/>
              </TouchableOpacity>
              </View>

              <Text className="text-sm text-gray-700 mb-6" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                Here is what happens when you{'\n'}make a purchase
              </Text>

              <View className="space-y-5">
                {/* Payment Security */}
                <View className="flex-row gap-3">
                  <View className="w-6 h-6 rounded-full bg-[#0066CC]/10 items-center justify-center mt-1">
                    <Ionicons name="checkmark-circle" size={20} color="#0066CC" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-base mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                      Payment Security:
                    </Text>
                    <Text className="text-sm text-gray-600 leading-5" style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                      Your money is safely held in escrow until the transaction is completed.
                    </Text>
                  </View>
                </View>

                {/* Pickup Code */}
                <View className="flex-row gap-3 mt-3">
                  <View className="w-6 h-6 rounded-full bg-[#0066CC]/10 items-center justify-center mt-1">
                    <Ionicons name="checkmark-circle" size={20} color="#0066CC" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-base mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                      Pickup Code:
                    </Text>
                    <Text className="text-sm text-gray-600 leading-5" style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                      {"You'll receive a unique pickup code once your order is ready."}
                    </Text>
                  </View>
                </View>

                {/* Verification */}
                <View className="flex-row gap-3 mt-3">
                  <View className="w-6 h-6 rounded-full bg-[#0066CC]/10 items-center justify-center mt-1">
                    <Ionicons name="checkmark-circle" size={20} color="#0066CC" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-base mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                      Verification:
                    </Text>
                    <Text className="text-sm text-gray-600 leading-5" style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                      {"Present or enter your pickup code to confirm you've received the item."}
                    </Text>
                  </View>
                </View>

                {/* Release of Funds */}
                <View className="flex-row gap-3 mt-3">
                  <View className="w-6 h-6 rounded-full bg-[#0066CC]/10 items-center justify-center mt-1">
                    <Ionicons name="checkmark-circle" size={20} color="#0066CC" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-base mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                      Release of Funds:
                    </Text>
                    <Text className="text-sm text-gray-600 leading-5" style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                      After confirmation, the payment is released to the seller
                    </Text>
                  </View>
                </View>
              </View>


              <View className='mt-4'>
                <SolidMainButton text='Proceed' onPress={()=>router.push('/(access)/(stacks)/success/payment-success')}/>
              </View>

              {/* Checkbox */}
              <TouchableOpacity 
                className="flex-row items-center justify-center gap-2 mt-4"
                onPress={() => setShowMessageEveryTime(!showMessageEveryTime)}
              >
                <View className={`w-4 h-4 border-2 rounded ${showMessageEveryTime ? 'border-gray-300' : 'border-[#0066CC] bg-[#0066CC]'} items-center justify-center`}>
                  {!showMessageEveryTime && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text className="text-xs text-gray-600" style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                  Show this message every time
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Seller Details Modal */}
      <Modal
        visible={showSellerModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSellerModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-5">
          <View className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
            <View className="p-6">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Seller Details
                </Text>
                <TouchableOpacity onPress={() => setShowSellerModal(false)}>
                  <Ionicons name="close-circle" size={28} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Seller Profile */}
              <View className="items-center mb-6">
                <View className="relative mb-3">
                  <Image
                    source={require('../../../../assets/avatars/avatar1.png')}
                    style={{ width: 80, height: 80 }}
                    className="rounded-full"
                  />
                  <View className="absolute bottom-1 right-1 w-5 h-5 bg-green-700 rounded-full border-4 border-white" />
                </View>
                
                <Text className="text-lg font-bold mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Alexa Johnson
                </Text>
                <View className="flex-row items-center gap-1 mb-2">
                  <Ionicons name='star' size={14} color='#FBBF24' />
                  <Text className="text-base font-semibold" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    4.8
                  </Text>
                  <Text className="text-gray-500 text-sm">·</Text>
                  <Text className="text-gray-500 text-sm" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    23 reviews
                  </Text>
                </View>
                <Text className="text-gray-500 text-sm" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Member since 2022
                </Text>
              </View>

              {/* Stats */}
              <View className="flex-row justify-around mb-6 bg-gray-50 rounded-xl py-4">
                <View className="items-center">
                  <Text className="text-xl font-bold mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    156
                  </Text>
                  <Text className="text-xs text-gray-500" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    Items Sold
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-xl font-bold mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    98%
                  </Text>
                  <Text className="text-xs text-gray-500" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    Response Rate
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-xl font-bold mb-1" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    2.5km
                  </Text>
                  <Text className="text-xs text-gray-500" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    Distance
                  </Text>
                </View>
              </View>

              {/* About */}
              <View className="mb-6">
                <Text className="font-bold text-sm mb-2" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  About
                </Text>
                <Text className="text-gray-600 text-sm leading-5" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                  Trusted seller with a passion for quality items. Fast responses and reliable transactions. All items carefully inspected before listing.
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="">
               <SolidMainButton text='Message'/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Item;