import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Footer from '../components/Footer';
import { useTab } from '../navigation/AppNavigator';

const dummyBookings = [
  { id: '1', event: 'Food Fest 2024', date: '2024-07-10', size: 'Medium' },
  { id: '2', event: 'Tech Expo', date: '2024-08-15', size: 'Large' },
  { id: '3', event: 'Handicraft Mela', date: '2024-09-01', size: 'Small' },
];

const MyBookingsScreen = () => {
  const { setActiveTab } = useTab();
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {dummyBookings.map(b => (
          <View key={b.id} style={styles.bookingCard}>
            <Text style={styles.event}>{b.event}</Text>
            <Text style={styles.detail}>Date: {b.date}</Text>
            <Text style={styles.detail}>Stall Size: {b.size}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Home button for direct navigation */}
      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          borderRadius: 20,
          padding: 12,
          alignSelf: 'center',
          marginBottom: 16,
          marginTop: 8,
        }}
        onPress={() => setActiveTab('home')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Go to Home</Text>
      </TouchableOpacity>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('2%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  list: {
    paddingBottom: hp('4%'),
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: wp('5%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  event: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: hp('0.5%'),
  },
  detail: {
    fontSize: wp('4%'),
    color: '#555',
    marginBottom: hp('0.5%'),
  },
});

export default MyBookingsScreen; 