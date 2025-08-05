import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const AboutScreen = () => {
  const navigation: any = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="About" showBack onBack={() => navigation.goBack()} />
      <Text style={styles.text}>expoWorld is your one-stop solution for booking stalls at events. Discover, book, and manage your event presence with ease!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa', padding: 24 },
  text: { fontSize: 16, color: '#222', marginTop: 16 },
});

export default AboutScreen; 