'use client'
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { MusicSample, musicSamples } from '@/lib/data/beats';

const categories = ['All', 'Guitar', 'Piano', 'Saxophone', 'Strings', 'Vocals', 'Synth', 'Drums', 'Bass', 'Percussion', 'Beats'];

const PAGE_SIZE = 6;

export default function StorePage() {
  const [cart, setCart] = useState<number[]>([]);
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  // Filter and paginate
  const filtered = category === 'All' ? musicSamples : musicSamples.filter(s => s.category === category);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAddToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item !== id));
  };
  const handleCategory = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  // Pagination logic for showing only two page numbers
  let pageNumbers = [];
  if (totalPages <= 2) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (page === 1) {
    pageNumbers = [1, 2];
  } else if (page === totalPages) {
    pageNumbers = [totalPages - 1, totalPages];
  } else {
    pageNumbers = [page - 1, page];
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const cardVariantsLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'tween', ease: 'linear', duration: 0.5 },
    },
  };

  const cardVariantsRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'tween', ease: 'linear', duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-0 pb-10">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gray-900 dark:bg-gray-800 py-20 mb-10 text-white text-center shadow-lg"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl font-extrabold mb-2 mt-4 tracking-tight drop-shadow-lg text-white"
        >
          Discover & Buy Our Sounds
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg max-w-2xl mx-auto text-gray-400 dark:text-gray-400 opacity-90"
        >
          Browse, listen, and purchase high-quality sounds for your next project. Filter by category, preview tracks, and build your custom cart!
        </motion.p>
      </motion.div>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-1 rounded-full font-semibold border transition-all text-sm shadow-sm ${category === cat ? 'bg-amber-500 text-white border-amber-600 dark:bg-amber-500 dark:text-white dark:border-amber-600' : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'}`}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Music Grid */}
      <motion.div
        key={`${category}-${page}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {paged.map((sample, i) => (
          <Link key={sample.id} href={`/beat/${sample.id}`}>
            <motion.div
              variants={i % 2 === 0 ? cardVariantsLeft : cardVariantsRight}
              className="rounded-2xl bg-white/90 dark:bg-gray-800 shadow-lg p-4 flex flex-col gap-2 group hover:scale-[1.03] hover:shadow-2xl transition-all border border-amber-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">{sample.category}</span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">{sample.genre}</span>
              </div>
              <div className="font-bold text-lg mb-1 text-amber-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition">{sample.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{sample.bpm} BPM | {sample.key}</div>
              <audio
                src={sample.url}
                controls
                controlsList="nodownload"
                preload="none"
                onTimeUpdate={(e) => {
                  if (e.currentTarget.currentTime >= 30) {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }
                }}
                className="w-full rounded-lg border border-amber-100 dark:border-gray-700"
              />
              {cart.includes(sample.id) ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                  onClick={(e) => { e.preventDefault(); handleRemoveFromCart(sample.id); }}
                >
                  Remove from Cart
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 px-4 py-2 rounded bg-amber-500 text-white font-semibold hover:bg-amber-600 transition"
                  onClick={(e) => { e.preventDefault(); handleAddToCart(sample.id); }}
                >
                  Add to Cart
                </motion.button>
              )}
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="max-w-5xl mx-auto px-4 flex justify-center gap-2 mt-8 items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-semibold border text-sm transition-all ${page === 1 ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:border-gray-700' : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'}`}
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </motion.button>
        {pageNumbers.map((p) => (
          <motion.button
            key={p}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-semibold border text-sm transition-all ${page === p ? 'bg-amber-500 text-white border-amber-600 dark:bg-amber-500 dark:text-white dark:border-amber-600' : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'}`}
            onClick={() => setPage(p)}
            disabled={page === p}
          >
            {p}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-semibold border text-sm transition-all ${page === totalPages ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:border-gray-700' : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'}`}
          onClick={() => page < totalPages && setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </motion.button>
      </div>

      {/* Cart Section */}
      <div className="max-w-3xl mx-auto mt-12 bg-white/95 dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-amber-900 dark:text-gray-100 flex items-center gap-2">
          <span>Your Cart</span>
          <span className="inline-block bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-semibold px-2 py-1 rounded-full">{cart.length}</span>
        </h2>
        {cart.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center py-6">No items in cart.</div>
        ) : (
          <ul className="divide-y divide-amber-100 dark:divide-gray-700">
            {cart.map((id) => {
              const sample = musicSamples.find((s) => s.id === id);
              if (!sample) return null;
              return (
                <li key={id} className="flex justify-between items-center py-3">
                  <div>
                    <div className="font-semibold text-amber-800 dark:text-gray-100">{sample.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{sample.category} | {sample.genre}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="text-red-500 hover:underline text-sm px-3 py-1 rounded"
                      onClick={() => handleRemoveFromCart(id)}
                    >
                      Remove
                    </button>
                    <a
                      href={sample.gumroadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                    >
                      Buy
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}