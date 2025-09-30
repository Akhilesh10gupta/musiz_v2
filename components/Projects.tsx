'use client'
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, Variants } from 'framer-motion'
import Link from 'next/link'
import { BsFillPlayFill } from 'react-icons/bs'

const videos = [
  { title: 'Addictive Eyes', description: 'SiR Musiz Studios.', videoId: 'SkZWB3LDURk' },
  { title: 'Hanju(Official)', description: 'Official Music Visualizer.', videoId: 'puqYqs0tDPg' },
  { title: 'Missing You (Official Audio)', description: 'AD Rapstar', videoId: 'f5m5Nd50LZI' },
  { title: 'Heartstrings', description: '(Official Visualizer) - AD Rapstar.', videoId: 'iHpMRAJWRhQ' },
  { title: 'Feeling Lonely', description: 'Neel D X AD Rapstar.', videoId: 'QcOK7L9jopU' },
  { title: 'Cant See You', description: 'R Jxy x AD Rapstar.', videoId: 'Cqhd4om5kjk' },
]

const duplicatedVideos = [...videos, ...videos];

const title = "Featured Projects";

const colorWaveContainer = {
  inView: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const colorWaveLetter: Variants = {
  inView: {
    color: ["#ffffff", "#f59e0b", "#8b5cf6", "#06b6d4", "#ffffff"],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

export default function Projects() {
  const [active, setActive] = useState<null | typeof videos[0]>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2 })
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const lensX = useTransform(mouseX, (val) => val - 50);
  const lensY = useTransform(mouseY, (val) => val - 50);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen py-20 px-6 flex flex-col items-center text-white scroll-mt-20 bg-gray-900"
    >
      {isHovered && (
        <motion.div
          className="fixed top-0 left-0 w-24 h-24 rounded-full bg-white pointer-events-none"
          style={{
            x: lensX,
            y: lensY,
            mixBlendMode: 'difference',
            boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.5)',
          }}
        />
      )}
      {/* heading */}
      <div 
        className="mb-12 text-center" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <motion.h2
          className="text-5xl sm:text-6xl text-white font-bold tracking-tight mb-2"
          variants={colorWaveContainer}
          initial="initial"
          animate={isInView ? "inView" : "initial"}
        >
          <motion.span className="inline-block">
            {title.split(" ")[0].split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={colorWaveLetter}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
          <span className="inline-block">&nbsp;</span>
          <motion.span className="inline-block">
            {title.split(" ")[1].split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={colorWaveLetter}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </motion.h2>
        <p className="text-gray-400 max-w-xl mx-auto text-balance">
          A showcase of studio sessions, official releases, and creative demos.
        </p>
      </div>

      {/* video carousel */}
      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <div className="flex space-x-8 py-4 scrolling-wrapper">
          {duplicatedVideos.map((v, idx) => (
            <motion.div
              key={`${v.videoId}-${idx}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActive(v)}
              className="group cursor-pointer relative rounded-3xl overflow-hidden flex-shrink-0 w-80 h-96"
            >
              <div className="absolute inset-0">
                <iframe
                  src={`https://www.youtube.com/embed/${v.videoId}?rel=0&modestbranding=1`}
                  title={`${v.title}-${idx}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 flex flex-col justify-center items-center p-6">
                <BsFillPlayFill className="text-white text-6xl" />
                <h3 className="text-lg font-bold mt-2">{v.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{v.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* more button */}
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: [0, 5, -5, 5, 0],
          y: [0, -5, 0],
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
        }}
        whileInView={{
          y: [0, -10, 0],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
          },
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Link
          href="/Projects"
          className="mt-12 inline-block px-8 py-3 rounded-full bg-blue-400 font-semibold
                    hover:bg-blue-600 transition-colors"
        >
          More projects →
        </Link>
      </motion.div>

      {/* modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] max-w-4xl aspect-video"
            >
              <iframe
                src={`https://www.youtube.com/embed/${active.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={`modal-${active.title}`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                loading="lazy"
                className="w-full h-full rounded-xl"
              />
              <button
                onClick={() => setActive(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-blue-400 text-white text-xl font-bold hover:bg-blue-600"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
