'use client'
import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { ContactForm } from '@/components/ContactForm'
import {
  MdEmail,
  MdPhone,
  MdLanguage,
  MdLocationOn,
} from 'react-icons/md'

const fade: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Contact() {
  return (
    <motion.section
      id="contact"
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 bg-gray-900 overflow-hidden"
    >
      {/* shared blur circles */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-800 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full blur-3xl z-0" />

      {/* glass card */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 p-8 sm:p-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg">
        
        {/* Left Column: Form */}
        <div className="flex flex-col justify-center">
          <ContactForm />
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col gap-6 text-left">
          <h1 className="text-5xl font-extrabold text-blue-400">Get in Touch.</h1>
          <p className="text-white leading-relaxed">
            Whether you have questions about our services, need support, or want
            to share your feedback, our dedicated team is here to assist you
            every step of the way.
          </p>
          <ul className="space-y-5 mt-4">
            {/* Email */}
            <li className="flex items-center gap-4">
              <span className="p-3 bg-blue-400/20 text-blue-400 rounded-lg">
                <MdEmail size={24} />
              </span>
              <div>
                <p className="font-semibold text-blue-400">Email</p>
                <a
                  href="mailto:studiosirmusiz@gmail.com"
                  className="text-white text-sm no-underline hover:text-blue-600 transition"
                >
                  studiosirmusiz@gmail.com
                </a>
              </div>
            </li>

            {/* Website */}
            <li className="flex items-center gap-4">
              <span className="p-3 bg-blue-400/20 text-blue-400 rounded-lg">
                <MdLanguage size={24} />
              </span>
              <div>
                <p className="font-semibold text-blue-400">Website</p>
                <a
                  href="https://sirmusizstudios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm no-underline hover:text-blue-600 transition"
                >
                  sirmusizstudios.com
                </a>
              </div>
            </li>

            {/* Phone */}
            <li className="flex items-center gap-4">
              <span className="p-3 bg-blue-400/20 text-blue-400 rounded-lg">
                <MdPhone size={24} />
              </span>
              <div>
                <p className="font-semibold text-blue-400">Phone</p>
                <a
                  href="tel:+918467898698"
                  className="text-white text-sm no-underline hover:text-blue-600 transition"
                >
                  +91 84678 98698
                </a>
              </div>
            </li>

            {/* Location */}
            <li className="flex items-center gap-4">
              <span className="p-3 bg-blue-400/20 text-blue-400 rounded-lg">
                <MdLocationOn size={24} />
              </span>
              <div>
                <p className="font-semibold text-blue-400">Location</p>
                <p className="text-white text-sm">Block A, Kohli Vihar, Sector 49 Noida, Uttar Pradesh India</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </motion.section>
  )
}
