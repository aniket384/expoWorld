import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';

const ContactUsScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Contact Us" showBack onBack={() => navigation.goBack()} dark />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Contact Form</Text>
        <TextInput style={styles.input} placeholder="Your Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Your Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={[styles.input, { height: hp('10%') }]} placeholder="Your Message" value={message} onChangeText={setMessage} multiline />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Support</Text>
        <Text style={styles.info}>Email: support@expoworld.com</Text>
        <Text style={styles.info}>Phone: +91 98765 43210</Text>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/expoworld')}><Text style={styles.social}>Twitter</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/expoworld')}><Text style={styles.social}>Facebook</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/expoworld')}><Text style={styles.social}>Instagram</Text></TouchableOpacity>
        </View>
      </View>
      <Footer />
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
    paddingHorizontal: wp('8%'),
    paddingTop: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: hp('1.2%'),
    fontSize: wp('4.5%'),
    marginBottom: hp('1.2%'),
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: hp('1.5%'),
    borderRadius: 30,
    marginBottom: hp('2%'),
    alignSelf: 'center',
    paddingHorizontal: wp('18%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  info: {
    fontSize: wp('4%'),
    color: '#555',
    marginBottom: hp('0.5%'),
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  social: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
});

export default ContactUsScreen;
