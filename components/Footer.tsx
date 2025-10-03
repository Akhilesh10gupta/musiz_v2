'use client'
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import Image from 'next/image';

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="relative group">
    <motion.span
      className="inline-block"
      whileHover={{
        y: [-2, 2, -2, 2, 0],
        fontWeight: "bold",
        textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
        transition: { duration: 0.5, repeat: Infinity, repeatType: "loop" },
      }}
    >
      {children}
    </motion.span>
  </Link>
);

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-400"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand and Social */}
          <motion.div variants={itemVariants} className="space-y-3">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo_2.png" alt="SiR Musiz Studios" width={40} height={40} />
              <span className="text-white text-xl font-bold">SiR Musiz</span>
            </Link>
            <p className="text-sm">
              A creative haven where sonic innovation meets soulful storytelling.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><FaTwitter /></a>
              <a href="https://www.instagram.com/sirmusiz_studios/" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><FaInstagram /></a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors"><FaYoutube /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><FaLinkedinIn /></a>
            </div>
          </motion.div>

          {/* Column 2: Pages */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h3 className="text-white font-semibold">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/#about">About</FooterLink></li>
              <li><FooterLink href="/#services">Services</FooterLink></li>
              <li><FooterLink href="/#projects">Projects</FooterLink></li>
            </ul>
          </motion.div>

          {/* Column 3: Community */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h3 className="text-white font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/blogs">Blogs</FooterLink></li>
              <li><FooterLink href="/newsletters">Newsletter</FooterLink></li>
              <li><FooterLink href="/community">Community</FooterLink></li>
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h3 className="text-white font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:studiosirmusiz@gmail.com" className="hover:text-white transition-colors">studiosirmusiz@gmail.com</a></li>
              <li><a href="tel:+918467898698" className="hover:text-white transition-colors">+91 84678 98698</a></li>
              <li><span>Block A, Kohli Vihar, Sector 49 Noida, Uttar Pradesh India</span></li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SiR Musiz Studios. All Rights Reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;