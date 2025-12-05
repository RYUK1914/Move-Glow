import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(item => item.product.id === product.id);
      if (existingIndex !== -1) {
        // Update quantity if product exists in cart
        const updatedItems = [...prevItems];
        updatedItems[existingIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new product to cart
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
