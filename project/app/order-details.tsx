import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderDetails() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const orderData = await AsyncStorage.getItem('selectedOrder');
      if (orderData) {
        setOrder(JSON.parse(orderData));
      }
    } catch (error) {
      console.error('Error loading order:', error);
    }
  };

  if (!order) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <Text style={styles.orderDate}>
          Placed on {new Date(order.date).toLocaleDateString()}
        </Text>
        <Text style={styles.orderStatus}>Status: {order.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Text style={styles.addressText}>{order.address.street}</Text>
        <Text style={styles.addressText}>{order.address.city}</Text>
        <Text style={styles.addressText}>{order.address.state}</Text>
        <Text style={styles.addressText}>{order.address.zipCode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <Text style={styles.paymentMethod}>
          Method: {order.paymentMethod.toUpperCase()}
        </Text>
        <Text style={styles.total}>Total: ${order.total.toFixed(2)}</Text>
      </View>
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
  orderId: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderDate: {
    color: '#666',
    marginBottom: 8,
  },
  orderStatus: {
    color: '#4caf50',
    fontWeight: '500',
  },
  itemCard: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  itemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    color: '#666',
  },
  addressText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  paymentMethod: {
    fontSize: 16,
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196f3',
  },
});