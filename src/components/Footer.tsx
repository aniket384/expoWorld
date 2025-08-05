import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTab } from '../navigation/AppNavigator';

const icons = {
  home: (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-4h-3v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" stroke="#007AFF" strokeWidth={2} strokeLinejoin="round"/>
    </Svg>
  ),
  bookings: (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M6 4h12a2 2 0 0 1 2 2v14l-6-3-6 3V6a2 2 0 0 1 2-2z" stroke="#007AFF" strokeWidth={2} strokeLinejoin="round"/>
    </Svg>
  ),
  profile: (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke="#007AFF" strokeWidth={2}/>
      <Path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#007AFF" strokeWidth={2} strokeLinejoin="round"/>
    </Svg>
  ),
  more: (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Circle cx={4} cy={12} r={2} fill="#007AFF" />
      <Circle cx={12} cy={12} r={2} fill="#007AFF" />
      <Circle cx={20} cy={12} r={2} fill="#007AFF" />
    </Svg>
  ),
};

const Footer = () => {
  const { activeTab, setActiveTab } = useTab();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('home')}>
        {icons.home}
        <Text style={[styles.label, activeTab === 'home' && styles.activeLabel]}>Home</Text>
        {activeTab === 'home' && <View style={styles.activeDot} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('bookings')}>
        {icons.bookings}
        <Text style={[styles.label, activeTab === 'bookings' && styles.activeLabel]}>Bookings</Text>
        {activeTab === 'bookings' && <View style={styles.activeDot} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('profile')}>
        {icons.profile}
        <Text style={[styles.label, activeTab === 'profile' && styles.activeLabel]}>Profile</Text>
        {activeTab === 'profile' && <View style={styles.activeDot} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('more')}>
        {icons.more}
        <Text style={[styles.label, activeTab === 'more' && styles.activeLabel]}>More</Text>
        {activeTab === 'more' && <View style={styles.activeDot} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp('1.2%'),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: hp('0.5%'),
  },
  label: {
    fontSize: wp('3.5%'),
    color: '#888',
    marginTop: 2,
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginTop: 2,
  },
});

export default Footer; 