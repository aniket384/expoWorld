import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../utils/theme';

const PreviousEventsScreen = () => {
  const { colors } = useTheme();

  // Sample data for previous events
  const previousEvents = [
    { id: '1', title: 'Music Festival', date: '2023-09-15' },
    { id: '2', title: 'Art Exhibition', date: '2023-08-20' },
    { id: '3', title: 'Food Fair', date: '2023-07-10' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Previous Events</Text>
      <FlatList
        data={previousEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.eventCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.eventTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.eventDate, { color: colors.textSecondary }]}>
              Date: {item.date}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
  },
});

export default PreviousEventsScreen;
