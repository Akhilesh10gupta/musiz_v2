import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects - SiR Musiz Studios",
  description: "Explore a comprehensive portfolio of our work, including music production, video projects, graphic design, and more. See the creativity of SiR Musiz Studios in action.",
  keywords: ['SiR Musiz Studios projects', 'music production portfolio', 'video production examples', 'graphic design showcase', 'our work'],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
