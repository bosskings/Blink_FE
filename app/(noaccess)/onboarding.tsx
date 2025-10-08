import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg'

const { width, height } = Dimensions.get('window')

const Onboarding = () => {
  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar style='light'/>
      
      {/* Header */}
      <View className="pt-12 px-5">
        <Text className="text-gray-400 text-base">Onboarding Screen</Text>
      </View>

      {/* 3D Map Illustration */}
      <View className="flex-1 items-center justify-center">
        <Svg width={width} height={height * 0.6} viewBox="0 0 400 560">
          <Defs>
            <LinearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#10b981" stopOpacity="1" />
              <Stop offset="1" stopColor="#059669" stopOpacity="1" />
            </LinearGradient>
            <LinearGradient id="buildingGrad1" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#e0e7ff" stopOpacity="1" />
              <Stop offset="1" stopColor="#c7d2fe" stopOpacity="1" />
            </LinearGradient>
            <LinearGradient id="buildingGrad2" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#6366f1" stopOpacity="1" />
              <Stop offset="1" stopColor="#4f46e5" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          
          {/* Ground/Map base */}
          <Path
            d="M 0 200 Q 200 180 400 200 L 400 560 L 0 560 Z"
            fill="url(#groundGrad)"
          />
          
          {/* Map sections - lighter green areas */}
          <Path
            d="M 20 280 L 180 260 L 160 400 L 40 420 Z"
            fill="#6ee7b7"
            opacity="0.6"
          />
          
          <Path
            d="M 220 350 L 380 340 L 370 480 L 200 500 Z"
            fill="#34d399"
            opacity="0.5"
          />

          {/* Purple park area */}
          <Path
            d="M 100 80 Q 200 60 320 100 Q 340 180 300 240 Q 200 260 120 220 Q 80 160 100 80 Z"
            fill="#c084fc"
            opacity="0.8"
          />

          {/* Roads - light gray */}
          <Path
            d="M 0 140 L 400 120 L 400 155 L 0 175 Z"
            fill="#d1d5db"
          />
          <Path
            d="M 180 0 L 200 0 L 220 560 L 200 560 Z"
            fill="#d1d5db"
          />
          <Path
            d="M 0 320 L 400 300 L 400 335 L 0 355 Z"
            fill="#d1d5db"
          />

          {/* Left Building */}
          <G>
            {/* Building front */}
            <Rect x="50" y="290" width="60" height="90" fill="url(#buildingGrad1)" />
            {/* Building side */}
            <Path
              d="M 110 290 L 130 280 L 130 370 L 110 380 Z"
              fill="#a5b4fc"
            />
            {/* Building top */}
            <Path
              d="M 50 290 L 70 280 L 130 280 L 110 290 Z"
              fill="#e0e7ff"
            />
            {/* Windows */}
            <Rect x="60" y="305" width="12" height="15" fill="#6366f1" />
            <Rect x="78" y="305" width="12" height="15" fill="#6366f1" />
            <Rect x="96" y="305" width="8" height="15" fill="#6366f1" />
            <Rect x="60" y="330" width="12" height="15" fill="#6366f1" />
            <Rect x="78" y="330" width="12" height="15" fill="#6366f1" />
            <Rect x="96" y="330" width="8" height="15" fill="#6366f1" />
            <Rect x="60" y="355" width="12" height="15" fill="#6366f1" />
            <Rect x="78" y="355" width="12" height="15" fill="#6366f1" />
            <Rect x="96" y="355" width="8" height="15" fill="#6366f1" />
          </G>

          {/* Right Building */}
          <G>
            {/* Building front */}
            <Rect x="310" y="265" width="70" height="110" fill="url(#buildingGrad2)" />
            {/* Building side */}
            <Path
              d="M 380 265 L 400 255 L 400 365 L 380 375 Z"
              fill="#4338ca"
            />
            {/* Building top */}
            <Path
              d="M 310 265 L 330 255 L 400 255 L 380 265 Z"
              fill="#818cf8"
            />
            {/* Windows */}
            <Rect x="322" y="280" width="14" height="18" fill="#1e293b" />
            <Rect x="344" y="280" width="14" height="18" fill="#1e293b" />
            <Rect x="366" y="280" width="10" height="18" fill="#1e293b" />
            <Rect x="322" y="310" width="14" height="18" fill="#1e293b" />
            <Rect x="344" y="310" width="14" height="18" fill="#1e293b" />
            <Rect x="366" y="310" width="10" height="18" fill="#1e293b" />
            <Rect x="322" y="340" width="14" height="18" fill="#1e293b" />
            <Rect x="344" y="340" width="14" height="18" fill="#1e293b" />
            <Rect x="366" y="340" width="10" height="18" fill="#1e293b" />
          </G>

          {/* Location Pin Shadow */}
          <Ellipse cx="207" cy="345" rx="35" ry="8" fill="#000000" opacity="0.2" />

          {/* Location Pin */}
          <G>
            {/* Pin body */}
            <Path
              d="M 207 240 C 180 240 158 262 158 289 C 158 310 207 340 207 340 C 207 340 256 310 256 289 C 256 262 234 240 207 240 Z"
              fill="#a855f7"
            />
            {/* Pin hole */}
            <Circle cx="207" cy="289" r="20" fill="#1f2937" />
            {/* Pin highlight */}
            <Path
              d="M 185 265 C 190 255 200 248 212 248 C 210 248 195 255 190 270 Z"
              fill="#e9d5ff"
              opacity="0.5"
            />
          </G>
        </Svg>
      </View>

      {/* Content Card */}
      <View className="bg-white rounded-t-3xl px-6 pt-10 pb-8">
        <Text className="text-3xl font-bold text-center text-gray-900 mb-3">
          Your No. 1 Community{'\n'}Marketplace
        </Text>
        
        <Text className="text-center text-gray-600 text-base mb-8">
          Find what you need and support{'\n'}people around you instantly
        </Text>

        <TouchableOpacity 
          className="bg-blue-600 rounded-xl py-4 mb-4"
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Get Started
          </Text>
        </TouchableOpacity>

        {/* Bottom indicator */}
        <View className="items-center">
          <View className="w-32 h-1 bg-gray-900 rounded-full" />
        </View>
      </View>
    </View>
  )
}

export default Onboarding