import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../utils/theme';

const Avatar = () => (
  <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
    <Circle cx={40} cy={40} r={38} stroke="#007AFF" strokeWidth={4} fill="#EAF4FF" />
    <Circle cx={40} cy={34} r={16} fill="#fff" stroke="#007AFF" strokeWidth={2} />
    <Path d="M20 66c0-10.5 13-16 20-16s20 5.5 20 16" stroke="#007AFF" strokeWidth={2} fill="none" />
  </Svg>
);

const ProfileScreen = () => {
  const { colors, font, spacing } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Profile" dark />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl }}>
        <View style={{ backgroundColor: colors.card, borderRadius: 60, padding: spacing.lg, marginBottom: spacing.md, shadowColor: colors.shadow, shadowOpacity: 1, shadowRadius: 12, elevation: 2 }}><Avatar /></View>
        <Text style={{ fontSize: font.size.xl, fontWeight: '800', color: colors.text, fontFamily: font.family, marginTop: spacing.sm, marginBottom: spacing.xs }}>Aniket Sharma</Text>
        <Text style={{ fontSize: font.size.md, color: colors.textSecondary, fontFamily: font.family, marginBottom: spacing.lg }}>aniket.sharma@email.com</Text>
        <TouchableOpacity style={{ backgroundColor: colors.card, borderColor: colors.primary, borderWidth: 1.5, borderRadius: 30, paddingVertical: spacing.md, paddingHorizontal: spacing.xl, marginBottom: spacing.md, alignSelf: 'center', shadowColor: colors.shadow, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}>
          <Text style={{ color: colors.primary, fontSize: font.size.md, fontWeight: '700', fontFamily: font.family, letterSpacing: 1 }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: colors.primary, borderColor: colors.primary, borderWidth: 1.5, borderRadius: 30, paddingVertical: spacing.md, paddingHorizontal: spacing.xl, marginBottom: spacing.md, alignSelf: 'center', shadowColor: colors.shadow, shadowOpacity: 1, shadowRadius: 8, elevation: 1 }}>
          <Text style={{ color: '#fff', fontSize: font.size.md, fontWeight: '700', fontFamily: font.family, letterSpacing: 1 }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default ProfileScreen; 