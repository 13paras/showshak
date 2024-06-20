import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import * as InAppPurchases from 'expo-in-app-purchases';

interface Product {
  productId: string;
  title: string;
  price: string;
}

interface Purchase {
  productId: string;
  acknowledged: boolean;
}

const InAppPurchaseScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [purchaseState, setPurchaseState] = useState<Purchase | null>(null);

  useEffect(() => {
    const initializePurchases = async () => {
      // Connect to the store
      const { responseCode, results } = await InAppPurchases.connectAsync();
      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        console.log('Connected to the store');
      }

      // Get products
      const { responseCode: productResponseCode, results: productResults } = await InAppPurchases.getProductsAsync(['your_product_id_1', 'your_product_id_2']);
      if (productResponseCode === InAppPurchases.IAPResponseCode.OK) {
        setProducts(productResults);
      }

      // Set purchase listener
      InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          results?.forEach(async (purchase: Purchase) => {
            if (!purchase.acknowledged) {
              // Handle successful purchase
              setPurchaseState(purchase);
              await InAppPurchases.finishTransactionAsync(purchase, true);
            }
          });
        } else {
          console.warn(`Something went wrong with the purchase. Response code: ${responseCode}, Error code: ${errorCode}`);
        }
      });
    };

    initializePurchases();

    return () => {
      // Disconnect from the store
      InAppPurchases.disconnectAsync();
    };
  }, []);

  const handlePurchase = async (productId: string) => {
    await InAppPurchases.purchaseItemAsync(productId);
  };

  return (
    <View style={styles.container}>
      <Text>Available Products:</Text>
      {products.map((product: Product) => (
        <Button
          key={product.productId}
          title={`Buy ${product.title} for ${product.price}`}
          onPress={() => handlePurchase(product.productId)}
        />
      ))}
      {purchaseState && <Text>Purchase completed: {purchaseState.productId}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InAppPurchaseScreen;