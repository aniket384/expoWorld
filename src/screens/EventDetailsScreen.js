import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../utils/theme';
import Header from '../components/Header';

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { event } = route.params || {};

  if (!event) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Event Details" showBack onBack={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image source={{ uri: event.image }} style={styles.heroImage} />
        
        {/* Event Info Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
          <Text style={[styles.eventLocation, { color: colors.textSecondary }]}>
            📍 {event.location}
          </Text>
          <Text style={[styles.eventDate, { color: colors.textSecondary }]}>
            📅 {formatDate(event.date)}
          </Text>
          <Text style={[styles.eventPrice, { color: colors.primary }]}>
            💰 Entry: {formatPrice(event.price)}
          </Text>
        </View>

        {/* Event Details */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About This Event</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {event.description}
          </Text>
        </View>

        {/* Available Stalls */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Stalls</Text>
          {event.stalls.map((stallItem) => (
            <TouchableOpacity
              key={stallItem.id}
              style={[styles.stallCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => navigation.navigate('BookStall', { event, stall: stallItem })}
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
              <Text style={[styles.stallPrice, { color: colors.primary }]}>{formatPrice(stallItem.price)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Event Amenities */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Amenities</Text>
          <View style={styles.amenitiesContainer}>
            {event.amenities.map((amenity, index) => (
              <View key={index} style={[styles.amenityChip, { backgroundColor: colors.card }]}>
                <Text style={[styles.amenityText, { color: colors.text }]}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Information</Text>
          <View style={styles.contactRow}>
            <Text style={[styles.contactLabel, { color: colors.text }]}>Coordinator:</Text>
            <Text style={[styles.contactValue, { color: colors.textSecondary }]}>{event.contact.name}</Text>
          </View>
          <View style={styles.contactRow}>
            <Text style={[styles.contactLabel, { color: colors.text }]}>Phone:</Text>
            <Text style={[styles.contactValue, { color: colors.primary }]}>{event.contact.phone}</Text>
          </View>
          <View style={styles.contactRow}>
            <Text style={[styles.contactLabel, { color: colors.text }]}>Email:</Text>
            <Text style={[styles.contactValue, { color: colors.primary }]}>{event.contact.email}</Text>
          </View>
        </View>

          {/* Floating Action Button for Stall Booking */}
          <TouchableOpacity
            style={[styles.floatingButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('BookStall', { event, stall: event.stalls[0] })} // Pass the first stall as an example
          >
            <Text style={styles.floatingButtonText}>Book Stall</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 16,
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 16,
    marginBottom: 4,
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  stallCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  stallHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stallName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  stallType: {
    fontSize: 14,
    marginBottom: 4,
  },
  stallPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactValue: {
    fontSize: 16,
  },
  actionContainer: {
    padding: 16,
    marginTop: 16,
  },
  bookButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventDetailsScreen;
