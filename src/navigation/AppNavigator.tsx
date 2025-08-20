import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import HomeScreen from '../screens/HomeScreen';
import HomeScreenOrganizer from '../screens/HomeScreenOrganizer';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import BookStallScreen from '../screens/BookStallScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import MoreScreen from '../screens/MoreScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import PreviousEventsScreen from '../screens/PreviousEventsScreen';
import TotalParticipantsScreen from '../screens/TotalParticipantsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TermsScreen from '../screens/TermsScreen';
import HelpScreen from '../screens/HelpScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AboutScreen from '../screens/AboutScreen';

// Define navigation types
type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  Login: undefined;
  OTP: undefined;
  MainTabs: undefined;
  OrganizerDashboard: undefined;
  EventDetails: { event: any };
  BookStall: undefined;
  Payment: { bookingDetails: any };
  ContactUs: undefined;
  About: undefined;
  Settings: undefined;
  Terms: undefined;
  Help: undefined;
  CreateEvent: undefined;
  PreviousEvents: undefined;
  TotalParticipants: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const TABS = ['home', 'bookings', 'profile', 'more'] as const;
type TabType = typeof TABS[number];

// Tab context for state management
interface TabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};

const AppNavigator = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

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
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
            {() => renderTabScreen()}
          </Stack.Screen>
          <Stack.Screen 
            name="EventDetails" 
            component={EventDetailsScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen 
            name="BookStall" 
            component={BookStallScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen 
            name="Payment" 
            component={PaymentScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen 
            name="ContactUs" 
            component={ContactUsScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen 
            name="About" 
            component={AboutScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen 
            name="Terms" 
            component={TermsScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen 
            name="Help" 
            component={HelpScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
          />
          <Stack.Screen 
            name="OrganizerDashboard" 
            component={HomeScreenOrganizer} 
          />
          <Stack.Screen 
            name="CreateEvent" 
            component={CreateEventScreen} 
          />
          <Stack.Screen 
            name="PreviousEvents" 
            component={PreviousEventsScreen} 
          />
          <Stack.Screen 
            name="TotalParticipants" 
            component={TotalParticipantsScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TabContext.Provider>
  );
};

export default AppNavigator;
