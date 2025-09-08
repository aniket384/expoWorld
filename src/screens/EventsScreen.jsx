import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import EventsList from '../components/EventsList';

const EventsScreen = () => {
  const handleEventPress = (event) => {
    console.log('Event pressed:', event);
    // Navigate to event details screen or handle event selection
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <EventsList onEventPress={handleEventPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default EventsScreen;
