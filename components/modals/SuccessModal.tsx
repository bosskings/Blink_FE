import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SolidMainButton } from '../Btns';

const { height } = Dimensions.get('window');

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  communityName: string;
  onProceed: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  visible, 
  onClose, 
  communityName,
  onProceed 
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <Animated.View 
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: fadeAnim,
          }}
        >
          <TouchableOpacity 
            style={{ flex: 1 }} 
            activeOpacity={1} 
            onPress={onClose}
          />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 40,
            transform: [{ translateY: slideAnim }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 20,
          }}
        >
          {/* Handle Bar */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#E5E7EB',
                borderRadius: 2,
              }}
            />
          </View>

          {/* Success Icon */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#DBEAFE',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <Ionicons name="thumbs-up" size={40} color="#2563EB" />
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 8,
                textAlign: 'center',
                fontFamily: 'HankenGrotesk_700Bold'
              }}
            >
              {"You've joined your first community"}
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: '#6B7280',
                textAlign: 'center',
                lineHeight: 20,
                fontFamily: 'HankenGrotesk_400Regular'
              }}
            >
              Secure your account and stand out in your{'\n'}new community with verification
            </Text>
          </View>

          {/* Proceed Button */}
          <SolidMainButton text='Proceed to Account Verification' onPress={onProceed}/>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SuccessModal;