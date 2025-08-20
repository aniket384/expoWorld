import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import Header from '../components/Header';

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mobile, autoSend } = route.params || {};

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [codeSent, setCodeSent] = useState(false);

  const otpInputs = useRef([]);

  useEffect(() => {
    if (autoSend && mobile) {
      console.log('Auto-sending OTP on screen load');
      handleSendCode();
    }
  }, [autoSend, mobile]);

  const handleSendCode = async () => {
    console.log('handleSendCode called with mobile:', mobile);
    if (!mobile) {
      setError('Mobile number not provided');
      console.log('Mobile number not provided');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      console.log('Attempting to send OTP to:', `+91${mobile}`);
      const confirmation = await auth().signInWithPhoneNumber(`+91${mobile}`);
      console.log('OTP confirmation object:', confirmation);
      setConfirm(confirmation);
      setCodeSent(true);
      
      Alert.alert('OTP Sent', 'Please check your SMS for the verification code');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    console.log('handleVerifyOTP called with otp:', otp);
    if (!confirm || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      console.log('Invalid OTP or confirmation object missing');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      console.log('Verifying OTP:', otp);
      await confirm.confirm(otp);
      console.log('OTP verified successfully');
      
      Alert.alert('Success', 'Phone number verified successfully!');
      
      // Check if this is an organizer login
      const { isOrganizer } = route.params || {};
      if (isOrganizer) {
        navigation.navigate('OrganizerDashboard');
      } else {
        navigation.navigate('MainTabs');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError(error.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    console.log('handleResendCode called with mobile:', mobile);
    if (!mobile) return;
    
    try {
      setLoading(true);
      setError('');
      
      console.log('Resending OTP to:', `+91${mobile}`);
      const confirmation = await auth().signInWithPhoneNumber(`+91${mobile}`);
      console.log('New OTP confirmation object:', confirmation);
      setConfirm(confirmation);
      
      Alert.alert('OTP Resent', 'A new verification code has been sent');
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError(error.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (text, index) => {
    const newOtp = otp.split('');
    newOtp[index] = text;
    setOtp(newOtp.join(''));

    // Move to next input
    if (text && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Verify OTP" showBack onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to +91{mobile}
          </Text>

          <View style={styles.otpContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TextInput
                key={index}
                ref={(ref) => { otpInputs.current[index] = ref; }}
                style={styles.otpInput}
                placeholder="0"
                keyboardType="phone-pad"
                maxLength={1}
                value={otp[index] || ''}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                editable={!loading}
              />
            ))}
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={codeSent ? handleVerifyOTP : handleSendCode}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Processing...' : codeSent ? 'Verify OTP' : 'Send OTP'}
            </Text>
          </TouchableOpacity>

          {codeSent && (
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendCode}
              disabled={loading}
            >
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#666',
    marginBottom: hp('4%'),
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  otpInput: {
    width: wp('12%'),
    height: wp('12%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#222',
    backgroundColor: '#f7f8fa',
  },
  error: {
    color: 'red',
    marginBottom: hp('1%'),
    fontSize: wp('4%'),
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 30,
    marginTop: hp('2%'),
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resendButton: {
    marginTop: hp('2%'),
  },
  resendText: {
    color: '#007AFF',
    fontSize: wp('4%'),
  },
});

export default OTPScreen;
