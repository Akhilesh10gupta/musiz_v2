'use client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - SiR Musiz Studios',
  description: 'Learn more about SiR Musiz Studios, our mission, and the creative minds behind our audio-visual productions.',
}

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Slider from './SlickNoSSR' // 🔄 Dynamic import to fix SSR hydration issue
import Image from 'next/image'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'




// ✅ Type-safe animation variant
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const TEAM = [
  { name: 'Shivam Kumar Gupta', role: 'Founder & Head', img: '/team/shivam.jpg' },
  { name: 'Dilip Gupta', role: 'Manager & Finance Manager', img: '/team/male-avatar.jpg' },
  { name: 'Shobha Madheshiya', role: 'Creative & Finance Manager', img: '/team/shobha.jpg' },
  { name: 'R Jxy', role: 'Audio Engineer & Music Producer', img: '/team/r_jxy.jpg' },
  { name: 'AD Rapstar', role: 'Mixing Engineer', img: '/team/ad.jpg' },
  { name: 'KRSH', role: 'Mixing Engineer', img: '/team/male-avatar.jpg' },
  { name: 'Adnan', role: 'Video Editor', img: '/team/adna.jpg' },
  { name: 'Ayush', role: 'Graphics designer & Animator', img: '/team/ayush.jpg' },
  { name: 'Akhilesh Gupta', role: 'Web Design Manager', img: '/team/akhilesh.jpg' },
  { name: 'Himanshu', role: 'Customer Relationship', img: '/team/himanshu.jpg' },
];

export default function About() {
  const [likes, setLikes] = useState<Record<number, boolean>>({})
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgPosX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleLike = (idx: number) => {
    setLikes(prev => ({ ...prev, [idx]: !prev[idx] }))
    if (!likes[idx]) {
      setTimeout(() => setLikes(prev => ({ ...prev, [idx]: true })), 3000)
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden text-gray-300 bg-gray-900"
    >
      <motion.div
        className="absolute inset-0 z-0 pattern-bg"
        style={{ backgroundPositionX: bgPosX }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        {/* heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          className="text-center text-4xl sm:text-5xl font-extrabold mb-6 text-white"
        >
          Meet Our{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500">
            Creative Force
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          className="mx-auto max-w-3xl text-center text-lg sm:text-xl text-gray-400 leading-relaxed mb-16"
        >
          SiR Musiz Studios is a creative haven where sonic innovation meets soulful storytelling.
          Our crew turns raw ideas into immersive audio-visual experiences.
        </motion.p>

        {/* carousel */}
        <div className="relative z-10">
          <Slider {...settings}>
            {TEAM.map((member, idx) => (
              <div key={idx} className="px-3">
                <motion.div
                  className="relative bg-gray-800/60 backdrop-blur-lg border border-white/10 rounded-3xl p-6 text-center"
                  whileHover={{ scale: 1.1, rotate: 2, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)" }}
                >
                  <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white/20 shadow-lg">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-white">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                  <button
                    onClick={() => toggleLike(idx)}
                    className="absolute top-4 right-4 text-xl text-teal-500 hover:text-pink-500 transition-colors"
                    aria-label="like profile"
                  >
                    {likes[idx] ? <AiFillHeart /> : <AiOutlineHeart />}
                  </button>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        {/* call to action */}
        <div className="flex justify-center mt-20">
          <motion.a
            href="/contact"
            className="inline-block bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 text-white px-10 py-3 rounded-full font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-200 transition-transform duration-300"
            variants={fadeUp}
            custom={4}
            initial="hidden"
            whileInView="visible"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </div>

      {/* hide arrows on small screens */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          .slick-prev,
          .slick-next {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}