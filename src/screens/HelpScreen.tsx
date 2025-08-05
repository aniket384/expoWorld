import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const HelpScreen = () => (
  <SafeAreaView style={styles.container}>
    <Header title="Help / FAQ" />
    <Text style={styles.text}>For help, contact support@expoworld.com or check our FAQ in the More menu.</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa', padding: 24 },
  text: { fontSize: 16, color: '#222', marginTop: 16 },
});

export default HelpScreen; 