import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';
import { useTheme } from '../utils/theme';

const BookStallScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, font, spacing } = useTheme();
  const { event, stall } = route.params || {};

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    description: '',
    requirements: '',
  });

  const [selectedStall, setSelectedStall] = useState(stall || null);

  if (!event) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    if (!formData.businessName || !formData.ownerName || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!selectedStall) {
      Alert.alert('Error', 'Please select a stall');
      return;
    }

    Alert.alert(
      'Confirm Booking',
      `Are you sure you want to book ${selectedStall.name} for ${formatPrice(selectedStall.price)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert(
              'Success',
              'Your stall booking has been confirmed! You will receive a confirmation email shortly.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('MyBookings'),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const renderStallSelection = () => {
    return event.stalls.map((stallItem) => (
      <TouchableOpacity
        key={stallItem.id}
        style={[
          styles.stallCard,
          { backgroundColor: colors.card, borderColor: colors.border },
          selectedStall?.id === stallItem.id && { borderColor: colors.primary, borderWidth: 2 },
        ]}
        onPress={() => setSelectedStall(stallItem)}
        disabled={!stallItem.available}
      >
        <View style={styles.stallHeader}>
          <Text style={[styles.stallName, { color: colors.text }]}>{stallItem.name}</Text>
          <View style={[styles.availabilityBadge, { backgroundColor: stallItem.available ? '#4CAF50' : '#FF5252' }]}>
            <Text style={styles.availabilityText}>
              {stallItem.available ? 'Available' : 'Booked'}
            </Text>
          </View>
        </View>
        <Text style={[styles.stallType, { color: colors.textSecondary }]}>Type: {stallItem.type}</Text>
        <Text style={[styles.stallPrice, { color: colors.primary }]}>
          {formatPrice(stallItem.price)}
        </Text>
        {!stallItem.available && (
          <Text style={[styles.unavailableText, { color: colors.textSecondary }]}>
            This stall is already booked
          </Text>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Book Stall" showBack onBack={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event Summary */}
        <View style={[styles.eventSummary, { backgroundColor: colors.card }]}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View style={styles.eventInfo}>
            <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
            <Text style={[styles.eventLocation, { color: colors.textSecondary }]}>
              📍 {event.location}
            </Text>
            <Text style={[styles.eventDate, { color: colors.textSecondary }]}>
              📅 {event.date}
            </Text>
          </View>
        </View>

        {/* Stall Selection */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Stall</Text>
          {renderStallSelection()}
        </View>

        {/* Booking Details */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Business Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Business Name *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter your business name"
              placeholderTextColor={colors.textSecondary}
              value={formData.businessName}
              onChangeText={(text) => handleInputChange('businessName', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Owner Name *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter owner name"
              placeholderTextColor={colors.textSecondary}
              value={formData.ownerName}
              onChangeText={(text) => handleInputChange('ownerName', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Email *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter email address"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Phone *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Enter phone number"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Business Description</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Describe your business"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
              value={formData.description}
              onChangeText={(text) => handleInputChange('description', text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Special Requirements</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Any special requirements"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
              value={formData.requirements}
              onChangeText={(text) => handleInputChange('requirements', text)}
            />
          </View>
        </View>

        {/* Booking Summary */}
        {selectedStall && (
          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Booking Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Selected Stall:</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{selectedStall.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Stall Type:</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{selectedStall.type}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Price:</Text>
              <Text style={[styles.summaryValue, { color: colors.primary }]}>{formatPrice(selectedStall.price)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.text }]}>Event:</Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>{event.title}</Text>
            </View>
          </View>
        )}

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: colors.primary }]}
            onPress={handleBooking}
          >
            <Text style={styles.bookButtonText}>
              {selectedStall ? `Book ${selectedStall.name}` : 'Select Stall First'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventSummary: {
    margin: wp('4%'),
    padding: wp('4%'),
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 8,
    marginRight: wp('4%'),
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  eventLocation: {
    fontSize: wp('3.5%'),
    marginBottom: hp('0.25%'),
  },
  eventDate: {
    fontSize: wp('3.5%'),
  },
  section: {
    margin: wp('4%'),
    padding: wp('4%'),
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  stallCard: {
    padding: wp('4%'),
    borderRadius: 12,
    marginBottom: hp('2%'),
    borderWidth: 1,
  },
  stallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  stallName: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  availabilityBadge: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    borderRadius: 12,
  },
  availabilityText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontWeight: '600',
  },
  stallType: {
    fontSize: wp('3.5%'),
    marginBottom: hp('0.5%'),
  },
  stallPrice: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  unavailableText: {
    fontSize: wp('3%'),
    marginTop: hp('0.5%'),
  },
  inputGroup: {
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: wp('3%'),
    fontSize: wp('4%'),
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: wp('3%'),
    fontSize: wp('4%'),
    minHeight: hp('10%'),
    textAlignVertical: 'top',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  summaryLabel: {
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: wp('4%'),
  },
  actionContainer: {
    padding: wp('4%'),
    marginTop: hp('2%'),
  },
  bookButton: {
    paddingVertical: hp('2%'),
    borderRadius: 30,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});

export default BookStallScreen;
