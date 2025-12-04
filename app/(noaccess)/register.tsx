import { SolidMainButton } from "@/components/Btns"
import { Headers } from "@/components/Headers"
import { useRegistration } from "@/hooks/mutations/auth"
import { Ionicons } from "@expo/vector-icons"
import { ErrorMessage } from "@hookform/error-message"
import { Link, router } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from "react-native-toast-notifications"


interface RegisterFormData {
  email: string;
  phone: string;
  password: string;
}

const Register = () => {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone')
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast();


  const {
    control,
    handleSubmit,
    formState: { errors: errors },
  } = useForm({
    defaultValues: {
      email: "",
      phone: "",
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

 const {mutate, isPending, reset } = useRegistration();

  const onSubmit = (data: RegisterFormData) => {
    try {
      mutate(data, {

        onSuccess: (response: any) => {
          reset()
          toast.show('Registration Successfull', { type: "success" });
          console.log('Registration successful:', response?.data);
          // AsyncStorage.setItem('blink_token', response?.data?.token?.access);
          // router.replace('/(access)/(tabs)/home');
        },
        onError: (error: any) => {
          console.log('Login failed:', error.response);
          
          let errorMessage = 'Login failed. Please try again.';
          let noAccountFound = error.response.data.error
          
          try {
            if (error?.response?.data?.detail) {
              errorMessage = error.response.data.detail;
            } 

            if (error?.response?.data?.message) {
              errorMessage = error.response.data.message;
            } 
            
            if (error?.message) {
              errorMessage = error.message;
            }
            
            if (noAccountFound) {
              errorMessage = 'Invalid Credentials';
            }

            
            if (typeof errorMessage !== 'string') {
              errorMessage = 'Login failed. Please try again.';
            }
            
            toast.show(errorMessage, { type: "danger" });
          } catch (toastError) {
            console.error('Toast error:', toastError);
            toast.show('Login failed. Please try again.', { type: "danger" });
          }
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.show('An unexpected error occurred.', { type: "danger" });
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar style='dark'/>
      
      <ScrollView className='flex-1'>
        <View className='px-6 mt-6'>
          {/* Header */}
          <View className='items-center mb-8'>
            
            <Headers onPress={()=> router.back()}/>
            
            <View className='items-center mt-4'>
              <Text className='text-sm text-gray-600 mb-2' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                Returning user? <Link href='/login' className='text-blue-600'><Text className='text-blue-600 font-semibold'>Login</Text></Link>
              </Text>
              <Text className='text-2xl font-bold text-center my-2' style={{fontFamily: 'HankenGrotesk_700Bold'}}>
                Sign up with {activeTab === 'phone' ? 'Phone' : 'Email'}
              </Text>
              <Text className='text-gray-600 text-center' style={{fontFamily: 'HankenGrotesk_400Regular'}}>
                Please provide a valid {activeTab === 'phone' ? 'phone number' : 'email address'} to proceed
              </Text>
            </View>
          </View>


          {/* Email Form */}
          <View>
            <View className='mb-5'>
              <Text style={styles.titleStyle}>Email Address</Text>
              <Controller
                name="email"
                control={control}
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
                errors={errors}
                name="email"
                render={({ message }) => (
                  <Text className="pl-2 pt-3 text-sm text-red-600">
                    {message}
                  </Text>
                )}
              />
            </View>

            <View className='mb-5'>
              <Text style={styles.titleStyle}>Phone Number</Text>
              <Controller
                name="phone"
                control={control}
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
                errors={errors}
                name="phone"
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
                control={control}
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
                errors={errors}
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
              <SolidMainButton text="Continue" onPress={handleSubmit(onSubmit)}/>
            </View>
          </View>

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