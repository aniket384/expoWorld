import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { BookingProvider } from './src/context/BookingContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <BookingProvider>
        <AppNavigator />
      </BookingProvider>
    </SafeAreaProvider>
  );
};

export default App;
