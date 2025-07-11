import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
    description: 'High-quality wireless earbuds with noise cancellation',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
    description: 'Feature-rich smartwatch with health tracking',
  },
  {
    id: 3,
    name: 'Laptop',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    description: 'Powerful laptop for work and entertainment',
  },
  {
    id: 4,
    name: 'Smartphone',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400',
    description: 'Latest smartphone with advanced features',
  },
  {
    id: 5,
    name: 'Gaming Console',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400',
    description: 'Next-gen gaming console for immersive gaming experience',
  },
  {
    id: 6,
    name: 'Camera',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    description: 'Professional DSLR camera for stunning photography',
  },
  {
    id: 7,
    name: 'Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Premium over-ear headphones with noise cancellation',
  },
  {
    id: 8,
    name: 'Tablet',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',
    description: 'Versatile tablet for productivity and entertainment',
  },
  {
    id: 9,
    name: 'Smart Speaker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400',
    description: 'Voice-controlled smart speaker with premium sound',
  },
  {
    id: 10,
    name: 'Fitness Tracker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400',
    description: 'Advanced fitness tracker with heart rate monitoring',
  }
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductPress = async (product) => {
    await AsyncStorage.setItem('selectedProduct', JSON.stringify(product));
    router.push('/product-details');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => handleProductPress(product)}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },
});