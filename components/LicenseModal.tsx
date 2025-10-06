'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicSample } from '@/lib/data/beats';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

interface LicenseModalProps {
  beats: MusicSample[];
  onClose: (purchaseSuccess: boolean) => void;
}

const LicenseModal: React.FC<LicenseModalProps> = ({ beats, onClose }) => {
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  if (!beats || beats.length === 0) return null;

  const handleBuyNow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    const submission = {
      name,
      email,
      beats,
    };

    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        setPurchaseSuccess(true);
      } else {
        console.error('Purchase failed:', await response.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleClose = () => {
    onClose(purchaseSuccess);
  };

  const totalPrice = beats.reduce((total, beat) => total + beat.price, 0);

  return (
    <AnimatePresence>
      {beats.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl text-white flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {purchaseSuccess ? (
                <div className="text-center flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle className="w-24 h-24 text-green-400 mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4 text-green-400">Purchase Successful!</h2>
                  <p className="text-lg mb-6 text-gray-300">Thank you for your purchase. We will contact you shortly with the details.</p>
                  <button 
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-center">Select License Type</h2>
                  {beats.length === 1 ? (
                    <div className="flex items-center gap-4 mb-6">
                      <Image
                        src={beats[0].artwork}
                        alt={beats[0].title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold">{beats[0].title}</h3>
                        <p className="text-gray-400">by {beats[0].producer}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-2">Your Cart</h3>
                      <div className="max-h-60 overflow-y-auto">
                        {beats.map(beat => (
                          <div key={beat.id} className="flex items-center justify-between py-2 border-b border-gray-700">
                            <div>
                              <p className="font-bold">{beat.title}</p>
                              <p className="text-sm text-gray-400">by {beat.producer}</p>
                            </div>
                            <p>₹{beat.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border border-blue-500 rounded-lg p-6 mb-6 bg-gray-800">
                    <h4 className="text-lg font-bold mb-2">WAV License</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">License Usage:</p>
                        <p>Unlimited Audio Streaming</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Format & Files:</p>
                        <p>WAV File</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Nature:</p>
                        <p>Non-Exclusive</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Distribution:</p>
                        <p>Unlimited Copies</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleBuyNow}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <input type="text" id="name" name="name" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input type="email" id="email" name="email" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                      Buy Now - ₹{totalPrice}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LicenseModal;
