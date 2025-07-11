import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadWishlistItems();
  }, []);

  const loadWishlistItems = async () => {
    try {
      const wishlist = await AsyncStorage.getItem('wishlist');
      if (wishlist) {
        setWishlistItems(JSON.parse(wishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const removeFromWishlist = async (index) => {
    try {
      const newWishlist = wishlistItems.filter((_, i) => i !== index);
      await AsyncStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setWishlistItems(newWishlist);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleProductPress = async (product) => {
    await AsyncStorage.setItem('selectedProduct', JSON.stringify(product));
    router.push('/product-details');
  };

  return (
    <ScrollView style={styles.container}>
      {wishlistItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Your wishlist is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push('/')}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        wishlistItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.wishlistItem}
            onPress={() => handleProductPress(item)}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromWishlist(index)}>
              <Trash2 size={24} color="#ff4081" />
            </TouchableOpacity>
          </TouchableOpacity>
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
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
    marginBottom: 16,
  },
  shopButton: {
    backgroundColor: '#2196f3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  shopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});