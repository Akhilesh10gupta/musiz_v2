'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MouseGradient from "@/components/MouseGradient";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MouseGradient />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className={`transition-filter duration-300 ${menuOpen ? 'blur-sm' : ''}`}>
        {children}
        <Footer />
      </main>
    </>
  );
}
