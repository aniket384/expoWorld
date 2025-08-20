import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from '../utils/theme';

const HomeScreenOrganizer = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Organizer Dashboard" dark />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.text }}>Welcome, Organizer!</Text>
        
        <TouchableOpacity
          style={{
            backgroundColor: colors.card,
            borderRadius: 8,
            padding: 16,
            marginVertical: 8,
          }}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <Text style={{ color: colors.text }}>Create New Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.card,
            borderRadius: 8,
            padding: 16,
            marginVertical: 8,
          }}
          onPress={() => navigation.navigate('PreviousEvents')}
        >
          <Text style={{ color: colors.text }}>View Previous Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.card,
            borderRadius: 8,
            padding: 16,
            marginVertical: 8,
          }}
          onPress={() => navigation.navigate('TotalParticipants')}
        >
          <Text style={{ color: colors.text }}>Total Participants</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

export default HomeScreenOrganizer;