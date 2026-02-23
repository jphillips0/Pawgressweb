import type { Metadata, Viewport } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${baloo.variable}`}>
      <body className="font-inter antialiased bg-white text-gray-900">
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
