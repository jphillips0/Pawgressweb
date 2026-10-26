import type { Metadata, Viewport } from "next";
import { Inter, Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { ScrollProgressBar } from "@/components/motion";
import ScrollRestorer from "@/components/ScrollRestorer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Rounded face for the app-screen mockups (stands in for SF Pro Rounded off Apple devices).
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pawgress - Connecting Ethical Breeders & Trusted Shelters",
  description: "The premier platform connecting responsible pet buyers with ethical breeders and trusted animal shelters. Find your perfect companion with complete health records and transparency.",
  icons: {
    icon: '/pawgress-logo.png',
    apple: '/pawgress-logo.png',
  },
  other: {
    'apple-itunes-app': 'app-id=6752368171',
  },
  // Link preview card for every page that doesn't set its own (the pet, invite,
  // kennel and litter share links do). The favicon above is unaffected.
  metadataBase: new URL('https://www.pawgressapp.com'),
  openGraph: {
    type: 'website',
    siteName: 'Pawgress',
    url: 'https://www.pawgressapp.com',
    title: 'Pawgress: Run your litter, not your inbox',
    description: 'Puppy updates, weights, records and chats, shared by breeders with every family. Now with Astro, your AI kennel assistant.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Pawgress app screens with the headline Run your litter, not your inbox' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pawgress: Run your litter, not your inbox',
    description: 'Puppy updates, weights, records and chats, shared by breeders with every family. Now with Astro, your AI kennel assistant.',
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Edge-to-edge on iPhone: the page shows through behind the status bar and home
  // indicator instead of solid bands. The header and download bar pad themselves
  // with env(safe-area-inset-*) so their content clears the notch and home bar.
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${baloo.variable} ${nunito.variable}`}>
      <body className="font-inter antialiased bg-white text-gray-900">
        <ScrollProgressBar />
        <ScrollRestorer />
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
