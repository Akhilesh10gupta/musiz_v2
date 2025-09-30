'use client'
import React from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  MdVideoLibrary,
  MdLibraryMusic,
  MdDesignServices,
  MdCameraAlt,
  MdAnimation,
  MdShare,
} from 'react-icons/md'

/* Smoother spring animation */
const cardVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

const cardVariantsRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

/* Stagger container */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

type Service = {
  title: string
  desc: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
}

type ServiceCardProps = Service & {
  direction: 'left' | 'right';
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, Icon, direction }) => (
  <motion.div
    variants={direction === 'left' ? cardVariantsLeft : cardVariantsRight}
    initial="hidden"
    whileInView="show"
    viewport={{ amount: 0.3 }}
    whileHover={{
      y: -4,
      transition: {
        duration: 0.25,
        ease: [0.42, 0, 0.58, 1], // Cubic bezier instead of string to avoid type error
      },
    }}
    className="group rounded-3xl border border-white/10 bg-black/25 backdrop-blur-sm
               p-8 flex flex-col items-center text-center gap-4 cursor-pointer
               transition-colors duration-300 hover:bg-blue-400"
  >
    <Icon
      size={42}
      className="text-blue-400 mb-2 transition-colors duration-300 group-hover:text-white"
    />
    <h3 className="text-lg font-semibold tracking-wide text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-white">{desc}</p>
  </motion.div>
)

export default function Services() {
  const services: Service[] = [
    {
      title: 'Video Production',
      desc: 'Craft impactful videos that captivate audiences and leave a lasting mark.',
      Icon: MdVideoLibrary,
    },
    {
      title: 'Music Production',
      desc: 'Shape your sound with precision—melodies that move, inspire, and connect.',
      Icon: MdLibraryMusic,
    },
    {
      title: 'Creation & Designs',
      desc: 'Turn bold ideas into striking visuals that engage, persuade, and convert.',
      Icon: MdDesignServices,
    },
    {
      title: 'Photography & Videography',
      desc: 'Capture powerful moments and product stories with stunning visual detail.',
      Icon: MdCameraAlt,
    },
    {
      title: 'Animation & Motion Graphics',
      desc: 'Add life to your message with bold, dynamic motion and storytelling.',
      Icon: MdAnimation,
    },
    {
      title: 'Distribution',
      desc: 'Share your story across the right channels to build trust and drive value',
      Icon: MdShare,
    },
  ]

  return (
    <section
      id="services"
      className="relative min-h-screen flex flex-col items-center justify-center
                 py-20 px-6 text-center overflow-hidden bg-gray-900"
    >
      <h2 className="relative z-10 text-4xl sm:text-5xl font-extrabold text-white tracking-wider mb-14">
        Explore&nbsp;<span className="text-blue-400">Our Services</span>
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full"
      >
        {services.map((s, i) => (
          <ServiceCard key={s.title} {...s} direction={i % 2 === 0 ? 'left' : 'right'} />
        ))}
      </motion.div>
    </section>
  )
}
