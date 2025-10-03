'use client'

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import FloatingParticlesCanvas from './FloatingParticles';
import AnimatedButton from './ui/AnimatedButton';

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipText = ({ children }: { children: string }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative inline-block overflow-hidden whitespace-nowrap"
    >
      {/* Normal text */}
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      {/* Hover text */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block text-amber-500 italic" // Change color and style on hover
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize(); // Set initial state

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] pt-32 lg:pt-40 bg-gray-900
                 flex flex-col items-center justify-center gap-16 xl:gap-32 px-6 pb-24 overflow-hidden"
    >
      <FloatingParticlesCanvas />

      {/* blurred blobs */}
      {!isMobile && (
        <>
          <div className="pointer-events-none absolute -top-48 -left-48 w-[680px] h-[680px] bg-blue-800/20 rounded-full blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-48 -right-48 w-[560px] h-[560px] bg-indigo-600/20 rounded-full blur-[120px]" />
        </>
      )}

      {/* text block */}
      <div
        className="max-w-4xl w-full px-2 sm:px-0 text-center z-10"
      >
        <h1
          className={`text-5xl sm:text-6xl xl:text-8xl font-extrabold leading-tight sm:leading-tight xl:leading-tight text-white drop-shadow-md font-poppins animate-fade-in-up ${isMobile ? 'hero-animated-gradient' : ''}`}
        >
          {isMobile ? (
            'Crafting Sound, Shaping Emotion.'
          ) : (
            <>
              <FlipText>Crafting</FlipText> <FlipText>Sound</FlipText>, <FlipText>Shaping</FlipText> <FlipText>Emotion</FlipText>.
            </>
          )}
        </h1>
        <p
          className="mt-6 sm:mt-8 text-lg sm:text-xl text-gray-300/90 leading-relaxed sm:leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-300 transition-transform duration-300 ease-in-out hover:scale-105"
        >
          We turn raw ideas into immersive audio-visual experiences.
        </p>
        <div className={`mt-8 sm:mt-12 animate-spring-in animation-delay-600`}>
          <AnimatedButton href="/contact">
            Get a Quote
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}