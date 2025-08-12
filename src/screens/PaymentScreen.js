import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';
import { useTheme } from '../utils/theme';
import { useBooking } from '../context/BookingContext';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { bookingDetails } = route.params || {};
  const { bookings, addBooking, updateBookingStatus } = useBooking();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handlePayment = () => {
    if (!cardNumber || !expiry || !cvv || !nameOnCard) {
      Alert.alert('Error', 'Please fill all payment details');
      return;
    }
    // Simulate payment success
    Alert.alert(
      'Payment Successful',
      'Thank you for your payment!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Update booking status to Confirmed
            updateBookingStatus(bookingDetails.id, 'Confirmed');
            navigation.navigate('MainTabs');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Payment" showBack onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Card Number</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          keyboardType="number-pad"
          placeholder="1234 5678 9012 3456"
          placeholderTextColor={colors.textSecondary}
          value={cardNumber}
          onChangeText={setCardNumber}
          maxLength={19}
        />
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Expiry Date</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              placeholder="MM/YY"
              placeholderTextColor={colors.textSecondary}
              value={expiry}
              onChangeText={setExpiry}
              maxLength={5}
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>CVV</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              placeholder="123"
              placeholderTextColor={colors.textSecondary}
              value={cvv}
              onChangeText={setCvv}
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.text }]}>Name on Card</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="John Doe"
          placeholderTextColor={colors.textSecondary}
          value={nameOnCard}
          onChangeText={setNameOnCard}
        />
        <TouchableOpacity
          style={[styles.payButton, { backgroundColor: colors.primary }]}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: wp('4%'),
  },
  label: {
    fontSize: wp('4%'),
    marginBottom: hp('0.5%'),
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: wp('3%'),
    marginBottom: hp('2%'),
    fontSize: wp('4%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
  },
  payButton: {
    paddingVertical: hp('2%'),
    borderRadius: 30,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});

export default PaymentScreen;

