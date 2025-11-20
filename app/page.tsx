'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '@/components/Container'
import LoadingScreen from '@/components/LoadingScreen'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/Hero'))
const Projects = dynamic(() => import('@/components/Projects'))
const CounterSection = dynamic(() => import('@/components/CounterSection'))
const Services = dynamic(() => import('@/components/Services'))
const About = dynamic(() => import('@/components/aboutus'))

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This logic now runs only on the client
    const hasVisited = sessionStorage.getItem('hasVisitedSirMusizStudios')

    if (hasVisited) {
      // If they've visited in this session, don't show the loader
      setLoading(false)
    } else {
      // On first visit in a session, show the loader, then set the flag
      sessionStorage.setItem('hasVisitedSirMusizStudios', 'true')
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1500) // You can adjust this duration

      return () => clearTimeout(timer)
    }
  }, [])

  // Effect to handle scrolling to hash after loading screen
  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Container className="bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-50 max-w-full">
            <Hero />
            <Projects />
            <CounterSection />
            <Services />
            <About />
          </Container>
        </motion.div>
      )}
    </>
  )
}

export default Home
