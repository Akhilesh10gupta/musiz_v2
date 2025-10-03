import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Artists - SiR Musiz Studios",
  description: "Discover the talented artists and creators who partner with SiR Musiz Studios. Explore their portfolios and stories.",
  keywords: ['SiR Musiz Studios artists', 'music artist portfolio', 'featured artists', 'client showcase'],
};

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
