import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const TermsScreen = () => {
  const navigation: any = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Terms & Privacy" showBack onBack={() => navigation.goBack()} />
      <Text style={styles.text}>By using expoWorld, you agree to our terms of service and privacy policy. Your data is safe with us.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa', padding: 24 },
  text: { fontSize: 16, color: '#222', marginTop: 16 },
});

export default TermsScreen; 