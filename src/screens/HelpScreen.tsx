import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const HelpScreen = () => {
  const navigation: any = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Help / FAQ" showBack onBack={() => navigation.goBack()} />
      <Text style={styles.text}>For help, contact support@expoworld.com or check our FAQ in the More menu.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f8fa', padding: 24 },
  text: { fontSize: 16, color: '#222', marginTop: 16 },
});

export default HelpScreen; 