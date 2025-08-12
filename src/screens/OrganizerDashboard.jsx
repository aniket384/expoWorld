import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const OrganizerDashboard = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#181A20' }}>
      <Header title="Organizer Dashboard" dark />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 32 }}>Welcome, Organizer!</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#007AFF', padding: 20, borderRadius: 16 }}
          onPress={() => navigation.navigate('CreateEvent')}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Create New Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrganizerDashboard;
