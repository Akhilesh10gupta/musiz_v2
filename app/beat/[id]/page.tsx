'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { musicSamples } from '@/lib/data/beats';
import Image from 'next/image';
import { FaPlay, FaArrowLeft } from 'react-icons/fa';
import LicenseModal from '@/components/LicenseModal';
import Link from 'next/link';
import Container from '@/components/Container';
import MusicPlayer from '@/components/MusicPlayer';

export default function BeatPage() {
  const { id } = useParams();
  const beat = musicSamples.find((s) => s.id === Number(id));
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  if (!beat) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center pt-20">Beat not found</div>;
  }

  const relatedTracks = musicSamples.filter((s) => s.category === beat.category && s.id !== beat.id).slice(0, 5);
  const playlist = [beat, ...relatedTracks];

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const handleCloseModal = () => {
    setShowLicenseModal(false);
  };

  const currentBeat = playlist[currentTrackIndex];

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
        {showLicenseModal && <LicenseModal beats={[currentBeat]} onClose={handleCloseModal} />}
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <MusicPlayer
                beat={currentBeat}
                onNext={handleNext}
                onPrev={handlePrev}
                setShowLicenseModal={setShowLicenseModal}
              />
            </div>
            <div className="lg:w-2/3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <h2 className="text-lg font-bold mb-3">Related Tracks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {playlist.map((track, index) => (
                    <div key={track.id} 
                         className={`p-1 rounded-lg flex flex-col items-center text-center transition-colors ${currentTrackIndex === index ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                      <div className="relative mb-2">
                        <Image
                          src={track.artwork || '/logo.png'}
                          alt={track.title}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button onClick={() => setCurrentTrackIndex(index)} className="text-white text-lg">
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
          </div>
        </Container>
      </div>
    </>
  );
}
