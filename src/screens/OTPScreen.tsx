import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';

const OTPScreen = () => {
  const navigation: any = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      // Simulate OTP verification
      Alert.alert('Success', 'OTP verified successfully!', [
        { text: 'OK', onPress: () => navigation.replace('MainTabs') }
      ]);
    } else {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
    }
  };

  const handleResendOTP = () => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your phone number');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Verify OTP" showBack onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We've sent a 4-digit code to your phone number
        </Text>
        
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
          <Text style={styles.verifyButtonText}>Verify OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
          <Text style={styles.resendButtonText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#666',
    textAlign: 'center',
    marginBottom: hp('4%'),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp('4%'),
  },
  otpInput: {
    width: wp('15%'),
    height: wp('15%'),
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    fontSize: wp('6%'),
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 30,
    marginBottom: hp('2%'),
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendButton: {
    paddingVertical: hp('1%'),
  },
  resendButtonText: {
    color: '#007AFF',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
});

export default OTPScreen;