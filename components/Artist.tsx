'use client'

import { motion, useInView } from 'framer-motion'
import { memo, useRef, useState } from 'react'
import Container from './Container' // ✅ using Container wrapper

/* ---------- Artist Data ---------- */
export const ARTISTS = [
  {
    name: 'AD Rapstar',
    genre: 'Hip-hop, Pop',
    description: 'Grammy-nominated producer creating ethereal soundscapes that blend electronic and organic elements.',
    achievement: '500M+ Streams',
    image: '🌙',
    color: 'purple',
    quote: 'SoundForge transformed my artistic vision into sonic reality. The team’s expertise is unmatched.',
  },
  {
    name: 'The Midnight Collective',
    genre: 'Indie Rock',
    description: 'Rising indie rock band known for their atmospheric sound and powerful live performances.',
    achievement: 'Billboard Top 40',
    image: '🎸',
    color: 'cyan',
    quote: 'Recording at SoundForge was a game-changer. They captured our energy perfectly.',
  },
  {
    name: 'Maya Santos',
    genre: 'R&B / Soul',
    description: 'Soulful vocalist whose powerful voice and emotional depth captivate audiences worldwide.',
    achievement: 'Multi-Platinum Artist',
    image: '👑',
    color: 'gold',
    quote: 'The vocal booth at SoundForge brings out the best in every performance. Pure magic.',
  },
  {
    name: 'Digital Dreams',
    genre: 'Synthwave / Retrowave',
    description: 'Duo creating nostalgic yet futuristic soundscapes that transport listeners to another dimension.',
    achievement: 'Spotify Editorial',
    image: '🚀',
    color: 'purple',
    quote: 'SoundForge understood our retro-futuristic vision and helped us bring it to life.',
  },
  {
    name: 'Alex Chen',
    genre: 'Film Score',
    description: 'Composer creating emotionally resonant scores for major motion pictures and documentaries.',
    achievement: 'Emmy Winner',
    image: '🎬',
    color: 'cyan',
    quote: 'The orchestral recording capabilities at SoundForge are world-class. Incredible space.',
  },
  {
    name: 'Neon Nights',
    genre: 'Pop / Dance',
    description: 'High-energy pop duo creating infectious dance tracks that dominate radio and streaming charts.',
    achievement: '300M+ Streams',
    image: '💫',
    color: 'gold',
    quote: 'SoundForge’s production team helped us create our biggest hits. They get our vision.',
  },
] as const

type Artist = (typeof ARTISTS)[number]

const colour = (c: Artist['color']) =>
  c === 'purple'
    ? { b: 'border-purple-300', t: 'text-purple-400' }
    : c === 'cyan'
    ? { b: 'border-cyan-300', t: 'text-cyan-400' }
    : { b: 'border-amber-300', t: 'text-amber-400' }

/* ---------- Components ---------- */
const NavItem = memo(({ artist, active, onClick }: { artist: Artist; active: boolean; onClick: () => void }) => {
  const c = colour(artist.color)
  return (
    <motion.button
      whileHover={{ x: 8 }}
      onClick={onClick}
      className={`w-full p-4 rounded-2xl flex gap-4 items-center transition ${
        active ? `border ${c.b} bg-gray-800/70` : 'hover:bg-gray-800/40'
      }`}
    >
      <span className="text-3xl">{artist.image}</span>
      <span>
        <span className={`block font-semibold ${active ? 'text-gradient' : 'text-black'}`}>
          {artist.name}
        </span>
        <span className="text-sm text-neutral-600">{artist.genre}</span>
      </span>
    </motion.button>
  )
})
NavItem.displayName = 'NavItem'

const GridCard = memo(({ artist, onClick }: { artist: Artist; onClick: () => void }) => {
  const c = colour(artist.color)
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      onClick={onClick}
      className={`rounded-3xl border ${c.b} bg-gray-800/20 backdrop-blur p-6 cursor-pointer`}
    >
      <div className="text-center">
        <div className="text-5xl mb-3">{artist.image}</div>
        <h3 className="font-bold text-lg text-white">{artist.name}</h3>
        <p className={`${c.t} text-sm mb-2`}>{artist.genre}</p>
        <div className="text-xs text-neutral-300">{artist.achievement}</div>
      </div>
    </motion.div>
  )
})
GridCard.displayName = 'GridCard'

/* ---------- Main Section ---------- */
export default function ArtistsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const current = ARTISTS[active] ?? ARTISTS[0]
  const show = { opacity: 1, y: 0 }
  const hide = { opacity: 0, y: 40 }

  return (
    <section id="artists" ref={ref} className="scroll-mt-24 py-24 lg:py-32 bg-gray-900 text-white">
      <Container>
        {/* Header */}
        <motion.div
          initial={hide}
          animate={inView ? show : hide}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            <span className="text-gradient">Artist&nbsp;Portfolio</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-neutral-400">
            Discover talented creators who trust us with their vision.
          </p>
        </motion.div>

        {/* Featured Artist Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 rounded-3xl border border-purple-300 bg-gray-800/60 backdrop-blur p-10"
        >
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="text-7xl mb-4">{current.image}</div>
              <h3 className="text-3xl font-bold mb-2 text-white">{current.name}</h3>
              <p className="text-cyan-400 mb-3">{current.genre}</p>
              <p className="mb-4 text-neutral-300">{current.description}</p>
              <div className="inline-block bg-amber-200/10 rounded px-3 py-1 text-sm mb-4 text-amber-300">
                {current.achievement}
              </div>
              <blockquote className="italic text-neutral-400">“{current.quote}”</blockquote>
            </div>
            <div className="space-y-3">
              {ARTISTS.map((a, i) => (
                <NavItem key={a.name} artist={a} active={i === active} onClick={() => setActive(i)} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Artist Grid (All 6) */}
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {ARTISTS.map((a, i) => (
            <motion.div key={a.name} variants={{ hidden: hide, show }} transition={{ duration: 0.5 }}>
              <GridCard artist={a} onClick={() => setActive(i)} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
