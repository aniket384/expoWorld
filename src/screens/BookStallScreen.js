import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

const BookStallScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { event, stall } = route.params || {};
  const { addBooking } = useBooking();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleBooking = () => {
    if (!name || !email || !phone || !company) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (!event || !stall) {
      Alert.alert('Error', 'Event or Stall information is missing');
      return;
    }

    const bookingDetails = {
      id: Date.now().toString(),
      eventId: event.id,
      eventTitle: event.title,
      stallId: stall.id,
      stallName: stall.name,
      stallPrice: stall.price,
      name,
      email,
      phone,
      company,
      requirements,
      status: 'Pending',
      date: new Date().toISOString(),
      image: event.image,
    };

    addBooking(bookingDetails);
    navigation.navigate('Payment', { bookingDetails });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Book Stall" showBack onBack={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Event Info */}
          <View style={[styles.eventCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.eventName, { color: colors.text }]}>{event?.title}</Text>
            <Text style={[styles.stallName, { color: colors.textSecondary }]}>Stall: {stall?.name}</Text>
            <Text style={[styles.stallPrice, { color: colors.primary }]}>Price: ${stall?.price}</Text>
          </View>

          {/* Booking Form */}
          <View style={[styles.form, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Booking Details</Text>
            
            <Text style={[styles.label, { color: colors.text }]}>Full Name *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
            />

            <Text style={[styles.label, { color: colors.text }]}>Email *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={[styles.label, { color: colors.text }]}>Phone Number *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.textSecondary}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Text style={[styles.label, { color: colors.text }]}>Company Name *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              placeholder="Enter your company name"
              placeholderTextColor={colors.textSecondary}
              value={company}
              onChangeText={setCompany}
            />

            <Text style={[styles.label, { color: colors.text }]}>Special Requirements</Text>
            <TextInput
              style={[styles.textArea, { borderColor: colors.border, color: colors.text }]}
              placeholder="Any special requirements or notes"
              placeholderTextColor={colors.textSecondary}
              value={requirements}
              onChangeText={setRequirements}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={[styles.bookButton, { backgroundColor: colors.primary }]}
              onPress={handleBooking}
            >
              <Text style={styles.bookButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stallName: {
    fontSize: 16,
    marginBottom: 4,
  },
  stallPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  bookButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookStallScreen;

