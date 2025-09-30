'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaTools, FaHome } from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-300 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute -top-48 -left-48 w-[680px] h-[680px] bg-teal-300/40 rounded-full blur-[140px]"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-52 -right-52 w-[680px] h-[680px] bg-blue-300/40 rounded-full blur-[140px]"
        animate={{ rotate: 360, scale: [1, 1.15, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center p-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
        >
          <FaTools className="text-teal-500 text-8xl mb-6" />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.35] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          This page is currently under construction. Please check back soon!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-200"
          >
            <FaHome className="mr-3" />
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage
