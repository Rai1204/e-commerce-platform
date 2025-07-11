import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Checkout() {
  const router = useRouter();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePlaceOrder = async () => {
    try {
      // Save address to addresses list
      const existingAddresses = JSON.parse(await AsyncStorage.getItem('userAddresses') || '[]');
      await AsyncStorage.setItem('userAddresses', JSON.stringify([...existingAddresses, address]));

      // Save payment method if new
      if (paymentMethod === 'card') {
        const paymentInfo = {
          type: 'card',
          last4: '4242', // Example card number
        };
        const existingMethods = JSON.parse(await AsyncStorage.getItem('paymentMethods') || '[]');
        await AsyncStorage.setItem('paymentMethods', JSON.stringify([...existingMethods, paymentInfo]));
      }

      // Get cart items and create order
      const cartItems = JSON.parse(await AsyncStorage.getItem('cart'));
      const order = {
        id: Date.now(),
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price, 0),
        address,
        paymentMethod,
        status: 'Placed',
        date: new Date().toISOString(),
      };

      // Save order
      const existingOrders = JSON.parse(await AsyncStorage.getItem('orders')) || [];
      await AsyncStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

      // Add notification
      const notification = {
        title: 'Order Placed Successfully',
        message: `Your order #${order.id} has been placed successfully.`,
        time: new Date().toLocaleString(),
      };
      const existingNotifications = JSON.parse(await AsyncStorage.getItem('notifications') || '[]');
      await AsyncStorage.setItem('notifications', JSON.stringify([...existingNotifications, notification]));

      // Clear cart
      await AsyncStorage.setItem('cart', JSON.stringify([]));

      // Navigate to order confirmation
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={address.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={address.city}
          onChangeText={(text) => setAddress({ ...address, city: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={address.state}
          onChangeText={(text) => setAddress({ ...address, state: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP Code"
          value={address.zipCode}
          onChangeText={(text) => setAddress({ ...address, zipCode: text })}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'card' && styles.selectedPayment]}
          onPress={() => setPaymentMethod('card')}>
          <Text>Credit/Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'upi' && styles.selectedPayment]}
          onPress={() => setPaymentMethod('upi')}>
          <Text>UPI</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  paymentOption: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 8,
  },
  selectedPayment: {
    borderColor: '#2196f3',
    backgroundColor: '#e3f2fd',
  },
  placeOrderButton: {
    backgroundColor: '#2196f3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  placeOrderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});