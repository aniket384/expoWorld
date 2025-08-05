import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';

const CreateEventScreen = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [stalls, setStalls] = useState('');

  const handleCreate = () => {
    // For now, just show an alert
    Alert.alert('Event Created', `Event: ${title}\nDate: ${date}\nLocation: ${location}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#181A20' }}>
      <Header title="Create Event" showBack dark />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Event Details</Text>
        <TextInput placeholder="Event Title" placeholderTextColor="#aaa" value={title} onChangeText={setTitle} style={{ backgroundColor: '#23272F', color: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 }} />
        <TextInput placeholder="Date" placeholderTextColor="#aaa" value={date} onChangeText={setDate} style={{ backgroundColor: '#23272F', color: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 }} />
        <TextInput placeholder="Location" placeholderTextColor="#aaa" value={location} onChangeText={setLocation} style={{ backgroundColor: '#23272F', color: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 }} />
        <TextInput placeholder="Description" placeholderTextColor="#aaa" value={description} onChangeText={setDescription} style={{ backgroundColor: '#23272F', color: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 }} multiline numberOfLines={3} />
        <TextInput placeholder="Stall Details (number, size, price, etc.)" placeholderTextColor="#aaa" value={stalls} onChangeText={setStalls} style={{ backgroundColor: '#23272F', color: '#fff', borderRadius: 8, padding: 12, marginBottom: 24 }} multiline numberOfLines={2} />
        <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center' }} onPress={handleCreate}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Create Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateEventScreen; 