'use client';

import React from 'react';
import Image from 'next/image';

const logos = [
  { src: '/brandlogo/brandlogo1.png', alt: 'Brand Logo 1' },
  { src: '/brandlogo/brandlogo2.png', alt: 'Brand Logo 2' },
  { src: '/brandlogo/brandlogo3.png', alt: 'Brand Logo 3' },
  { src: '/brandlogo/brandlogo4.png', alt: 'Brand Logo 4' },
];

const LogoSlider = () => {
  const extendedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="bg-gray-900 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          }}
        >
          <div className="flex w-max animate-infinite-scroll">
            {extendedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-4" style={{ width: '160px' }}>
                <Image
                  className={`max-h-12 w-full object-contain ${
                    (logo.src.includes('next.svg') || logo.src.includes('vercel.svg')) ? 'invert' : ''
                  }`}
                  src={logo.src}
                  alt={logo.alt}
                  width={158}
                  height={48}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;
