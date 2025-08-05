import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.arrow}>{Platform.OS === 'ios' ? '‹' : '<'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    left: 0,
    top: Platform.OS === 'ios' ? 44 : 16,
    zIndex: 10,
  },
  arrow: {
    fontSize: 32,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default CustomBackButton; 