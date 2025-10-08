import { Text, TouchableOpacity } from "react-native";


interface ButtonProps {
    text: string;
    onPress?: () => void;
}
export const SolidMainButton = ({text, onPress, ...props}: ButtonProps)=>{
    return (
        <TouchableOpacity {...props} onPress={onPress} className="flex items-center gap-4 bg-[#0066CC] p-3.5 py-5 w-full rounded-xl">
            <Text className="text-white text-base" style={{fontFamily: 'HankenGrotesk_700Bold'}}>{text}</Text>
        </TouchableOpacity>
    )
}