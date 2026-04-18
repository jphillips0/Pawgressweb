'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { animate, stagger, createSpring } from 'animejs';
import SharedNav from './SharedNav';
import DownloadButton from './DownloadButton';

export default function Hero() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const animationRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const dogImgRef = useRef<HTMLImageElement>(null);
  const pawSvgRef = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);

  // Orchestrated entrance + ambient animations
  useEffect(() => {
    // Split heading into per-word spans for staggered reveal
    if (headingRef.current) {
      headingRef.current.querySelectorAll<HTMLElement>(':scope > span').forEach((span) => {
        if (span.dataset.split === 'true') return;
        // Detect gradient classes so we can re-apply them to each word span
        // (background-clip: text on the parent does NOT extend through inline-block children)
        const parentClasses = span.className;
        const isGradient = /bg-clip-text/.test(parentClasses);
        const gradientClasses = isGradient
          ? parentClasses
              .split(/\s+/)
              .filter((c) =>
                /^bg-(gradient|clip-text)/.test(c) ||
                /^from-/.test(c) ||
                /^via-/.test(c) ||
                /^to-/.test(c) ||
                c === 'text-transparent',
              )
              .join(' ')
          : '';

        const text = span.textContent ?? '';
        span.textContent = '';
        const parts = text.split(/(\s+)/); // keep whitespace tokens
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            span.appendChild(document.createTextNode(part));
            return;
          }
          const w = document.createElement('span');
          w.className =
            'word inline-block will-change-transform' +
            (gradientClasses ? ' ' + gradientClasses : '');
          w.style.opacity = '0';
          w.textContent = part;
          span.appendChild(w);
        });
        span.dataset.split = 'true';
      });

      const words = headingRef.current.querySelectorAll<HTMLElement>('.word');
      animate(words, {
        opacity: [0, 1],
        translateY: [40, 0],
        rotate: [-6, 0],
        filter: ['blur(8px)', 'blur(0px)'],
        ease: createSpring({ stiffness: 120, damping: 14 }),
        delay: stagger(60),
      });
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 900,
        delay: 600,
        ease: 'out(3)',
      });
    }

    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll<HTMLElement>(':scope > *');
      animate(buttons, {
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.85, 1],
        ease: createSpring({ stiffness: 150, damping: 12 }),
        delay: stagger(120, { start: 800 }),
      });
    }

    if (avatarsRef.current) {
      const avatars = avatarsRef.current.querySelectorAll<HTMLElement>(':scope > div');
      animate(avatars, {
        opacity: [0, 1],
        scale: [0, 1],
        ease: createSpring({ stiffness: 200, damping: 10 }),
        delay: stagger(80, { start: 1100 }),
      });
    }

    if (socialRef.current) {
      animate(socialRef.current, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 700,
        delay: 1400,
        ease: 'out(3)',
      });
    }

    // Dog image entrance + persistent float
    if (dogImgRef.current) {
      animate(dogImgRef.current, {
        opacity: [0, 1],
        translateY: [60, 0],
        scale: [0.9, 1],
        duration: 1100,
        delay: 300,
        ease: createSpring({ stiffness: 80, damping: 12 }),
      });

      // Ambient floating loop
      animate(dogImgRef.current, {
        translateY: [0, -18, 0],
        duration: 4500,
        loop: true,
        ease: 'inOutSine',
        delay: 1400,
      });
    }

    // Paw print: gentle clockwise / counter-clockwise sway + breathing scale
    if (pawSvgRef.current) {
      animate(pawSvgRef.current, {
        rotate: [
          { to: 18, ease: 'inOutSine', duration: 3500 },
          { to: -18, ease: 'inOutSine', duration: 3500 },
          { to: 0, ease: 'inOutSine', duration: 1800 },
        ],
        loop: true,
      });
      animate(pawSvgRef.current, {
        scale: [1, 1.08, 1],
        opacity: [0.45, 0.7, 0.45],
        duration: 5000,
        loop: true,
        ease: 'inOutSine',
      });
    }
  }, []);

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
    <section className="relative font-baloo overflow-hidden pb-8 sm:pb-12 md:pb-16"
      style={{
        background:
          'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 35%, #f5f3ff 70%, #fdf4ff 100%)',
      }}
    >
      <SharedNav />

      {/* Aurora / mesh-gradient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -top-40 -left-32 w-[48rem] h-[48rem] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(99,102,241,0.65), rgba(99,102,241,0))',
          }}
          animate={{ x: [0, 60, -40, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute top-20 -right-40 w-[40rem] h-[40rem] rounded-full opacity-55 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(217,70,239,0.55), rgba(217,70,239,0))',
          }}
          animate={{ x: [0, -50, 30, 0], y: [0, 50, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-1/4 w-[34rem] h-[34rem] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(56,189,248,0.6), rgba(56,189,248,0))',
          }}
          animate={{ x: [0, 40, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(244,114,182,0.45), rgba(244,114,182,0))',
          }}
          animate={{ x: [0, -30, 50, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Soft top sheen */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-64"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.55), transparent)' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 px-6 sm:px-8 lg:px-16 xl:px-32 2xl:px-48 pt-24 sm:pt-28 lg:pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-[1400px] mx-auto">

          {/* Left Content */}
          <div className="order-2 lg:order-1 text-left">
            {/* Badge */}
            <motion.a
              href="#features"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-2 mb-6 rounded-full border border-blue-200/70 bg-white/70 backdrop-blur-md px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm shadow-blue-900/5 hover:border-blue-300 hover:bg-white transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Now live on the App Store
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>

            {/* Heading */}
            <h1 ref={headingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8 font-baloo">
              <span className="text-gray-900">Empowering</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> Ethical Breeders </span>
              <span className="text-gray-900">and</span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> Pet Owners</span>
            </h1>

            {/* Subtitle */}
            <p ref={subtitleRef} style={{ opacity: 0 }} className="text-lg sm:text-xl md:text-2xl text-blue-900/80 mb-8 sm:mb-10 leading-relaxed max-w-xl">
              Track your pet's journey, from their first steps to forever. Pawgress gives ethical breeders and pet parents a shared, transparent timeline for every pet, with updates, photos, and health records all in one place.
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-start mb-10">
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 350, damping: 22 }}>
                <DownloadButton className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 transition-shadow text-center">
                  <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM275.9 92.1c20.6-24.4 18.8-46.7 18.2-54.7-18.3 1.1-39.5 12.5-51.6 26.5-13.3 15-21.1 33.6-19.4 54.3 19.8 1.5 37.9-8.7 52.8-26.1z"/></svg>
                  Download on the App Store
                </DownloadButton>
              </motion.div>
              <motion.a
                href="/about"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="inline-flex items-center justify-center gap-2 border-2 border-blue-700/30 bg-white/60 backdrop-blur-md text-blue-800 px-8 py-4 rounded-full hover:bg-white hover:border-blue-700/60 transition-colors font-semibold text-lg text-center"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </motion.a>
            </div>

            {/* Social Proof — glass card */}
            <div ref={socialRef} style={{ opacity: 0 }} className="inline-flex items-center gap-4 sm:gap-5 rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md px-4 sm:px-5 py-3 shadow-lg shadow-blue-900/5">
              <div ref={avatarsRef} className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ opacity: 0 }} className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm text-blue-900/80 font-medium">
                  Trusted by <span className="font-bold text-blue-900">500+</span> breeders & shelters
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
              {/* Soft gradient halo behind dog */}
              <motion.div
                aria-hidden
                className="absolute inset-0 -z-0 rounded-[40%] blur-3xl"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(99,102,241,0.45), rgba(99,102,241,0) 70%)',
                }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.95, 0.7] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Decorative paw print behind dog */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none">
                <div ref={pawSvgRef} className="w-full h-full opacity-40 will-change-transform">
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
              </div>
              <img
                ref={dogImgRef}
                src="https://pyv.hmu.temporary.site/wp-content/uploads/2026/01/front-view-cute-dog-costume-1-980x1468.png"
                alt="Cute dog in costume"
                style={{ opacity: 0 }}
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