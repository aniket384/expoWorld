import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import EventsList from '../components/EventsList';

const EventsScreen: React.FC = () => {
  const handleEventPress = (event: any) => {
    console.log('Event pressed:', event);
    // Navigate to event details screen or handle event selection
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <EventsList onEventPress={handleEventPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default EventsScreen;
