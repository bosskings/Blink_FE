import { Headers } from '@/components/Headers'
import SuccessModal from '@/components/modals/SuccessModal'
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const FindCommunity = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null)
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // All available communities with their coordinates
  const allCommunities = [
    {
      id: 1,
      name: 'Covenant University',
      latitude: 6.6745,
      longitude: 3.1686,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80'
    },
    {
      id: 2,
      name: 'Landmark University',
      latitude: 6.5074,
      longitude: 3.3758,
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80'
    },
    {
      id: 3,
      name: 'University of Lagos',
      latitude: 6.5158,
      longitude: 3.3885,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'
    },
    {
      id: 4,
      name: 'Pan-Atlantic University',
      latitude: 6.4698,
      longitude: 3.5852,
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80'
    },
    {
      id: 5,
      name: 'Lagos Business School',
      latitude: 6.4407,
      longitude: 3.4326,
      image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80'
    },
    {
      id: 6,
      name: 'Redeemers University',
      latitude: 6.8333,
      longitude: 3.9167,
      image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80'
    }
  ]

  const [communities, setCommunities] = useState(allCommunities)

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Request location permission and get current location
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to find communities near you.',
            [{ text: 'OK' }]
          )
          setLoading(false)
          return
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        })
        
        setLocation(currentLocation)

        // Calculate distances and sort communities by proximity
        const communitiesWithDistance = allCommunities.map(community => ({
          ...community,
          distance: calculateDistance(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            community.latitude,
            community.longitude
          )
        }))

        // Sort by distance and format
        const sortedCommunities: any = communitiesWithDistance
          .sort((a, b) => a.distance - b.distance)
          .map(community => ({
            id: community.id,
            name: community.name,
            distance: `${community.distance.toFixed(1)}km`,
            duration: `${Math.round(community.distance * 4)}min`,
            image: community.image
          }))

        setCommunities(sortedCommunities)
        setLoading(false)
      } catch (error) {
        console.error('Error getting location:', error)
        Alert.alert('Error', 'Failed to get your location. Showing all communities.')
        setLoading(false)
      }
    })()
  }, [])

  const selectCommunity = (id: number) => {
    setSelectedCommunity(selectedCommunity === id ? null : id)
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='dark'/>
      <View className='flex-1 px-6'>
        <View className='mt-6 mb-6'>
          <Headers onPress={() => router.back()}/>
        </View>

        {/* Header Section */}
            <Animated.View className="mb-6" entering={FadeInDown.duration(600).springify()}>
                <View className='flex-row justify-between items-center mb-4'>
                    <Text className='text-blue-600 text-sm' style={{fontFamily: 'HankenGrotesk_500Medium'}}>
                    Community Discovery
                    </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                    <Text className='text-gray-600 text-base' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                        Skip →
                    </Text>
                    </TouchableOpacity>
                </View>

                <Text className='text-xl font-bold mb-2' style={{fontFamily: 'HankenGrotesk_700Bold'}}>
                    Get in a Community
                </Text>
                <Text className='text-gray-600 text-base' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                    Select one community around you
                </Text>
            </Animated.View>

        {/* Loading State */}
        {loading ? (
          <View className='flex-1 items-center pt-[10rem]'>
            <ActivityIndicator size="small" color="#2563eb" />
            <Text className='text-gray-600 mt-4 text-sm' style={{fontFamily: 'HankenGrotesk_500Medium'}}>
              Finding communities near you...
            </Text>
          </View>
        ) : (
          <>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              className='flex-1'
              contentContainerStyle={{paddingBottom: 100}}
            >
              {communities.map((community: any) => (
                <TouchableOpacity
                  key={community.id}
                  onPress={() => selectCommunity(community.id)}
                  activeOpacity={0.8}
                  className='mb-4'
                >
                  <View className='relative rounded-2xl overflow-hidden h-40'>
                    <Image 
                      source={{ uri: community.image }}
                      className='w-full h-full'
                      resizeMode='cover'
                    />
                    <View className='absolute inset-0 bg-black/40' />
                    
                    {/* Content */}
                    <View className='absolute inset-0 p-4 flex-col justify-end'>
                      <Text className='text-white text-xl font-semibold mb-2' style={{fontFamily: 'HankenGrotesk_600SemiBold'}}>
                        {community.name}
                      </Text>
                      
                      <View className='flex-row items-center gap-3'>
                        <View className='flex-row items-center bg-black/30 rounded-full px-3 py-1'>
                          <Ionicons name='locate-outline' size={14} color='white' />
                          <Text className='text-white text-sm ml-1' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                            {community.distance}
                          </Text>
                        </View>
                        
                        <View className='flex-row items-center bg-black/30 rounded-full px-3 py-1'>
                          <Ionicons name='time-outline' size={14} color='white' />
                          <Text className='text-white text-sm ml-1' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                            {community.duration}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Selection Circle */}
                    <View className='absolute top-4 right-4'>
                      <View className={`w-6 h-6 rounded-full border-2 border-white ${
                        selectedCommunity === community.id ? 'bg-blue-600' : 'bg-transparent'
                      }`}>
                        {selectedCommunity === community.id && (
                          <View className='flex-1 items-center justify-center'>
                            <View className='w-2 h-2 bg-white rounded-full' />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>


            {/* Join Button */}
            <View className='absolute bottom-0 bg-white left-0 right-0'>
                <View className='w-[90%] self-center py-4'>
                    <TouchableOpacity 
                        className={`py-4 rounded-xl ${
                        selectedCommunity !== null ? 'bg-[#0066CC]' : 'bg-gray-300'
                        }`}
                        disabled={selectedCommunity === null}
                        onPress={() => {
                            const selectedCommunityData = communities.find(c => c.id === selectedCommunity);
                            setShowSuccessModal(true);
                        }}
                    >
                        <Text 
                        className={`text-center text-base font-semibold ${
                            selectedCommunity !== null ? 'text-white' : 'text-gray-400'
                        }`}
                        style={{fontFamily: 'HankenGrotesk_600SemiBold'}}
                        >
                            Join Community
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
          </>
        )}
      </View>

      <SuccessModal
            visible={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            communityName={communities.find(c => c.id === selectedCommunity)?.name || ''}
            onProceed={() => {
                setShowSuccessModal(false);
                router.push('/(access)/(stacks)/community-verification-flow/packageverification'); // or your route
            }}
        />
    </SafeAreaView>
  )
}

export default FindCommunity