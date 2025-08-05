import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogoSvg from '../assets/LogoSvg';

const SplashScreen = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
    // Simulate loading, then navigate to Intro or Login
    const timer = setTimeout(() => {
      navigation.replace('Intro'); // Will set up navigation stack later
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <LogoSvg size={120} />
        <Text style={styles.appName} testID="splash-app-name">expoWorld</Text>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} testID="splash-loader" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: wp('40%'),
    height: hp('20%'),
    marginBottom: hp('4%'), // increased spacing
  },
  appName: {
    fontSize: wp('9%'),
    fontWeight: '800',
    color: '#222',
    marginBottom: hp('3%'),
    marginTop: hp('2%'),
    letterSpacing: 3,
    fontFamily: 'Arial',
    textTransform: 'uppercase',
  },
  loader: {
    marginTop: hp('2.5%'),
  },
});

export default SplashScreen; 