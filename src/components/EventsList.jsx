import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

const EventsList = ({ onEventPress }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventsRef = ref(db, 'events');
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = Object.values(data);
        setEvents(eventsArray);
        setError(null);
        console.log('Events loaded:', eventsArray.length);
      } else {
        setEvents([]);
        setError('No events found in database.');
        console.warn('No events found in database.');
      }
    }, (error) => {
      setError(error.message);
      console.error('Firebase data loading error:', error);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: '#fff' }]} onPress={() => onEventPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: '#000' }]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.details, { color: '#333' }]}>{item.location} | {item.date}</Text>
        <Text style={[styles.details, { color: '#333' }]}>Category: {item.category || 'General'}</Text>
        <Text style={[styles.details, { color: '#333' }]}>Stalls Left: {item.stallsLeft ?? 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View>
          <Text style={{ color: '#000', textAlign: 'center', marginTop: 20 }}>
            {error ? `Error: ${error}` : 'No events available'}
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    padding: 12,
    backgroundColor: '#fff',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  details: {
    fontSize: 14,
    marginTop: 2,
    color: '#333',
  },
});

export default EventsList;
