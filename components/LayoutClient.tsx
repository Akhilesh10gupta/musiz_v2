'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MouseGradient from "@/components/MouseGradient";
import { useCart } from '@/lib/context/CartContext';
import CartView from './CartView';
import { AnimatePresence } from 'framer-motion';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleCart = () => setCartOpen(prev => !prev);

  return (
    <>
      <MouseGradient />
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        onCartClick={toggleCart}
        cartItemCount={cartItems.length}
      />
      <main className={`transition-filter duration-300 ${menuOpen ? 'blur-sm' : ''}`}>
        {children}
        <Footer />
      </main>
      <AnimatePresence>
        {cartOpen && <CartView onClose={toggleCart} />}
      </AnimatePresence>
    </>
  );
}
