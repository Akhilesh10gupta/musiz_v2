import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Samples & Beats (eKart) - SiR Musiz Studios",
  description: "Browse, preview, and purchase high-quality, royalty-free music samples, loops, and beats from the SiR Musiz Studios eKart. Perfect for your next production.",
  keywords: ['buy music samples', 'royalty-free loops', 'hip hop beats for sale', 'music production samples', 'SiR Musiz eKart'],
};

export default function EkartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
