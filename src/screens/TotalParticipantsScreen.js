import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../utils/theme';

const TotalParticipantsScreen = () => {
  const { colors } = useTheme();

  // Sample data for total participants
  const participantsData = [
    { id: '1', eventTitle: 'Music Festival', total: 150 },
    { id: '2', eventTitle: 'Art Exhibition', total: 80 },
    { id: '3', eventTitle: 'Food Fair', total: 200 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Total Participants</Text>
      <FlatList
        data={participantsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.participantCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.eventTitle, { color: colors.text }]}>{item.eventTitle}</Text>
            <Text style={[styles.participantCount, { color: colors.textSecondary }]}>
              Total Participants: {item.total}
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
  participantCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  participantCount: {
    fontSize: 16,
    color: '#666',
  },
});

export default TotalParticipantsScreen;
