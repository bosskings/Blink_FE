import { SolidMainButton } from "@/components/Btns"
import { Headers } from "@/components/Headers"
import { Ionicons } from "@expo/vector-icons"
import { ErrorMessage } from "@hookform/error-message"
import { router } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const Register = () => {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone')
  const [showPassword, setShowPassword] = useState(false)

  // Phone form
  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm({
    defaultValues: {
      phone_number: "",
      password: "",
    },
  })

  // Email form
  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long"
    },
    validate: {
      hasLowerCase: (value: string) => /[a-z]/.test(value) || "Password must contain at least 1 lowercase character",
      hasUpperCase: (value: string) => /[A-Z]/.test(value) || "Password must contain at least 1 uppercase character",
      hasNumber: (value: string) => /[0-9]/.test(value) || "Password must contain at least 1 number",
      hasSpecialChar: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least 1 special character"
    }
  }

  const onPhoneSubmit = (data: any) => {
    console.log('Phone registration:', data)
    router.push('/(noaccess)/success/community-success')
  }

  const onEmailSubmit = (data: any) => {
    console.log('Email registration:', data)
    router.push('/(noaccess)/success/community-success')
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='dark'/>
      
      <ScrollView className='flex-1'>
        <View className='px-6 mt-6'>
          {/* Header */}
          <View className='items-center mb-8'>
            
            <Headers onPress={()=> router.back()}/>
            
            <View className='items-center'>
              <Text className='text-sm text-gray-600 mb-2' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                Returning user? <Text className='text-blue-600 font-semibold'>Login</Text>
              </Text>
              <Text className='text-2xl font-bold text-center mb-2' style={{fontFamily: 'HankenGrotesk_700Bold'}}>
                Sign up with {activeTab === 'phone' ? 'Phone' : 'Email'}
              </Text>
              <Text className='text-gray-600 text-center' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                Please provide a valid {activeTab === 'phone' ? 'phone number' : 'email address'} to proceed
              </Text>
            </View>
          </View>

          {/* Tab Selector */}
          <View className='flex-row mb-6 bg-gray-100 rounded-lg p-1'>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg ${activeTab === 'phone' ? 'bg-white' : ''}`}
              onPress={() => setActiveTab('phone')}
              style={activeTab === 'phone' && styles.activeTab}
            >
              <Text 
                className={`text-center font-semibold ${activeTab === 'phone' ? 'text-gray-900' : 'text-gray-500'}`}
                style={{fontFamily: 'HankenGrotesk_600SemiBold'}}
              >
                Phone
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`flex-1 py-3 rounded-lg ${activeTab === 'email' ? 'bg-white' : ''}`}
              onPress={() => setActiveTab('email')}
              style={activeTab === 'email' && styles.activeTab}
            >
              <Text 
                className={`text-center font-semibold ${activeTab === 'email' ? 'text-gray-900' : 'text-gray-500'}`}
                style={{fontFamily: 'HankenGrotesk_600SemiBold'}}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* Phone Number Form */}
          {activeTab === 'phone' && (
            <View>
              <View className='mb-5'>
                <Text style={styles.titleStyle}>Phone Number</Text>
                <Controller
                  name="phone_number"
                  control={phoneControl}
                  rules={{
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Please enter a valid phone number"
                    }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className='relative'>
                      <View className='absolute z-10 left-0 top-0 justify-center items-center h-full px-4 bg-gray-100 rounded-l-md border-r border-gray-200'>
                        <Text className='text-[#3A3541] font-medium'>+234</Text>
                      </View>
                      <TextInput 
                        placeholder='8022194139'
                        placeholderTextColor={"#AFAFAF"}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        keyboardType="phone-pad"
                        style={[styles.inputStyle, { paddingLeft: 70 }]}
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={11}
                      />
                    </View>
                  )}
                />
                <ErrorMessage
                  errors={phoneErrors}
                  name="phone_number"
                  render={({ message }) => (
                    <Text className="pl-2 pt-3 text-sm text-red-600">
                      {message}
                    </Text>
                  )}
                />
              </View>

              <View className='mb-5'>
                <Text style={styles.titleStyle}>Password</Text>
                <Controller
                  name="password"
                  control={phoneControl}
                  rules={passwordValidation}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className='relative'>
                      <TextInput 
                        placeholder='*********'
                        placeholderTextColor={"#AFAFAF"}
                        style={styles.inputStyle}
                        secureTextEntry={!showPassword}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                      <View className='absolute right-0 top-0 justify-center items-center h-full w-20'>
                        <Pressable
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color={"#3A3541AD"}
                          />
                        </Pressable>
                      </View>
                    </View>
                  )}
                />
                <ErrorMessage
                  errors={phoneErrors}
                  name="password"
                  render={({ message }) => (
                    <Text className="pl-2 pt-3 text-sm text-red-600">
                      {message}
                    </Text>
                  )}
                />
              </View>

              {/* Join as Business Checkbox */}
              <View className='flex-row items-center justify-end mb-6'>
                <Text className='text-sm text-gray-600 mr-2' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                  Join as Business
                </Text>
                <View className='w-5 h-5 border-2 border-gray-300 rounded' />
              </View>

              <View className="mb-4">
                <SolidMainButton text="Continue" onPress={handlePhoneSubmit(onPhoneSubmit)}/>
              </View>
            </View>
          )}

          {/* Email Form */}
          {activeTab === 'email' && (
            <View>
              <View className='mb-5'>
                <Text style={styles.titleStyle}>Email Address</Text>
                <Controller
                  name="email"
                  control={emailControl}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput 
                      placeholder='johndoe@gmail.com'
                      placeholderTextColor={"#AFAFAF"}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      keyboardType="email-address"
                      style={styles.inputStyle}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  )}
                />
                <ErrorMessage
                  errors={emailErrors}
                  name="email"
                  render={({ message }) => (
                    <Text className="pl-2 pt-3 text-sm text-red-600">
                      {message}
                    </Text>
                  )}
                />
              </View>

              <View className='mb-5'>
                <Text style={styles.titleStyle}>Password</Text>
                <Controller
                  name="password"
                  control={emailControl}
                  rules={passwordValidation}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className='relative'>
                      <TextInput 
                        placeholder='*********'
                        placeholderTextColor={"#AFAFAF"}
                        style={styles.inputStyle}
                        secureTextEntry={!showPassword}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                      <View className='absolute right-0 top-0 justify-center items-center h-full w-20'>
                        <Pressable
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color={"#3A3541AD"}
                          />
                        </Pressable>
                      </View>
                    </View>
                  )}
                />
                <ErrorMessage
                  errors={emailErrors}
                  name="password"
                  render={({ message }) => (
                    <Text className="pl-2 pt-3 text-sm text-red-600">
                      {message}
                    </Text>
                  )}
                />
              </View>

              {/* Join as Business Checkbox */}
              <View className='flex-row items-center justify-end mb-6'>
                <Text className='text-sm text-gray-600 mr-2' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                  Join as Business
                </Text>
                <View className='w-5 h-5 border-2 border-gray-300 rounded' />
              </View>

              <View className="mb-4">
                <SolidMainButton text="Continue" onPress={handleEmailSubmit(onEmailSubmit)}/>
              </View>
            </View>
          )}

          {/* Divider */}
          <View className='flex-row items-center my-6'>
            <View className='flex-1 h-px bg-gray-300' />
            <Text className='mx-4 text-gray-500' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
              or sign in with
            </Text>
            <View className='flex-1 h-px bg-gray-300' />
          </View>

          {/* Social Buttons */}
          <TouchableOpacity className='flex-row items-center justify-center py-4 border border-gray-300 rounded-lg mb-3'>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#3A3541"
            />
            <Text className='ml-2 text-gray-900 font-semibold' style={{fontFamily: 'HankenGrotesk_600SemiBold'}}>
              Continue with Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-center py-4 border border-gray-300 rounded-lg mb-6'>
            <Ionicons
              name="logo-google"
              size={20}
              color="#3A3541"
            />
            
            <Text className='ml-2 text-gray-900 font-semibold' style={{fontFamily: 'HankenGrotesk_600SemiBold'}}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text className='text-center text-xs text-gray-500 mb-8' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
            By continuing, you agree to our{' '}
            <Text className='text-blue-600'>Terms & Conditions</Text>
            {'\n'}and <Text className='text-blue-600'>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  inputStyle: {
    borderRadius: 7,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontFamily: "HankenGrotesk_400Regular",
    backgroundColor: '#F6F6F6',
    color: '#3A3541',
  },

  titleStyle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 15,
    color: "#3A3541",
    paddingBottom: 8,
    paddingTop: 6
  },

  activeTab: {
  }
})