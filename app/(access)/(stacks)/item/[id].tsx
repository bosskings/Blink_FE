import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const Item = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
          <View className="absolute m-auto bottom-2 left-0 right-0 justify-center flex-row gap-2">
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
          </View>
        </View>

        {/* Content */}
        <View className="p-4 px-6 pb-32">
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

          {/* Details Section */}
          <View className="mb-14 mt-5">
            <Text className="text-base font-bold mb-4" style={{fontFamily: 'HankenGrotesk_500Medium'}}>
              Details & Category
            </Text>
            
            <View className="flex-row mb-2">
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
            </View>

            <View className="flex-row mb-2">
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
            </View>

            <View className="flex-row">
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
            </View>
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
            <TouchableOpacity className="w-14 rounded-lg bg-gray-100 items-center justify-center">
              <Ionicons name='eye' size={20} color='#374151' />
            </TouchableOpacity>

            <TouchableOpacity className="rounded-lg bg-[#0066CC] flex-row gap-2 p-3 px-6 items-center justify-center">
              <Text className='text-sm text-white' style={{fontFamily: 'HankenGrotesk_500Medium'}}>Transact</Text>
              <Ionicons name='card-outline' size={15} color='#61ADFA' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Item;