import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const CreateEventScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  
  const [eventData, setEventData] = useState({
    eventName: '',
    category: 'expo',
    date: '',
    duration: '',
    city: '',
    state: '',
    totalStalls: '',
    pricingType: 'uniform',
    uniformPrice: '',
    stallPrices: [],
    layoutUrl: '',
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      accountHolderName: '',
      bankName: ''
    }
  });

  const handleInputChange = (field, value) => {
    if (field.startsWith('bankDetails.')) {
      const bankField = field.split('.')[1];
      setEventData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [bankField]: value
        }
      }));
    } else {
      setEventData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleStallPriceChange = (index, value) => {
    const newStallPrices = [...eventData.stallPrices];
    newStallPrices[index] = value;
    setEventData(prev => ({
      ...prev,
      stallPrices: newStallPrices
    }));
  };

  const validateForm = () => {
    const requiredFields = ['eventName', 'date', 'duration', 'city', 'state', 'totalStalls'];
    const missingFields = requiredFields.filter(field => !eventData[field]);
    
    if (missingFields.length > 0) {
      Alert.alert('Error', `Please fill all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    if (eventData.pricingType === 'uniform' && !eventData.uniformPrice) {
      Alert.alert('Error', 'Please enter uniform price');
      return false;
    }

    if (eventData.pricingType === 'individual' && eventData.stallPrices.some(price => !price)) {
      Alert.alert('Error', 'Please enter all stall prices');
      return false;
    }

    const bankRequired = ['accountNumber', 'ifscCode', 'accountHolderName', 'bankName'];
    const missingBankFields = bankRequired.filter(field => !eventData.bankDetails[field]);
    
    if (missingBankFields.length > 0) {
      Alert.alert('Error', `Please fill all bank details: ${missingBankFields.join(', ')}`);
      return false;
    }

    return true;
  };

  const handleCreateEvent = async () => {
    if (!validateForm()) return;

    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Error', 'Please login first');
        return;
      }

      const eventPayload = {
        ...eventData,
        createdAt: Date.now(),
        organizerId: user.uid,
        stallPrices: eventData.pricingType === 'uniform' 
          ? Array(parseInt(eventData.totalStalls)).fill(eventData.uniformPrice)
          : eventData.stallPrices
      };

      // Save to Firebase
      const eventsRef = database().ref('/events');
      const newEventRef = eventsRef.push();
      await newEventRef.set(eventPayload);

      Alert.alert('Success', 'Event created successfully!');
      
      // Reset form
      setEventData({
        eventName: '',
        category: 'expo',
        date: '',
        duration: '',
        city: '',
        state: '',
        totalStalls: '',
        pricingType: 'uniform',
        uniformPrice: '',
        stallPrices: [],
        layoutUrl: '',
        bankDetails: {
          accountNumber: '',
          ifscCode: '',
          accountHolderName: '',
          bankName: ''
        }
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'Failed to create event. Please try again.');
    }
  };

  const renderStallPrices = () => {
    if (eventData.pricingType === 'individual') {
      const stallCount = parseInt(eventData.totalStalls) || 0;
      return Array.from({ length: stallCount }, (_, index) => (
        <TextInput
          key={index}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder={`Stall ${index + 1} Price`}
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={eventData.stallPrices[index] || ''}
          onChangeText={(value) => handleStallPriceChange(index, value)}
        />
      ));
    }
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Create New Event</Text>
        
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Event Name"
          placeholderTextColor={colors.textSecondary}
          value={eventData.eventName}
          onChangeText={(text) => handleInputChange('eventName', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Event Date (YYYY-MM-DD)"
          placeholderTextColor={colors.textSecondary}
          value={eventData.date}
          onChangeText={(text) => handleInputChange('date', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Duration (days)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={eventData.duration}
          onChangeText={(text) => handleInputChange('duration', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="City"
          placeholderTextColor={colors.textSecondary}
          value={eventData.city}
          onChangeText={(text) => handleInputChange('city', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="State"
          placeholderTextColor={colors.textSecondary}
          value={eventData.state}
          onChangeText={(text) => handleInputChange('state', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Total Stalls"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={eventData.totalStalls}
          onChangeText={(text) => handleInputChange('totalStalls', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Layout URL (optional)"
          placeholderTextColor={colors.textSecondary}
          value={eventData.layoutUrl}
          onChangeText={(text) => handleInputChange('layoutUrl', text)}
        />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Pricing Configuration</Text>
        
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioButton, eventData.pricingType === 'uniform' && styles.radioSelected]}
            onPress={() => handleInputChange('pricingType', 'uniform')}
          >
            <Text style={[styles.radioText, { color: colors.text }]}>Uniform Pricing</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.radioButton, eventData.pricingType === 'individual' && styles.radioSelected]}
            onPress={() => handleInputChange('pricingType', 'individual')}
          >
            <Text style={[styles.radioText, { color: colors.text }]}>Individual Stall Pricing</Text>
          </TouchableOpacity>
        </View>

        {eventData.pricingType === 'uniform' && (
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            placeholder="Uniform Price per Stall"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={eventData.uniformPrice}
            onChangeText={(text) => handleInputChange('uniformPrice', text)}
          />
        )}

        {renderStallPrices()}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Bank Details</Text>
        
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Bank Name"
          placeholderTextColor={colors.textSecondary}
          value={eventData.bankDetails.bankName}
          onChangeText={(text) => handleInputChange('bankDetails.bankName', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Account Holder Name"
          placeholderTextColor={colors.textSecondary}
          value={eventData.bankDetails.accountHolderName}
          onChangeText={(text) => handleInputChange('bankDetails.accountHolderName', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Account Number"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={eventData.bankDetails.accountNumber}
          onChangeText={(text) => handleInputChange('bankDetails.accountNumber', text)}
        />

        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="IFSC Code"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="characters"
          value={eventData.bankDetails.ifscCode}
          onChangeText={(text) => handleInputChange('bankDetails.ifscCode', text)}
        />

        <Button title="Create Event" onPress={handleCreateEvent} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  radioSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  radioText: {
    fontSize: 14,
  },
});

export default CreateEventScreen;
