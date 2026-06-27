import type { Metadata } from "next";
import { Syncopate, Space_Mono } from "next/font/google";
import "./globals.css";

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MV3 // Max Verstappen — The Official Fan Experience",
  description: "An immersive, high-performance scrollytelling journey dedicated to 3x World Champion Max Verstappen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syncopate.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white/90">
        {children}
      </body>
    </html>
  );
}


