import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const slides = [
  {
    key: '1',
    title: 'Book Stalls Effortlessly',
    description: 'Find and book stalls for events in your city or anywhere, with just a few taps.',
  },
  {
    key: '2',
    title: 'Discover Trending Events',
    description: 'Explore popular, local, and upcoming events tailored to your interests.',
  },
  {
    key: '3',
    title: 'Manage Your Bookings',
    description: 'Keep track of all your stall bookings in one place, anytime, anywhere.',
  },
];

const { width } = Dimensions.get('window');

const IntroScreen = () => {
  const navigation: any = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleGetStarted = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, currentIndex === i && styles.activeDot]} />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted} testID="intro-get-started">
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('8%'),
  },
  title: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  description: {
    fontSize: wp('4.5%'),
    color: '#555',
    textAlign: 'center',
    marginBottom: hp('4%'),
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3%'),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 30,
    marginBottom: hp('5%'),
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default IntroScreen; 