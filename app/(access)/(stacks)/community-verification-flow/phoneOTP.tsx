import React, { useRef, useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const OTPPhone = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('Verifying OTP:', otpCode);
    // Add your verification logic here
  };

  const handleResendCode = () => {
    console.log('Resending code...');
    // Add your resend logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="pt-4 pb-8">
          <TouchableOpacity className="w-10 h-10 rounded-full border border-gray-300 items-center justify-center">
            <Text className="text-xl">←</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Enter 4-digit code
        </Text>

        {/* Description */}
        <Text className="text-gray-600 mb-8">
          We sent a verification code to your phone number: +234802194139
        </Text>

        {/* OTP Input Fields */}
        <View className="flex-row justify-between mb-4">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              className="w-16 h-16 border-2 border-gray-300 rounded-xl text-center text-2xl font-semibold"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Resend Code Link */}
        <View className="flex-row justify-center mb-8">
          <Text className="text-gray-600">{"You didn't receive any code? "}</Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text className="text-blue-600 font-medium">Resend code</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Verify Button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-xl py-4 mb-8"
          onPress={handleVerify}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Verify OTP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OTPPhone;