import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await AsyncStorage.getItem('orders');
      if (ordersData) {
        setOrders(JSON.parse(ordersData));
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const handleOrderPress = async (order) => {
    await AsyncStorage.setItem('selectedOrder', JSON.stringify(order));
    router.push('/order-details');
  };

  return (
    <ScrollView style={styles.container}>
      {orders.map((order, index) => (
        <TouchableOpacity
          key={index}
          style={styles.orderCard}
          onPress={() => handleOrderPress(order)}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>
            {new Date(order.date).toLocaleDateString()}
          </Text>
          <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>
          <Text style={styles.orderStatus}>Status: {order.status}</Text>
        </TouchableOpacity>
      ))}
      {orders.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No orders yet</Text>
        </View>
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
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderDate: {
    color: '#666',
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 16,
    color: '#2196f3',
    marginBottom: 8,
  },
  orderStatus: {
    color: '#4caf50',
    fontWeight: '500',
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
  },
});