/// <reference path="../custom.d.ts" />

'use client'
import React from 'react';
import './GlitchedWord.css';

interface GlitchedWordProps {
  word: string;
  isGlitched: boolean;
}

const GlitchedWord: React.FC<GlitchedWordProps> = ({ word, isGlitched }) => {
  return (
    <span className={isGlitched ? 'glitch' : ''}>
      <span className="glitch-base">{word}</span>
      <span className="glitch-text glitch-text-1" aria-hidden="true">{word}</span>
      <span className="glitch-text glitch-text-2" aria-hidden="true">{word}</span>
    </span>
  );
};

export default GlitchedWord;
