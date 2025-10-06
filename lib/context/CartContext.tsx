'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MusicSample } from '@/lib/data/beats';

interface CartItem extends MusicSample {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (beat: MusicSample) => void;
  removeFromCart: (beatId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (beat: MusicSample) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === beat.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === beat.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...beat, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (beatId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== beatId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
