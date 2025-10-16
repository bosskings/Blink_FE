import { SolidMainButton } from '@/components/Btns'
import { Headers } from '@/components/Headers'
import { ErrorMessage } from '@hookform/error-message'
import { router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const EmailVerification = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log('Email verification:', data)
    router.push('/(access)/(stacks)/community-verification-flow/emailOTP')
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className='py-6'>
          <Headers onPress={() => router.back()} />
        </View>

        {/* Title */}
        <Text style={{ fontFamily: 'HankenGrotesk_500Medium' }} className="text-2xl font-bold text-gray-900 mb-2">
          Enter your email
        </Text>

        {/* Description */}
        <Text style={{ fontFamily: 'HankenGrotesk_500Medium' }} className="text-gray-600 mb-8">
          Please provide a valid email address to proceed
        </Text>

        {/* Email Input */}
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

        {/* Submit Button */}
        <View className="mb-4">
          <SolidMainButton text="Continue" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EmailVerification

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
})