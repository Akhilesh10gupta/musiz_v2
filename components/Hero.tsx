'use client'

import React, { useEffect, useState } from 'react'
import FloatingParticlesCanvas from './FloatingParticles'
import GlitchedWord from './GlitchedWord';
import './GlitchedWord.css';

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

  const [glitchingWord, setGlitchingWord] = useState<string | null>(null);
  const [wordToGlitch, setWordToGlitch] = useState('Sound');

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchingWord(wordToGlitch);
      setTimeout(() => {
        setGlitchingWord(null);
        setWordToGlitch(current => (current === 'Sound' ? 'Emotion' : 'Sound'));
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordToGlitch]);

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
              Crafting <GlitchedWord word="Sound" isGlitched={glitchingWord === 'Sound'} />, Shaping <GlitchedWord word="Emotion" isGlitched={glitchingWord === 'Emotion'} />.
            </>
          )}
        </h1>
        <p
          className="mt-6 sm:mt-8 text-lg sm:text-xl text-gray-300/90 leading-relaxed sm:leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-300 transition-transform duration-300 ease-in-out hover:scale-105"
        >
          We turn raw ideas into immersive audio-visual experiences.
        </p>
        <a
          href="/contact"
          className={`inline-block mt-8 sm:mt-12 px-10 py-4 rounded-full bg-amber-500
                     text-white text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up animation-delay-600 ${isMobile ? 'animate-pulse-slow' : ''}`}
        >
          Get a Quote
        </a>
      </div>
    </section>
  );
}