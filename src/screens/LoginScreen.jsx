import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isOrganizer, setIsOrganizer] = useState(false); // New state for user type

  const handleLogin = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    // Navigate to OTP screen with mobile number param and user type
    navigation.navigate('OTP', { mobile, autoSend: true, isOrganizer });
    console.log('Mobile number:', mobile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Login" showBack onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title} testID="login-title">Login</Text>
          <Text style={styles.label}>Enter your mobile number</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsOrganizer(!isOrganizer)}>
            <Text style={styles.toggleText}>
              {isOrganizer ? 'Login as Participant' : 'Login as Organizer'}
            </Text>
          </TouchableOpacity>
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
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: wp('4.5%'),
    color: '#555',
    marginBottom: hp('1%'),
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: hp('1.5%'),
    fontSize: wp('5%'),
    marginBottom: hp('1.5%'),
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
  toggleText: {
    marginTop: hp('2%'),
    color: '#007AFF',
    fontSize: wp('4%'),
  },
});

export default LoginScreen;
