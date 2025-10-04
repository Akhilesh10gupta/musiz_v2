'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicSample } from '@/app/store/page';
import Image from 'next/image';

interface LicenseModalProps {
  beat: MusicSample | null;
  onClose: () => void;
}

const LicenseModal: React.FC<LicenseModalProps> = ({ beat, onClose }) => {
  if (!beat) return null;

  return (
    <AnimatePresence>
      {beat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl text-white flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Select License Type</h2>
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={beat.artwork}
                  alt={beat.title}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{beat.title}</h3>
                  <p className="text-gray-400">by {beat.producer}</p>
                </div>
              </div>

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

              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                Buy Now - ₹{beat.price}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LicenseModal;
