'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import Container from './Container'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'

const Header: React.FC = () => {
  /* ------------ state ------------ */
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false)
  const [workHover, setWorkHover] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /* Browser timeout ID is a number, so type the ref that way */
  const hoverTimeoutRef = useRef<number | null>(null)
  const pathname = usePathname()

  /* ------------ helpers ------------ */
  const toggleMenu = () => setMenuOpen(prev => !prev)
  const toggleMobileWork = () => setMobileWorkOpen(prev => !prev)

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const startHoverTimeout = () => {
    hoverTimeoutRef.current = window.setTimeout(() => setWorkHover(false), 200)
  }

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

  /* ------------ render ------------ */
  return (
    <header
      className={`fixed top-0 left-0 z-50 h-[72px] w-full text-white transition-all duration-300 ${
        scrolled ? 'bg-gray-900/50 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}>
      <Container className="flex items-center justify-between px-4 py-4">
        {/* Logo */}
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

        {/* Desktop Navigation */}
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

          {/* WORK menu with hover dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearHoverTimeout()
              setWorkHover(true)
            }}
            onMouseLeave={startHoverTimeout}
          >
            <button className="group flex cursor-pointer items-center focus:outline-none">
              <span className="font-semibold">WORK</span>
              <ChevronDown className="ml-1 h-4 w-4" />
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
            </button>

            {workHover && (
              <div
                className="absolute left-0 top-full z-50 mt-2 w-48 rounded-md bg-black py-2 text-white shadow-lg"
                onMouseEnter={clearHoverTimeout}
                onMouseLeave={startHoverTimeout}
              >
                <Link
                  href="/work/music"
                  className="block px-4 py-2 hover:bg-white hover:text-black"
                >
                  Music Projects
                </Link>
                <Link
                  href="/work/film"
                  className="block px-4 py-2 hover:bg-white hover:text-black"
                >
                  Film Scoring
                </Link>
                <Link
                  href="/work/commercial"
                  className="block px-4 py-2 hover:bg-white hover:text-black"
                >
                  Commercials
                </Link>
              </div>
            )}
          </div>

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
          <Link href="/ekart" className={`group font-semibold ${
              pathname === '/ekart' ? 'text-amber-500' : ''
            }`}>
            Ekart
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
          </Link>
          <Link href="/#about" className="group font-semibold">
            About&nbsp;Us
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500"></span>
          </Link>
        </nav>

        {/* Desktop contact button */}
        <Link
          href="/contact"
          className="hidden border border-white px-4 py-2 font-semibold transition duration-200 hover:bg-white hover:text-black sm:inline-block"
        >
          Contact&nbsp;Us
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMenu}
          className="focus:outline-none sm:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
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
              <div className="flex flex-col space-y-5 rounded-lg bg-gray-900/95 p-6 text-sm uppercase font-light tracking-wide text-gray-300 shadow-xl">
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
                {/* Mobile Work submenu */}
                <motion.div variants={menuItemVariants} className="flex flex-col">
                  <button
                    onClick={toggleMobileWork}
                    className="flex items-center justify-between text-left focus:outline-none hover:text-white"
                  >
                    <span>WORK</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileWorkOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileWorkOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 flex flex-col space-y-2 pl-4 text-sm"
                      >
                        <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                          <Link
                            href="/work/music"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-white"
                          >
                            Music Projects
                          </Link>
                        </motion.div>
                        <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                          <Link
                            href="/work/film"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-white"
                          >
                            Film Scoring
                          </Link>
                        </motion.div>
                        <motion.div variants={menuItemVariants} whileTap={{ scale: 0.95 }}>
                          <Link
                            href="/work/commercial"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-white"
                          >
                            Commercials
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                    href="/ekart"
                    onClick={() => setMenuOpen(false)}
                    className={`block hover:text-white ${
                      pathname === '/ekart' ? 'text-amber-500' : ''
                    }`}>
                    Ekart
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