'use client'

import React, { useRef, useEffect, useState } from 'react'

export default function Hero() {
  /* ───────────────── mounted flag ───────────────── */
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize(); // Set initial state

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    }
  }, []);

  /* ───────────────── canvas ───────────────── */
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    // Performance: Completely disable the particle animation on mobile devices.
    if (isMobile) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = isMobile ? 1 : window.devicePixelRatio || 1

    const setSize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    const colors = ['#8B5CF6', '#06B6D4', '#F59E0B']
    const COUNT = isMobile ? 6 : 20
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    let animationFrameId: number;
    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Only draw lines on desktop
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const o = particles[j]
            const dist = Math.hypot(p.x - o.x, p.y - o.y)
            if (dist < 150) {
              ctx.save()
              ctx.globalAlpha = (150 - dist) / 150 * 0.1
              ctx.strokeStyle = p.color
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(o.x, o.y)
              ctx.stroke()
              ctx.restore()
            }
          }
        }
      })

      if (isMobile) {
        setTimeout(step, 100) // ~10 FPS
      } else {
        animationFrameId = requestAnimationFrame(step)
      }
    }
    step()

    window.addEventListener('resize', setSize)
    return () => {
      window.removeEventListener('resize', setSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted, isMobile])

  const headline = "Crafting Sound, Shaping Emotion.";

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] pt-32 lg:pt-40 bg-gray-900
                 flex flex-col items-center justify-center gap-16 xl:gap-32 px-6 pb-24 overflow-hidden"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />

      {/* blurred blobs */}
      {!isMobile && (
        <>
          <div className="pointer-events-none absolute -top-48 -left-48 w-[680px] h-[680px] bg-blue-800/20 rounded-full blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-48 -right-48 w-[560px] h-[560px] bg-indigo-600/20 rounded-full blur-[120px]" />
        </>
      )}

      {/* text block */}
      <div
        className="max-w-4xl w-full px-2 sm:px-0 text-center"
      >
        <h1
          className="text-5xl sm:text-6xl xl:text-8xl font-extrabold leading-tight sm:leading-tight xl:leading-tight text-white drop-shadow-md font-poppins animate-fade-in-up transition-transform duration-300 ease-in-out hover:scale-105 hover:drop-shadow-lg"
        >
          {headline}
        </h1>
        <p
          className="mt-6 sm:mt-8 text-lg sm:text-xl text-gray-300/90 leading-relaxed sm:leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-300 transition-transform duration-300 ease-in-out hover:scale-105"
        >
          We turn raw ideas into immersive audio-visual experiences.
        </p>
        <a
          href="/contact"
          className="inline-block mt-8 sm:mt-12 px-10 py-4 rounded-full bg-amber-500
                     text-white text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up animation-delay-600"
        >
          Get a Quote
        </a>
      </div>
    </section>
  );
}