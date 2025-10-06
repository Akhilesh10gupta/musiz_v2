'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MusicSample } from '@/lib/data/beats';
import Image from 'next/image';
import {
  FaPlay, FaPause, FaForward, FaBackward,
  FaVolumeUp, FaVolumeMute, FaRandom, FaRedo, FaShare
} from 'react-icons/fa';
import { useCart } from '@/lib/context/CartContext';

interface MusicPlayerProps {
  beat: MusicSample;
  onNext: () => void;
  onPrev: () => void;
  setShowLicenseModal: (show: boolean) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ beat, onNext, onPrev, setShowLicenseModal }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { addToCart, cartItems, removeFromCart } = useCart();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error(e));
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = beat.url;
    }
  }, [beat]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newVolume = parseFloat(e.target.value);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime > 30) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(parseFloat(e.target.value));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: beat.title,
          text: `Check out this beat: ${beat.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const isBeatInCart = cartItems.find(item => item.id === beat.id);

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-2xl w-full p-6 border border-purple-500/20">
      <audio
        ref={audioRef}
        onEnded={onNext}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="none"
      />

      <div className="text-center mb-6">
        <div className="relative inline-block mb-4 shadow-lg rounded-lg overflow-hidden">
          <Image src={beat.artwork} alt={beat.title} width={150} height={150} className="rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <h3 className="text-xl font-bold">{beat.title}</h3>
        <p className="text-gray-400">{beat.producer}</p>
      </div>

      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6 mb-6">
        <button className="text-gray-400 hover:text-white"><FaRandom /></button>
        <button onClick={onPrev} className="text-gray-200 hover:text-white"><FaBackward size={24} /></button>
        <button onClick={togglePlay} className="bg-purple-600 hover:bg-purple-700 rounded-full p-4 transition-transform transform hover:scale-110 shadow-lg">
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button onClick={onNext} className="text-gray-200 hover:text-white"><FaForward size={24} /></button>
        <button className="text-gray-400 hover:text-white"><FaRedo /></button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center gap-2 w-full">
              {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
              <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
          </div>
          <button onClick={handleShare} className="text-gray-400 hover:text-white">
            <FaShare />
          </button>
      </div>

      <div className="mt-8 bg-gray-900/70 p-4 rounded-lg backdrop-blur-sm">
        <div className="flex flex-wrap items-center text-gray-400 text-sm mt-2">
          <span>{new Date(beat.publishedDate).toLocaleDateString()}</span>
          <span className="mx-2">|</span>
          <span>{beat.plays.toLocaleString()} Plays</span>
          <span className="mx-2">|</span>
          <span>{beat.bpm} BPM</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-3">
        </div>
        <div className="flex gap-2 mt-4">
          <button 
            className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full text-base w-full hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.5)]"
            onClick={() => setShowLicenseModal(true)}
          >
            Buy Now - ₹{beat.price}
          </button>
          {isBeatInCart ? (
            <button 
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-full text-base w-full hover:bg-red-600 transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              onClick={() => removeFromCart(beat.id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button 
className="bg-amber-500 text-white font-bold py-2 px-6 rounded-full text-base w-full hover:bg-amber-600 transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)]"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
