import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import MouseGradient from "@/components/MouseGradient";

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

// This metadata will be applied to all pages
export const metadata: Metadata = {
  title: {
    default: 'SiR Musiz Studios - Creative Audio & Visual Production',
    template: '%s | SiR Musiz Studios', // For nested pages, e.g., "About Us | SiR Musiz Studios"
  },
  description: 'A creative haven where sonic innovation meets soulful storytelling. We turn raw ideas into immersive audio-visual experiences.',
  keywords: ['SiR Musiz Studios', 'Music Production', 'Video Editing', 'Mixing', 'Audio Engineering', 'Graphics Design'],
  openGraph: {
    title: 'SiR Musiz Studios- Creative Audio & Visual Production',
    description: 'A creative haven for audio and visual arts.',
    url: 'https://sirmusizstudios.com', // Replace with your actual domain
    siteName: 'SiR Musiz Studios',
    images: [
      {
        url: 'https://sirmusizstudios.com/logo.png', // Replace with a link to your OG image
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
    // creator: '@your_twitter_handle', // Replace with your Twitter handle
    images: ['https://sirmusizstudios.com/logo.png'], // Replace with a link to your OG image
  },
  icons: {
    icon: '/logo_2.ico',
    apple: '/logo_2.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup', // Or 'Organization'
    name: 'SiR Musiz Studios',
    url: 'https://sirmusizstudios.com', // Replace with your actual domain
    logo: 'https://sirmusizstudios.com/logo.png', // Replace with your logo URL
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91 84678 98698', // Replace with your phone number
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
        <MouseGradient />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}