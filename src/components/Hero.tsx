'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SharedNav from './SharedNav';
import DownloadButton from './DownloadButton';

export default function Hero() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const animationRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) {
      const animate = () => {
        setTranslateX(prev => {
          const newVal = prev - 0.5;
          // Calculate approximate width of one set of features (8 features)
          // Assuming average feature width of ~400px + gap of ~128px (lg:gap-32)
          const oneSetWidth = (400 + 128) * 8; // ~4224px per set

          // When we've scrolled through one complete set, jump back by one set width
          if (newVal <= -oneSetWidth) {
            return newVal + oneSetWidth;
          }
          return newVal;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isDragging]);

  const features = [
    { icon: '🎯', text: 'Track Milestones', color: 'bg-green-400' },
    { icon: '🏥', text: 'Track Medical Records', color: 'bg-blue-400' },
    { icon: '💬', text: 'Organize Pet Messages', color: 'bg-purple-400' },
    { icon: '📈', text: 'Share Growth Updates', color: 'bg-pink-400' },
    { icon: '📸', text: 'Store Photos & Videos', color: 'bg-yellow-400' },
    { icon: '🔔', text: 'Get Reminders', color: 'bg-red-400' },
    { icon: '👨‍⚕️', text: 'Connect with Vets', color: 'bg-indigo-400' },
    { icon: '🎓', text: 'Training Tips', color: 'bg-teal-400' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-blue-100 font-baloo overflow-hidden pb-8 sm:pb-12 md:pb-16">
      <SharedNav />

      {/* Hero Content */}
      <div className="relative z-20 px-6 sm:px-8 lg:px-16 xl:px-32 2xl:px-48 pt-24 sm:pt-28 lg:pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-[1400px] mx-auto">

          {/* Left Content */}
          <div className="order-2 lg:order-1 text-left">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8 font-baloo">
              <span className="text-gray-900">Empowering</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> Ethical Breeders </span>
              <span className="text-gray-900">and</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> Pet Owners</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-blue-800 mb-8 sm:mb-10 leading-relaxed">
              Track your pet's journey, from their first steps to forever. Pawgress gives ethical breeders and pet parents a shared, transparent timeline for every pet, with updates, photos, and health records all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
              <DownloadButton className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                Download on the App Store
              </DownloadButton>
              <a href="/about" className="border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 font-semibold text-lg text-center">
                Learn More
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm text-blue-800 font-medium">
                  Trusted by <span className="font-bold text-blue-900">500+</span> breeders and shelters
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-blue-900">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Dog Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Decorative paw print behind dog */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-50 z-0">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="pawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: 'rgb(29, 78, 216)', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(30, 64, 175)', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <path fill="url(#pawGradient)" d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
                </svg>
              </div>
              <img
                src="https://pyv.hmu.temporary.site/wp-content/uploads/2026/01/front-view-cute-dog-costume-1-980x1468.png"
                alt="Cute dog in costume"
                className="w-full h-auto object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave cutoff at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
      
    </section>
  );
}