import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MapPin, Trash2 } from 'lucide-react-native';

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const savedAddresses = await AsyncStorage.getItem('userAddresses');
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const removeAddress = async (index) => {
    try {
      const newAddresses = addresses.filter((_, i) => i !== index);
      await AsyncStorage.setItem('userAddresses', JSON.stringify(newAddresses));
      setAddresses(newAddresses);
    } catch (error) {
      console.error('Error removing address:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {addresses.length === 0 ? (
        <View style={styles.emptyState}>
          <MapPin size={48} color="#666" />
          <Text style={styles.emptyStateText}>No saved addresses</Text>
        </View>
      ) : (
        addresses.map((address, index) => (
          <View key={index} style={styles.addressCard}>
            <View style={styles.addressInfo}>
              <Text style={styles.addressText}>{address.street}</Text>
              <Text style={styles.addressText}>
                {address.city}, {address.state} {address.zipCode}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeAddress(index)}>
              <Trash2 size={24} color="#ff4081" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
});