'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import LicenseModal from './LicenseModal';
import { useRouter } from 'next/navigation';

interface CartViewProps {
  onClose: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onClose }) => {
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const router = useRouter();

  const handleCloseModal = (purchaseSuccess: boolean) => {
    setShowLicenseModal(false);
    if (purchaseSuccess) {
      clearCart();
      router.push('/store');
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end">
        <motion.div 
          className="w-full max-w-md h-full bg-gray-900 text-white flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          <div className="p-4 flex-grow overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 mb-4">
                  <Image
                    src={item.artwork}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-gray-400">₹{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400">
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold">₹{getCartTotal()}</span>
            </div>
            <button 
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => setShowLicenseModal(true)}
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </motion.div>
      </div>
      {showLicenseModal && <LicenseModal beats={cartItems} onClose={handleCloseModal} />}
    </>
  );
};

export default CartView;
