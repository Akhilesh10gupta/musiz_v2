'use client'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { musicSamples } from '@/lib/data/beats';
import Image from 'next/image';
import { FaPlay, FaHeart, FaShare, FaDownload, FaArrowLeft } from 'react-icons/fa';
import LicenseModal from '@/components/LicenseModal';
import Link from 'next/link';
import Container from '@/components/Container';

export default function BeatPage() {
  const { id } = useParams();
  const beat = musicSamples.find((s) => s.id === Number(id));
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  if (!beat) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center pt-20">Beat not found</div>;
  }

  const relatedTracks = musicSamples.filter((s) => s.category === beat.category && s.id !== beat.id).slice(0, 5);

  return (
    <>
      <div className="fixed top-20 left-0 w-full z-10">
        <Container>
          <Link href="/store" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-gray-900/50 backdrop-blur-sm p-2 rounded-lg">
            <FaArrowLeft />
            <span>Back to Store</span>
          </Link>
        </Container>
      </div>
      <div className="bg-gray-900 text-white pt-28 pb-12 px-4">
        {showLicenseModal && <LicenseModal beat={beat} onClose={() => setShowLicenseModal(false)} />}
        <Container>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Column (Beat Details) */}
            <div className="lg:w-1/3">
              <div className="relative group mb-3">
                <Image
                  src={beat.artwork || '/logo.png'}
                  alt={beat.title}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover w-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-white text-4xl">
                    <FaPlay />
                  </button>
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">{beat.title}</h1>
              <p className="text-gray-400 text-base">by {beat.producer}</p>
              <div className="flex flex-wrap items-center text-gray-400 text-sm mt-2">
                <span>{new Date(beat.publishedDate).toLocaleDateString()}</span>
                <span className="mx-2">|</span>
                <span>{beat.plays.toLocaleString()} Plays</span>
                <span className="mx-2">|</span>
                <span>{beat.bpm} BPM</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-full flex items-center gap-2 text-sm">
                  <FaDownload />
                  <span>Download</span>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-full flex items-center gap-2 text-sm">
                  <FaHeart />
                  <span>Like</span>
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-full flex items-center gap-2 text-sm">
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>
              <button 
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-base w-full mt-3 hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                onClick={() => setShowLicenseModal(true)}
              >
                Buy Now - ₹{beat.price}
              </button>
            </div>

            {/* Right Column (Related Tracks) */}
            <div className="lg:w-2/3 bg-gray-800 p-3 rounded-lg">
              <h2 className="text-lg font-bold mb-3">Related Tracks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {relatedTracks.map((track) => (
                  <div key={track.id} className="bg-gray-700 p-1 rounded-lg flex flex-col items-center text-center hover:bg-gray-600 transition-colors">
                    <div className="relative mb-2">
                      <Image
                        src={track.artwork || '/logo.png'}
                        alt={track.title}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button className="text-white text-lg">
                          <FaPlay />
                        </button>
                      </div>
                    </div>
                    <p className="font-semibold text-xs truncate w-full">{track.title}</p>
                    <p className="text-xs text-gray-400">{track.bpm} BPM</p>
                    <div className="flex items-center gap-1 mt-1">
                      {track.discount && (
                        <span className="text-xs bg-red-500 text-white font-bold py-0.5 px-1.5 rounded-full">
                          {track.discount}
                        </span>
                      )}
                      <span className="font-semibold text-xs">₹{track.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
