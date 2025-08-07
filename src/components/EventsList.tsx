import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useFirebaseData } from '../hooks/useFirebaseData';

interface Event {
  id: string;
  category: string;
  city: string;
  createdAt: number;
  date: string;
  duration: string;
  eventName: string;
  layoutUrl: string;
  organizerId: string;
  pricingType: string;
  stallPrices: (string | null)[];
  state: string;
  totalStalls: string;
  uniformPrice: string;
}

interface EventsListProps {
  onEventPress?: (event: Event) => void;
}

const EventsList: React.FC<EventsListProps> = ({ onEventPress }) => {
  const { data: events, loading, error } = useFirebaseData<Event>('events', true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => onEventPress?.(item)}
      activeOpacity={0.8}
    >
      <View style={styles.eventContent}>
        <Text style={styles.eventName}>{item.eventName}</Text>
        <Text style={styles.eventCategory}>{item.category.toUpperCase()}</Text>
        
        <View style={styles.eventDetails}>
          <Text style={styles.detailText}>
            📍 {item.city}, {item.state}
          </Text>
          <Text style={styles.detailText}>
            📅 {formatDate(item.date)}
          </Text>
          <Text style={styles.detailText}>
            ⏱️ {item.duration} days
          </Text>
          <Text style={styles.detailText}>
            🏢 Total Stalls: {item.totalStalls}
          </Text>
        </View>

        <View style={styles.pricingSection}>
          {item.pricingType === 'uniform' ? (
            <Text style={styles.priceText}>
              ₹{item.uniformPrice} per stall
            </Text>
          ) : (
            <Text style={styles.priceText}>
              Variable pricing available
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading events: {error}</Text>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No events available at the moment</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Events</Text>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventContent: {
    padding: 16,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  eventCategory: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pricingSection: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default EventsList;
