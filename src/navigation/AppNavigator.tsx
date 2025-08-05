import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import BookStallScreen from '../screens/BookStallScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import MoreScreen from '../screens/MoreScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TermsScreen from '../screens/TermsScreen';
import HelpScreen from '../screens/HelpScreen';

// Define navigation types
type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  Login: undefined;
  OTP: undefined;
  MainTabs: undefined;
  EventDetails: { event: any };
  BookStall: undefined;
  ContactUs: undefined;
  About: undefined;
  Settings: undefined;
  Terms: undefined;
  Help: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const TABS = ['home', 'bookings', 'profile', 'more'] as const;
type TabType = typeof TABS[number];

// Tab context for state management
interface TabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};

const AppNavigator = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderTabScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'bookings':
        return <MyBookingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'more':
        return <MoreScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
            {() => renderTabScreen()}
          </Stack.Screen>
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          <Stack.Screen name="BookStall" component={BookStallScreen} />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TabContext.Provider>
  );
};

export default AppNavigator;