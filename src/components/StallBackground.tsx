import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const StallBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Main gradient background */}
      <LinearGradient
        colors={['#f5f5f5', '#e8e8e8', '#d3d3d3']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Stall canopy patterns */}
        <View style={styles.canopyContainer}>
          {Array.from({ length: 8 }).map((_, index) => (
            <View key={index} style={[styles.canopy, { left: (width / 8) * index }]}>
              <View style={styles.canopyTop} />
              <View style={styles.canopySupport} />
            </View>
          ))}
        </View>

        {/* Ground level stalls */}
        <View style={styles.stallContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={[styles.stall, { left: (width / 6) * index }]}>
              <View style={styles.stallFront} />
              <View style={styles.stallRoof} />
            </View>
          ))}
        </View>

        {/* Content overlay */}
        <View style={styles.content}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'relative',
  },
  canopyContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
  },
  canopy: {
    position: 'absolute',
    width: width / 8,
    height: height * 0.25,
    alignItems: 'center',
  },
  canopyTop: {
    width: '80%',
    height: '60%',
    backgroundColor: 'rgba(139, 69, 19, 0.3)', // Brown color for canopy
    borderRadius: 20,
    marginTop: 10,
  },
  canopySupport: {
    width: 3,
    height: '40%',
    backgroundColor: 'rgba(101, 67, 33, 0.5)', // Darker brown for support
    marginTop: 5,
  },
  stallContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
  },
  stall: {
    position: 'absolute',
    width: width / 6,
    height: height * 0.35,
    alignItems: 'center',
  },
  stallFront: {
    width: '90%',
    height: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(139, 69, 19, 0.4)',
    marginTop: '30%',
  },
  stallRoof: {
    width: '100%',
    height: '30%',
    backgroundColor: 'rgba(160, 82, 45, 0.6)', // Saddle brown for roof
    borderRadius: 15,
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
});

export default StallBackground;
