import type { Metadata } from "next";
import { Alegreya_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const alegreyaSans = Alegreya_Sans({
  weight: ["400", "500", "700"],
  variable: "--font-alegreya-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Work Vibe - AI-Powered Company Vibe Checker",
  description:
    "Thinking of applying somewhere? Our AI checks the reviews and reveals if it's good vibes 😎 or red flags 🚩.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alegreyaSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
