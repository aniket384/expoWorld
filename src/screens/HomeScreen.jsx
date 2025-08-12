import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../utils/theme';

// Complete dummy events with all details for booking flow
const dummyEvents = [
  {
    id: '1',
    title: 'Food Fest 2024',
    location: 'Central Park',
    date: '2024-07-10',
    category: 'nearby',
    description: 'Annual food festival featuring local and international cuisines',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    price: 50,
    capacity: 1000,
    booked: 250,
    stalls: [
      { id: 's1', name: 'Food Stall A1', price: 500, available: true, type: 'food' },
      { id: 's2', name: 'Food Stall A2', price: 500, available: true, type: 'food' },
      { id: 's3', name: 'Beverage Stall B1', price: 300, available: false, type: 'beverage' },
    ],
    amenities: ['Power Supply', 'Water Connection', 'Security', 'Parking'],
    contact: { name: 'John Smith', phone: '+1-234-567-8900', email: 'john@foodfest.com' }
  },
  {
    id: '2',
    title: 'Tech Expo',
    location: 'City Hall',
    date: '2024-08-15',
    category: 'city',
    description: 'Latest technology showcase and networking event',
    image: 'https://images.unsplash.com/photo-1515187029135-18d2c785d2e8?w=400',
    price: 100,
    capacity: 500,
    booked: 180,
    stalls: [
      { id: 's4', name: 'Tech Booth 1', price: 800, available: true, type: 'tech' },
      { id: 's5', name: 'Tech Booth 2', price: 800, available: true, type: 'tech' },
      { id: 's6', name: 'Demo Area', price: 1200, available: true, type: 'demo' },
    ],
    amenities: ['WiFi', 'Power Supply', 'Security', 'Marketing Support'],
    contact: { name: 'Sarah Johnson', phone: '+1-234-567-8901', email: 'sarah@techexpo.com' }
  },
  {
    id: '3',
    title: 'State Carnival',
    location: 'State Arena',
    date: '2024-09-01',
    category: 'state',
    description: 'State-wide carnival with rides, games, and entertainment',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400',
    price: 25,
    capacity: 2000,
    booked: 750,
    stalls: [
      { id: 's7', name: 'Game Stall 1', price: 200, available: true, type: 'games' },
      { id: 's8', name: 'Food Corner', price: 400, available: true, type: 'food' },
      { id: 's9', name: 'Retail Booth', price: 350, available: true, type: 'retail' },
    ],
    amenities: ['Power Supply', 'Water Connection', 'Security', 'Restrooms'],
    contact: { name: 'Mike Davis', phone: '+1-234-567-8902', email: 'mike@carnival.com' }
  },
  {
    id: '4',
    title: 'Big Business Summit',
    location: 'Expo Center',
    date: '2024-10-05',
    category: 'popular',
    description: 'Premier business networking and investment summit',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
    price: 200,
    capacity: 800,
    booked: 320,
    stalls: [
      { id: 's10', name: 'Premium Booth A', price: 1500, available: true, type: 'premium' },
      { id: 's11', name: 'Premium Booth B', price: 1500, available: false, type: 'premium' },
      { id: 's12', name: 'Networking Area', price: 1000, available: true, type: 'networking' },
    ],
    amenities: ['WiFi', 'Power Supply', 'Security', 'Catering', 'Marketing Support'],
    contact: { name: 'Emma Wilson', phone: '+1-234-567-8903', email: 'emma@bizsummit.com' }
  },
  {
    id: '5',
    title: 'Mega Trade Show',
    location: 'Grand Pavilion',
    date: '2024-11-20',
    category: 'big',
    description: 'Largest trade show in the region with 500+ exhibitors',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    price: 75,
    capacity: 3000,
    booked: 1200,
    stalls: [
      { id: 's13', name: 'Trade Booth 1', price: 600, available: true, type: 'trade' },
      { id: 's14', name: 'Trade Booth 2', price: 600, available: true, type: 'trade' },
      { id: 's15', name: 'Corner Booth', price: 900, available: true, type: 'corner' },
    ],
    amenities: ['WiFi', 'Power Supply', 'Security', 'Parking', 'Marketing Support'],
    contact: { name: 'David Brown', phone: '+1-234-567-8904', email: 'david@tradeshow.com' }
  },
  {
    id: '6',
    title: 'Handicraft Mela',
    location: 'Art Plaza',
    date: '2024-12-12',
    category: 'city',
    description: 'Traditional handicrafts and artisan showcase',
    image: 'https://images.unsplash.com/photo-1607706189994-eb2cdcb8f5f5?w=400',
    price: 30,
    capacity: 600,
    booked: 150,
    stalls: [
      { id: 's16', name: 'Artisan Booth 1', price: 250, available: true, type: 'artisan' },
      { id: 's17', name: 'Artisan Booth 2', price: 250, available: true, type: 'artisan' },
      { id: 's18', name: 'Craft Corner', price: 300, available: true, type: 'craft' },
    ],
    amenities: ['Power Supply', 'Security', 'Marketing Support'],
    contact: { name: 'Lisa Anderson', phone: '+1-234-567-8905', email: 'lisa@handicraft.com' }
  },
  {
    id: '7',
    title: 'Startup Meet',
    location: 'Innovation Hub',
    date: '2024-08-22',
    category: 'nearby',
    description: 'Connect with innovative startups and investors',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    price: 40,
    capacity: 400,
    booked: 95,
    stalls: [
      { id: 's19', name: 'Startup Booth 1', price: 350, available: true, type: 'startup' },
      { id: 's20', name: 'Startup Booth 2', price: 350, available: true, type: 'startup' },
      { id: 's21', name: 'Investor Corner', price: 500, available: true, type: 'investor' },
    ],
    amenities: ['WiFi', 'Power Supply', 'Security', 'Networking Support'],
    contact: { name: 'Alex Turner', phone: '+1-234-567-8906', email: 'alex@startupmeet.com' }
  },
];

const categories = [
  { key: 'nearby', label: 'Nearby Events' },
  { key: 'city', label: 'In Your City' },
  { key: 'state', label: 'In Your State' },
  { key: 'popular', label: 'Popular Events' },
  { key: 'big', label: 'Big Events' },
];

const EventIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={11} stroke="#007AFF" strokeWidth={2} fill="#EAF4FF" />
    <Path d="M7 17V9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8" stroke="#007AFF" strokeWidth={2} strokeLinejoin="round"/>
    <Path d="M9 13h6" stroke="#007AFF" strokeWidth={2} strokeLinecap="round"/>
  </Svg>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors, font, spacing } = useTheme();

  const renderEvents = (category) => {
    return dummyEvents.filter(e => e.category === category).map(event => (
      <TouchableOpacity
        key={event.id}
        style={{
          width: 180,
          minHeight: 120,
          backgroundColor: colors.card,
          borderRadius: 18,
          marginRight: spacing.lg,
          marginBottom: spacing.sm,
          shadowColor: colors.shadow,
          shadowOpacity: 1,
          shadowRadius: 12,
          elevation: 2,
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.md,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        onPress={() => navigation.navigate('EventDetails', { event })}
        activeOpacity={0.85}
      >
        <View style={{ marginBottom: spacing.sm }}><EventIcon /></View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: font.size.md, fontWeight: '700', color: colors.primary, fontFamily: font.family, marginBottom: 2 }}>{event.title}</Text>
          <Text style={{ fontSize: font.size.sm, color: colors.textSecondary, fontFamily: font.family, marginBottom: 2 }}>{event.location}</Text>
          <Text style={{ fontSize: font.size.sm, color: colors.accent, fontWeight: '600', fontFamily: font.family }}>{event.date}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="expoWorld" dark />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <View style={{
          width: '100%',
          minHeight: 120,
          backgroundColor: colors.primary,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: spacing.lg,
          paddingVertical: spacing.lg,
          shadowColor: colors.shadow,
          shadowOpacity: 1,
          shadowRadius: 12,
          elevation: 3,
        }}>
          <Text style={{ color: '#fff', fontSize: font.size.xl, fontWeight: '800', fontFamily: font.family, textAlign: 'center', paddingHorizontal: spacing.xl, letterSpacing: 1 }}>Find & Book Your Stall at the Best Events!</Text>
        </View>
        {categories.map(cat => (
          <View key={cat.key} style={{ marginBottom: spacing.lg, paddingLeft: spacing.md }}>
            <Text style={{ fontSize: font.size.lg, fontWeight: '700', color: colors.text, fontFamily: font.family, marginBottom: spacing.sm }}>{cat.label}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.sm }}>
              {renderEvents(cat.key)}
            </ScrollView>
          </View>
        ))}
        <View style={{ height: spacing.xl }} />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default HomeScreen;
