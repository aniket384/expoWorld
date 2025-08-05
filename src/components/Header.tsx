import React from 'react';
import { View, Text, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native';
import LogoSvg from '../assets/LogoSvg';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../utils/theme';

interface HeaderProps {
  title?: string;
  rightAction?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  dark?: boolean;
}

const BackArrow = ({ onPress, color = '#fff' }: { onPress: () => void; color?: string }) => (
  <TouchableOpacity style={styles.backButton} onPress={onPress}>
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M15 19l-7-7 7-7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  </TouchableOpacity>
);

const Header: React.FC<HeaderProps> = ({ title = 'expoWorld', rightAction, showBack = false, onBack, dark = true }) => {
  const { colors, spacing, font } = useTheme();
  const shadow = Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOpacity: 1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    android: {
      elevation: 4,
    },
  });
  
  const headerStyle = {
    backgroundColor: dark ? '#222' : '#fff',
    ...shadow,
    zIndex: 10,
  };
  
  return (
    <View style={headerStyle}> 
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={dark ? '#222' : '#fff'}
        translucent={false}
      />
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: spacing.lg,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.lg,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        minHeight: 64,
      }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', minWidth: 36 }}>
          {showBack ? <BackArrow onPress={onBack || (() => {})} color={dark ? '#fff' : '#007AFF'} /> : <LogoSvg size={36} color={dark ? '#fff' : '#007AFF'} />}
        </View>
        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: font.size.xl, fontWeight: '800', color: '#fff', fontFamily: font.family, textAlign: 'center', letterSpacing: 1, maxWidth: 220 }} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end', minWidth: 36 }}>{rightAction}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 4,
    marginRight: 8,
  },
});

export default Header; 