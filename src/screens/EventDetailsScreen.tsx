import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EventDetailsScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { event } = route.params || {};

  if (!event) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imagePlaceholder} />
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookStall', { event })}>
          <Text style={styles.buttonText}>Book Stall</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
  },
  imagePlaceholder: {
    width: wp('70%'),
    height: hp('25%'),
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    marginBottom: hp('3%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  location: {
    fontSize: wp('4.5%'),
    color: '#555',
    marginBottom: hp('4%'),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 30,
    marginTop: hp('2%'),
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default EventDetailsScreen; 