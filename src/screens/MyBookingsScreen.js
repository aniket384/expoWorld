import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';
import { useTheme } from '../utils/theme';

const MyBookingsScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  // Sample booking data
  const [bookings] = useState([
    {
      id: '1',
      eventName: 'Tech Expo 2024',
      stallName: 'Premium Stall A1',
      date: '2024-03-15',
      price: 500,
      status: 'Confirmed',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    },
    {
      id: '2',
      eventName: 'Food Festival',
      stallName: 'Standard Stall B3',
      date: '2024-04-20',
      price: 300,
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    },
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderBooking = ({ item }) => (
    <View style={[styles.bookingCard, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.image }} style={styles.bookingImage} />
      <View style={styles.bookingInfo}>
        <Text style={[styles.eventName, { color: colors.text }]}>{item.eventName}</Text>
        <Text style={[styles.stallName, { color: colors.textSecondary }]}>{item.stallName}</Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>{item.date}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>{formatPrice(item.price)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Confirmed' ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="My Bookings" showBack onBack={() => navigation.goBack()} />
      
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: wp('4%'),
  },
  bookingCard: {
    flexDirection: 'row',
    padding: wp('4%'),
    borderRadius: 12,
    marginBottom: hp('2%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 8,
    marginRight: wp('4%'),
  },
  bookingInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  stallName: {
    fontSize: wp('4%'),
    marginBottom: hp('0.5%'),
  },
  date: {
    fontSize: wp('3.5%'),
    marginBottom: hp('0.5%'),
  },
  price: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontWeight: '600',
  },
});

export default MyBookingsScreen;
