import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../utils/theme';

const dummyEvents = [
  { id: '1', title: 'Food Fest 2024', location: 'Central Park', date: '2024-07-10', category: 'nearby' },
  { id: '2', title: 'Tech Expo', location: 'City Hall', date: '2024-08-15', category: 'city' },
  { id: '3', title: 'State Carnival', location: 'State Arena', date: '2024-09-01', category: 'state' },
  { id: '4', title: 'Big Business Summit', location: 'Expo Center', date: '2024-10-05', category: 'popular' },
  { id: '5', title: 'Mega Trade Show', location: 'Grand Pavilion', date: '2024-11-20', category: 'big' },
  { id: '6', title: 'Handicraft Mela', location: 'Art Plaza', date: '2024-12-12', category: 'city' },
  { id: '7', title: 'Startup Meet', location: 'Innovation Hub', date: '2024-08-22', category: 'nearby' },
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
  const navigation: any = useNavigation();
  const { colors, font, spacing } = useTheme();

  const renderEvents = (category: string) => {
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