import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'


const Register = () => {
//   const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone')
//   const [showPassword, setShowPassword] = useState(false)

//   // Phone form
//   const {
//     control: phoneControl,
//     handleSubmit: handlePhoneSubmit,
//     formState: { errors: phoneErrors },
//   } = useForm({
//     defaultValues: {
//       phone_number: "",
//       password: "",
//     },
//   })

//   // Email form
//   const {
//     control: emailControl,
//     handleSubmit: handleEmailSubmit,
//     formState: { errors: emailErrors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   const passwordValidation = {
//     required: "Password is required",
//     minLength: {
//       value: 8,
//       message: "Password must be at least 8 characters long"
//     },
//     validate: {
//       hasLowerCase: (value: string) => /[a-z]/.test(value) || "Password must contain at least 1 lowercase character",
//       hasUpperCase: (value: string) => /[A-Z]/.test(value) || "Password must contain at least 1 uppercase character",
//       hasNumber: (value: string) => /[0-9]/.test(value) || "Password must contain at least 1 number",
//       hasSpecialChar: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least 1 special character"
//     }
//   }

//   const onPhoneSubmit = (data: any) => {
//     console.log('Phone registration:', data)
//   }

//   const onEmailSubmit = (data: any) => {
//     console.log('Email registration:', data)
//   }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='dark'/>

      <Text>Hello World </Text>
 
    </View>
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
  },

  titleStyle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 15,
    color: "#3A3541",
    paddingBottom: 8,
    paddingTop: 6
  },

  activeTab: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  }
})