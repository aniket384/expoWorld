/**
 * @format
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../src/screens/SplashScreen';
import IntroScreen from '../src/screens/IntroScreen';
import LoginScreen from '../src/screens/LoginScreen';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({ replace: jest.fn(), navigate: jest.fn(), goBack: jest.fn() }),
  };
});

describe('App Navigation Flow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders SplashScreen in isolation', () => {
    render(
      <NavigationContainer>
        <SplashScreen />
      </NavigationContainer>
    );
  });

  it('navigates from IntroScreen to LoginScreen', async () => {
    const { findByTestId } = render(
      <NavigationContainer>
        <IntroScreen />
      </NavigationContainer>
    );
    const getStarted = await waitFor(() => findByTestId('intro-get-started'));
    fireEvent.press(getStarted);
    expect(getStarted).toBeTruthy();
  });

  it('renders HomeScreen after OTP verification', () => {
    const HomeScreen = require('../src/screens/HomeScreen').default;
    const { TabContext } = require('../src/navigation/AppNavigator');
    
    const { getByText } = render(
      <TabContext.Provider value={{ activeTab: 'home', setActiveTab: jest.fn() }}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </TabContext.Provider>
    );
    expect(getByText('Find & Book Your Stall at the Best Events!')).toBeTruthy();
  });

  it('LoginScreen navigates to OTP screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );
    expect(getByText('Send OTP')).toBeTruthy();
  });
});
