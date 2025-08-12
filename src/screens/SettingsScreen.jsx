import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const SettingsScreen = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" showBack onBack={() => navigation.goBack()} />
      <Text style={styles.text}>Notification preferences, privacy settings, and more coming soon!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa', padding: 24 },
  text: { fontSize: 16, color: '#222', marginTop: 16 },
});

export default SettingsScreen;
