import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';

const stallSizes = ['Small', 'Medium', 'Large'];

const BookStallScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { event } = route.params || {};
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [size, setSize] = useState(stallSizes[0]);

  const handleBook = () => {
    if (!name || !contact) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    // Dummy booking logic
    Alert.alert('Success', 'Stall booked successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('MyBookings') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Book Stall" showBack onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.title}>{event?.title || 'Event'}</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your Name" />
        <Text style={styles.label}>Contact</Text>
        <TextInput style={styles.input} value={contact} onChangeText={setContact} placeholder="Contact Number" keyboardType="phone-pad" />
        <Text style={styles.label}>Stall Size</Text>
        <View style={styles.dropdownContainer}>
          {stallSizes.map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.sizeOption, size === s && styles.sizeOptionSelected]}
              onPress={() => setSize(s)}
            >
              <Text style={[styles.sizeText, size === s && styles.sizeTextSelected]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleBook}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
  },
  imagePlaceholder: {
    width: wp('70%'),
    height: hp('20%'),
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  label: {
    fontSize: wp('4.2%'),
    color: '#555',
    marginTop: hp('1%'),
    marginBottom: hp('0.5%'),
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: hp('1.2%'),
    fontSize: wp('4.5%'),
    marginBottom: hp('1%'),
    backgroundColor: '#f7f8fa',
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginBottom: hp('2%'),
    alignSelf: 'flex-start',
  },
  sizeOption: {
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: wp('2%'),
    backgroundColor: '#fff',
  },
  sizeOptionSelected: {
    backgroundColor: '#007AFF',
  },
  sizeText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  sizeTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 30,
    marginTop: hp('2%'),
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default BookStallScreen; 