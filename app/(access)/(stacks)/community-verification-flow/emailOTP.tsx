import { SolidMainButton } from '@/components/Btns';
import { Headers } from '@/components/Headers';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTPEmail = () => {
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
         <View className='py-6'>
              <Headers onPress={()=>router.back()}/>
          </View>

        {/* Title */}
        <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="text-2xl font-bold text-gray-900 mb-2">
          Enter 4-digit code
        </Text>

        {/* Description */}
        <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="text-gray-600 mb-8">
          We sent a verification code to your phone number: +234802194139
        </Text>

        {/* OTP Input Fields */}
        <View className="flex-row justify-between mb-4">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              className="w-[22%] h-20 border-2 border-gray-300 rounded-xl text-center text-2xl font-semibold"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              style={{fontFamily: 'HankenGrotesk_500Medium'}}
            />
          ))}
        </View>

        {/* Resend Code Link */}
        <View className="flex-row justify-center mb-8">
          <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="text-gray-600">{"You didn't receive any code? "}</Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={{fontFamily: 'HankenGrotesk_500Medium'}} className="text-blue-600 font-medium">Resend code</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        <View className='mb-8'>
          <SolidMainButton text="Verify OTP" onPress={()=>handleVerify}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPEmail;