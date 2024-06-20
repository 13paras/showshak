import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as InAppPurchases from 'expo-in-app-purchases';

const InAppPurchaseScreen = () => {
  const [products, setProducts] = useState([]);
  const [purchaseState, setPurchaseState] = useState(null);

  useEffect(() => {
    const initializePurchases = async () => {
      const { responseCode, results } = await InAppPurchases.getProductsAsync(['product1', 'product2']);
      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        setProducts(results);
      }

      InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          results.forEach(async purchase => {
            if (!purchase.acknowledged) {
              // Handle purchase
              setPurchaseState(purchase);
              await InAppPurchases.finishTransactionAsync(purchase, true);
            }
          });
        } else {
          console.warn(`Something went wrong with the purchase. Received response code ${responseCode} and errorCode ${errorCode}`);
        }
      });
    };

    initializePurchases();
  }, []);

  const handlePurchase = async (productId) => {
    await InAppPurchases.purchaseItemAsync(productId);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Available Products:</Text>
      {products.map(product => (
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

export default InAppPurchaseScreen;
