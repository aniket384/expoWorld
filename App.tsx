import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { BookingProvider } from './src/context/BookingContext';
import StallBackground from './src/components/StallBackground';

const App = () => {
  return (
    <SafeAreaProvider>
      <BookingProvider>
        <StallBackground>
          <AppNavigator />
        </StallBackground>
      </BookingProvider>
    </SafeAreaProvider>
  );
};

export default App;
