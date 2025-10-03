import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import LayoutClient from "@/components/LayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sirmusizstudios.com'),
  title: {
    default: 'SiR Musiz Studios - Creative Audio & Visual Production',
    template: '%s | SiR Musiz Studios',
  },
  description: 'A creative haven where sonic innovation meets soulful storytelling. We turn raw ideas into immersive audio-visual experiences.',
  keywords: ['SiR Musiz Studios', 'Music Production', 'Video Editing', 'Mixing', 'Audio Engineering', 'Graphics Design'],
  openGraph: {
    title: 'SiR Musiz Studios- Creative Audio & Visual Production',
    description: 'A creative haven for audio and visual arts.',
    url: 'https://sirmusizstudios.com',
    siteName: 'SiR Musiz Studios',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiR Musiz Studios - Creative Audio & Visual Production',
    description: 'A creative haven for audio and visual arts.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo_2.ico',
    apple: '/logo_2.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: 'SiR Musiz Studios',
    url: 'https://sirmusizstudios.com',
    logo: 'https://sirmusizstudios.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91 84678 98698',
      contactType: 'customer service',
    },
  };
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <Script
          id="json-ld-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${dancingScript.variable} antialiased`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
