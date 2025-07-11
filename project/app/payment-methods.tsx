import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreditCard, Trash2 } from 'lucide-react-native';

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const savedMethods = await AsyncStorage.getItem('paymentMethods');
      if (savedMethods) {
        setPaymentMethods(JSON.parse(savedMethods));
      }
    } catch (error) {
      console.error('Error loading payment methods:', error);
    }
  };

  const removePaymentMethod = async (index) => {
    try {
      const newMethods = paymentMethods.filter((_, i) => i !== index);
      await AsyncStorage.setItem('paymentMethods', JSON.stringify(newMethods));
      setPaymentMethods(newMethods);
    } catch (error) {
      console.error('Error removing payment method:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {paymentMethods.length === 0 ? (
        <View style={styles.emptyState}>
          <CreditCard size={48} color="#666" />
          <Text style={styles.emptyStateText}>No saved payment methods</Text>
        </View>
      ) : (
        paymentMethods.map((method, index) => (
          <View key={index} style={styles.paymentCard}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentType}>{method.type}</Text>
              <Text style={styles.paymentDetails}>
                {method.type === 'card' ? '•••• •••• •••• ' + method.last4 : method.upiId}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removePaymentMethod(index)}>
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
  paymentCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentDetails: {
    fontSize: 14,
    color: '#666',
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