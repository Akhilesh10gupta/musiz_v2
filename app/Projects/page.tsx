'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { BsFillPlayFill } from 'react-icons/bs'
import { FaGoogleDrive } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  creator: string
  category: string
  description: string
  youtubeId?: string
  instagramUrl?: string
  driveUrl?: string
  spotifyUrl?: string
  imageUrl?: string
}

const projects: Project[] = [

  { id: 20, title: 'Hanju R Jxy', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Official music video.', youtubeId: '4liKhFq2QLQ' },
  { id: 21, title: 'OPEN MESSAGE- AD RAPSTAR ', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Official music video.', youtubeId: 'oWSAAOgXEfo' },
  { id: 22, title: 'Dooriyan| Aun Shah', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Official music video.', youtubeId: '_9zPtwJrFiA' },
  { id: 23, title: 'AD RAPSTAR - UK 08 | PROD BY R JXY ', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Official music video.', youtubeId: '4QpdNY60SS4' },
  { id: 24, title: 'Feeling Lonely - Neel D X AD Rapstar', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Official music video.', youtubeId: 'GDcB6rRE74s' },
  { id: 25, title: 'HANJU | R JXY ', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Official music video.', youtubeId: '6ofVoItZ5sw' },
  { id: 26, title: 'Imagination - R Jxy', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Official music video.', youtubeId: 'vIwr77d_KDM' },
  { id: 27, title: 'ROMANTIC TALE - AUN SHAH', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Official music video.', youtubeId: 'AylZmIeKj-Q' },
  { id: 5, title: 'Find You', creator: 'AI Cover', category: 'AI Content', description: 'AI-generated cover song.', youtubeId: '1fBdoKd0jqc' },
  { id: 6, title: 'Calm Down', creator: 'AI Cover', category: 'AI Content', description: 'AI-generated cover song.', youtubeId: 'VENmAHFggXQ' },
  { id: 7, title: 'Laut Aa', creator: 'AI Cover', category: 'AI Content', description: 'AI-generated cover song.', youtubeId: 'h3oGa2cR-K4' },
  { id: 8, title: 'Awara', creator: 'AI Cover', category: 'AI Content', description: 'AI-generated cover song.', youtubeId: 'rgviFUwvTG8' },
  { id: 9, title: 'Waiting For You', creator: 'AI Cover', category: 'AI Content', description: 'AI-generated cover song.', youtubeId: 'xVOQ7AedNio' },
  { id: 10, title: 'Flex Kare Munde', creator: 'AI Cover', category: 'AI Content', description: 'AI-generated cover song.', youtubeId: 'W_day14T880' },
  { id: 11, title: 'Top Notch', creator: 'SiR Musiz Studios', category: 'Animation & Motion Graphics', description: 'Dynamic motion graphics reel.', youtubeId: '4XuacguqN-8' },
  { id: 12, title: 'Careless R-jsx', creator: 'SiR Musiz Studios', category: 'Animation & Motion Graphics', description: 'Dynamic motion graphics reel.', youtubeId: 'LKgwIhZsdRo' },
  { id: 13, title: 'Black Magic', creator: 'SiR Musiz Studios', category: 'Animation & Motion Graphics', description: 'Dynamic motion graphics reel.', youtubeId: 'LlT36M0GSlA' },
  { id: 14, title: 'Shatranj', creator: 'SiR Musiz Studios', category: 'Animation & Motion Graphics', description: 'Dynamic motion graphics reel.', youtubeId: 'S-4rzwlWv18' },
  { id: 15, title: 'War of Eye', creator: 'SiR Musiz Studios', category: 'Animation & Motion Graphics', description: 'Dynamic motion graphics reel.', youtubeId: 'XJ8dPrPWiSM' },

  // ✅ Instagram Reels under "Animation & Motion Graphics"
  { id: 16, title: 'Teri Mauth', creator: 'Art Dept.', category: 'Animation & Motion Graphics', description: 'Instagram reel showcase.', instagramUrl: 'https://www.instagram.com/reel/DLewogvsAs_/embed' },
  { id: 17, title: 'Har Afsaney', creator: 'Art Dept.', category: 'Animation & Motion Graphics', description: 'Instagram reel showcase.', instagramUrl: 'https://www.instagram.com/reel/DKSc7grMZow/embed' },
  { id: 18, title: 'Feelinga', creator: 'Art Dept.', category: 'Animation & Motion Graphics', description: 'Instagram reel showcase.', instagramUrl: 'https://www.instagram.com/reel/DKtZM_2MbyG/embed' },
  { id: 19, title: 'Zind Vich Meri', creator: 'Art Dept.', category: 'Animation & Motion Graphics', description: 'Instagram reel showcase.', instagramUrl: 'https://www.instagram.com/reel/DKNlpCQsbjn/embed' },
  { id: 28, title: 'Project One', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Drive video 1.', driveUrl: 'https://drive.google.com/file/d/1ml9JXKYGT61ZzaMBMDeflkASVcmoxBZV/preview' },
  { id: 29, title: 'Project Two', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Drive video 2.', driveUrl: 'https://drive.google.com/file/d/1b736PrBW_GA5XHeqZxFLBrB7aB5bd84J/preview' },
  { id: 30, title: 'Project Three', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Drive video 3.', driveUrl: 'https://drive.google.com/file/d/1bHWQ8JECPA-xU6IfovSP6y8lMINwCWUh/preview' },
  { id: 31, title: 'Project Four', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'Drive video 4.', driveUrl: 'https://drive.google.com/file/d/120f4lcF3UHfJ4JC2Rx5uqaNnxtKYZs-8/preview' },
  // { id: 32, title: 'Rajkumari', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Instagram music showcase.', instagramUrl: 'https://www.instagram.com/reel/DJlyafWSwmO/embed' },
  // { id: 33, title: 'lifeofpaaji', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Instagram music showcase.', instagramUrl: 'https://www.instagram.com/reel/DLFmw33uk8K/embed' },
  // { id: 34, title: 'Bro Code Roast', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Instagram music showcase.', instagramUrl: 'https://www.instagram.com/reel/DJlk7PSznnR/embed' },
  { id: 32, title: 'Imagination', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Spotify embed.', spotifyUrl: 'https://open.spotify.com/embed/album/14C6KpEj0N1cJrn8WYFZC4' },
  { id: 33, title: 'Black Magic - Emcee Subh', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Spotify embed.', spotifyUrl: 'https://open.spotify.com/embed/album/3bE1xlsjAkAjepZZgFUMAj' },
  { id: 34, title: 'Sapne - R Jxy', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Spotify embed.', spotifyUrl: 'https://open.spotify.com/embed/album/39GhjI6k6q85EQ8JrYLgG0' },
  { id: 35, title: 'You & Me - AD Rapstar', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Spotify embed.', spotifyUrl: 'https://open.spotify.com/embed/album/0jBxsIoRfw0BT4frXTNyEN' },
  { id: 36, title: 'Soul - R Jxy', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Spotify embed.', spotifyUrl: 'https://open.spotify.com/embed/album/6UkOSXvsookOU68hmzQGP2' },
  { id: 37, title: 'Call - AD Rapstar', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Spotify embed.', spotifyUrl: 'https://open.spotify.com/embed/album/4s6yHXgYOdLBFllwc9C6un' },
  { id: 38, title: 'Missing You - AD Rapstar', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Spotify embed.', spotifyUrl: 'https://open.spotify.com/embed/album/2Ch2eQvFQznNznqzZEC5hv' },
  { id: 39, title: 'YouTube Link 1', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'External YouTube video.', youtubeId: 'XJ8dPrPWiSM' },
  { id: 40, title: 'YouTube Link 2', creator: 'SiR Musiz Studios',category: 'Video Production', description: 'External YouTube video.', youtubeId: 'KAImrOOFG9E' },
  { id: 41, title: 'YouTube Link 3', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'External YouTube video.', youtubeId: 'iHpMRAJWRhQ' },
  { id: 42, title: 'YouTube Link 4', creator: 'SiR Musiz Studios', category: 'Video Production', description: 'External YouTube video.', youtubeId: 'f5m5Nd50LZI' },
  { id: 43, title: 'War of Eye', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Music production showcase.', youtubeId: 'XJ8dPrPWiSM' },
  { id: 44, title: 'OPEN MESSAGE', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Music production showcase.', youtubeId: 'KAImrOOFG9E' },
  { id: 45, title: 'Heartstrings', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Music production showcase.', youtubeId: 'iHpMRAJWRhQ' },
  { id: 46, title: 'Missing You', creator: 'SiR Musiz Studios', category: 'Music Production', description: 'Music production showcase.', youtubeId: 'f5m5Nd50LZI' },
  {
    id: 47,
    title: 'Rajkumari Sound Design',
    creator: 'SiR Musiz Studios',
    category: 'Sound Design',
    description: 'Custom sound design for Instagram Reel.',
    instagramUrl: 'https://www.instagram.com/reel/DJlyafWSwmO/embed',
  },
  {
    id: 48,
    title: 'Life Of Paaji Sound Design',
    creator: 'SiR Musiz Studios',
    category: 'Sound Design',
    description: 'Custom sound design for Instagram Reel.',
    instagramUrl: 'https://www.instagram.com/reel/DLFmw33uk8K/embed',
  },
  {
    id: 49,
    title: 'Bro Code Roast Sound Design',
    creator: 'SiR Musiz Studios',
    category: 'Sound Design',
    description: 'Custom sound design for Instagram Reel.',
    instagramUrl: 'https://www.instagram.com/reel/DJlk7PSznnR/embed',
  },
  ...[
    'music_poster2.jpg',
    'music_poster3.jpg',
    'music_poster4.png',
    'music_poster5.jpg',
    'music_poster6.jpg',
    'music_poster7.jpg',
    'music_poster8.jpg',
    'music_poster9.jpg',
    'business1.png',
    'business2.png',
    'business3.png',
    'business4.png',
    'business5.png',
    'business6.png',
    'cretaive_trustprobook1.png',
    'cretaive_trustprobook2.png',
    'cretaive_trustprobook4.png',
    'smartkey_lendin2.png',
    'top_notch_album_cover.png',
    'trustprobook1.jpg',
    'trustprobook2.png',
    'trustprobook3.png',
    'trustprobook4.png',
    'education1.jpg',
    'education2.jpg',
    'education3.jpg',
    'education4.jpg',
    'education5.jpg',
    'edu1.jpg',
    'edu2.jpg',
    'edu3.jpg',
  ].map((url, i) => ({
    id: 50 + i,
    title: 'Poster Image',
    creator: 'Art Dept.',
    category: 'Poster & Social Media Post',
    description: 'A poster image.',
    imageUrl: `/poster/${url}`,
  })),
]

const categories = [
  'All',
  'Music Production',
  'Sound Design',
  'Mixing Section',
  'Video Production',
  'Animation & Motion Graphics',
  'Poster & Social Media Post',
  'AI Content',
  
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
}

export default function ProjectsPage() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [active, setActive] = useState<Project | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const itemsPerPage = 6

  const visible = projects.filter(p => {
    const cOK = category === 'All' || p.category === category
    const q = query.trim().toLowerCase()
    const qOK = p.title.toLowerCase().includes(q) || p.creator.toLowerCase().includes(q)
    return cOK && qOK
  })

  const totalPages = Math.ceil(visible.length / itemsPerPage)
  const paginatedProjects = visible.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [category, query])

  const getPaginationGroup = () => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage === totalPages) {
      return [totalPages - 1, totalPages]
    }

    return [currentPage, currentPage + 1]
  }

  const posterImages = projects.filter(p => p.category === 'Poster & Social Media Post' && p.imageUrl)

  const openModal = (project: Project) => {
    if (project.imageUrl) {
      const imageIndex = posterImages.findIndex(p => p.id === project.id)
      setActiveImageIndex(imageIndex)
    }
    setActive(project)
  }

  const nextImage = () => {
    const nextIndex = (activeImageIndex + 1) % posterImages.length;
    setActiveImageIndex(nextIndex);
    setActive(posterImages[nextIndex]);
  }

  const prevImage = () => {
    const prevIndex = (activeImageIndex - 1 + posterImages.length) % posterImages.length;
    setActiveImageIndex(prevIndex);
    setActive(posterImages[prevIndex]);
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white px-4 py-24"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            All Projects
          </h1>
          <p className="text-lg text-gray-400">Music, visuals, graphics & AI explorations from SiR Musiz Studios .</p>
        </div>

        <div className="rounded-3xl border border-teal-200/60 bg-gray-800/60 backdrop-blur-md shadow-inner
                        flex flex-wrap gap-4 items-center justify-between px-6 py-5 mb-14">
          <input
            type="text"
            placeholder="Search title or creator…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-grow min-w-[220px] lg:min-w-[260px] px-4 py-2 border border-gray-700
                       rounded-2xl placeholder-gray-400 focus:ring-2 focus:ring-blue-400/40
                       focus:outline-none bg-gray-900/70"
          />
          <div className="flex flex-wrap gap-3">
            {categories.map(c => (
              <motion.button
                key={c}
                whileTap={{ scale: 0.92 }}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${category === c
                    ? 'bg-gradient-to-r from-blue-400 to-teal-400 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:border-blue-400'}`}
              >
                {c}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {paginatedProjects.map(v => (
            <motion.div
              key={v.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              variants={cardVariants}
              onClick={() => openModal(v)}
              className="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden relative">
                {v.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0&modestbranding=1`}
                    title={v.title}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    allowFullScreen
                  />
                ) : v.instagramUrl ? (
                  <iframe
                    src={v.instagramUrl}
                    title={v.title}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : v.driveUrl ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-white p-4 text-center transition-transform duration-300 group-hover:scale-105">
                    <FaGoogleDrive className="text-5xl text-gray-400 mb-3" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <BsFillPlayFill className="text-white text-6xl" />
                    </div>
                  </div>
                ) : v.spotifyUrl ? (
                  <iframe
                    src={v.spotifyUrl}
                    title={v.title}
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                ) : v.imageUrl ? (
                  <Image
                    src={v.imageUrl}
                    alt={v.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : null}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visible.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl font-semibold">No matching projects found</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <motion.button
                key="back"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentPage === 1
                    ? 'bg-gray-800/60 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-blue-900'
                }`}
              >
                <FiChevronLeft />
                Previous
              </motion.button>

              {getPaginationGroup().map(page => (
                <motion.button
                  key={page}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-800/80 text-gray-300 hover:bg-blue-900'
                  }`}
                >
                  {page}
                </motion.button>
              ))}

              <motion.button
                key="forward"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentPage === totalPages
                    ? 'bg-gray-800/60 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-800/80 text-gray-300 hover:bg-blue-900'
                }`}
              >
                Forward
                <FiChevronRight />
              </motion.button>
            </nav>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              className={`relative w-full ${
                active.instagramUrl || active.spotifyUrl
                  ? 'max-w-sm aspect-[9/16]'
                  : active.imageUrl
                  ? 'max-w-4xl h-[80vh]'
                  : 'max-w-4xl aspect-video'
              }`}
            >
              {active.imageUrl ? (
                <>
                  <Image
                    src={active.imageUrl}
                    alt={active.title}
                    fill
                    className="object-contain rounded-xl"
                    sizes="90vw"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-1 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 text-white"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full p-2 text-white"
                  >
                    <FiChevronRight />
                  </button>
                </>
              ) : (
                <iframe
                  src={
                    active.youtubeId
                      ? `https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0&modestbranding=1`
                      : active.instagramUrl
                      ? active.instagramUrl
                      : active.driveUrl
                      ? active.driveUrl
                      : active.spotifyUrl
                      ? active.spotifyUrl
                      : ''
                  }
                  title={active.title}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="w-full h-full rounded-xl"
                />
              )}
              <button
                onClick={() => setActive(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gray-800 text-white font-bold text-xl shadow-md"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}