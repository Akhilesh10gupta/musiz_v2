'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ShoppingCart } from 'lucide-react'
import Container from './Container'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCartClick: () => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, setMenuOpen, onCartClick, cartItemCount }) => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setMenuOpen(prev => !prev)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -20 },
  }

  const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <header
      className={`fixed top-0 left-0 z-50 h-[72px] w-full text-white transition-all duration-300 ${
        scrolled ? 'bg-gray-900/50 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}>
      <Container className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="SiR Musiz Studios Logo"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
          <h1 className="sr-only">SiR Musiz Studios - Creative Audio & Visual Production</h1>
        </Link>

        <nav className="relative hidden items-center space-x-6 text-sm uppercase font-light tracking-wide sm:flex">
          <Link href="/" className={`group font-semibold ${
              pathname === '/' ? 'text-amber-500' : ''
            }`}>
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
          </Link>
          <Link href="/Projects" className={`group font-semibold ${
              pathname === '/Projects' ? 'text-amber-500' : ''
            }`}>
            Projects
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
          </Link>
          <Link href="/artist" className={`group font-semibold ${
              pathname === '/artist' ? 'text-amber-500' : ''
            }`}>
            Artist
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
          </Link>
          <Link href="/#services" className="group font-semibold">
            Services
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
          </Link>
          <Link href="/store" className={`group font-semibold ${
              pathname === '/store' ? 'text-amber-500' : ''
            }`}>
            Store
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
          </Link>
          <Link href="/#about" className="group font-semibold">
            About&nbsp;Us
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden border border-white px-4 py-2 font-semibold transition duration-200 hover:bg-white hover:text-black sm:inline-block"
          >
            Contact&nbsp;Us
          </Link>

          <button onClick={onCartClick} className="relative focus:outline-none group cursor-pointer">
            <ShoppingCart className="h-6 w-6 transition-colors duration-300 group-hover:text-amber-500" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleMenu}
            className="focus:outline-none sm:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={toggleMenu}
            />
            <motion.div
              key="mobile-menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-[72px] left-0 w-full px-4 pt-4 sm:hidden z-50"
            >
              <div
                className="flex flex-col space-y-5 rounded-lg bg-gray-900/95 p-6 text-sm uppercase font-light tracking-wide text-gray-300 shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className={`block hover:text-white ${
                      pathname === '/' ? 'text-amber-500' : ''
                    }`}>
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/Projects"
                    onClick={() => setMenuOpen(false)}
                    className={`block text-white ${
                      pathname === '/Projects' ? 'text-amber-500' : ''
                    }`}>
                    Projects
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/artist"
                    onClick={() => setMenuOpen(false)}
                    className={`block hover:text-white ${
                      pathname === '/artist' ? 'text-amber-500' : ''
                    }`}>
                    Artist
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/#services"
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-white"
                  >
                    Services
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/store"
                    onClick={() => setMenuOpen(false)}
                    className={`block hover:text-white ${
                      pathname === '/store' ? 'text-amber-500' : ''
                    }`}>
                    Store
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/#about"
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-white"
                  >
                    About&nbsp;Us
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 rounded border border-white px-4 py-2 text-center font-semibold transition duration-200 hover:bg-white hover:text-black"
                  >
                    Contact&nbsp;Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header