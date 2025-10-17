import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => null,
        tabBarStyle: {
          position: 'absolute',
          bottom: 5,
          left: 0,
          right: 0,
          elevation: 0,
          borderRadius: 100,
          borderColor: 'white',
          borderTopWidth: 3,
          borderBottomWidth: 3,
          borderLeftWidth: 3,
          borderRightWidth: 3,
          borderStyle: 'solid',
          height: 60,
          display: 'flex',
          marginHorizontal: 15,
          backgroundColor: '#0066CC',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
        tabBarIconStyle: {
          width: '100%',
          height: 50,
          top: -2,
          marginHorizontal: 0
        },
        tabBarItemStyle: {
          marginHorizontal: 0,
        },
        tabBarLabelStyle: {
          display: 'none',
        }
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <>
              {focused? 
                <View className='items-center flex-row bg-white rounded-full p-2 px-4'>
                    <MaterialIcons size={20} name={'home-filled'} color={'#3D68FF'} />
                </View>:

                <View>
                    <MaterialIcons size={20} name={'home-filled'} color={'#61ADFA'} />
                </View>
              }
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ focused }) => (
              <>
              {focused? 
                <View className='items-center flex-row bg-white rounded-full p-2 px-4'>
                    <MaterialIcons size={20} name={'people'} color={'#3D68FF'} />
                </View>:

                <View>
                    <MaterialIcons size={20} name={'people'} color={'#61ADFA'} />
                </View>
              }
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => (
              <>
              {focused? 
                <View className='items-center flex-row bg-white rounded-full p-2 px-4'>
                    <AntDesign size={20} name={'message'} color={'#3D68FF'} />
                </View>:

                <View>
                    <AntDesign size={20} name={'message'} color={'#61ADFA'} />
                </View>
              }
            </>
          ),
        }}
      />


      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
              <>
              {focused? 
                <View className='items-center flex-row bg-white rounded-full p-2 px-4'>
                    <MaterialIcons size={20} name={'person'} color={'#3D68FF'} />
                </View>:

                <View>
                    <MaterialIcons size={20} name={'person'} color={'#61ADFA'} />
                </View>
              }
            </>
          ),
        }}
      />
    </Tabs>
  );
}
