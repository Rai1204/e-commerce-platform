import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Heart, ShoppingCart } from 'lucide-react-native';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const productData = await AsyncStorage.getItem('selectedProduct');
    if (productData) {
      setProduct(JSON.parse(productData));
    }
  };

  const addToCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const addToWishlist = async () => {
    try {
      const existingWishlist = await AsyncStorage.getItem('wishlist');
      const wishlist = existingWishlist ? JSON.parse(existingWishlist) : [];
      wishlist.push(product);
      await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
      router.push('/wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  if (!product) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.wishlistButton} onPress={addToWishlist}>
            <Heart size={24} color="white" />
            <Text style={styles.buttonText}>Add to Wishlist</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
            <ShoppingCart size={24} color="white" />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
  },
  details: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wishlistButton: {
    backgroundColor: '#ff4081',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  cartButton: {
    backgroundColor: '#2196f3',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});