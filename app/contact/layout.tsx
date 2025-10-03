import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - SiR Musiz Studios",
  description: "Get in touch with SiR Musiz Studios. Whether you have a question about our services or want to start a new project, we'd love to hear from you.",
  keywords: ['contact SiR Musiz Studios', 'music studio contact', 'audio production quote', 'video production contact'],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
