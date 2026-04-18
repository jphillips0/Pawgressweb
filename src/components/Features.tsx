'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { animate, stagger, createSpring } from 'animejs';
import DownloadButton from './DownloadButton';
import { useInView } from '@/hooks/useInView';

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { threshold: 0.2 });

  // Ambient orbital motion for decorative balls (runs once on mount)
  useEffect(() => {
    if (!ballsRef.current) return;
    const balls = ballsRef.current.querySelectorAll<HTMLElement>('.deco-ball');
    balls.forEach((ball, i) => {
      const radius = 16 + i * 4;
      animate(ball, {
        translateX: [0, radius, 0, -radius, 0],
        translateY: [0, -radius, 0, radius, 0],
        duration: 5000 + i * 600,
        loop: true,
        ease: 'inOutSine',
        delay: i * 200,
      });
      animate(ball, {
        scale: [1, 1.25, 1],
        duration: 2200 + i * 300,
        loop: true,
        ease: 'inOutQuad',
      });
    });
  }, []);

  // Trigger entrance + count-up when in view
  useEffect(() => {
    if (!inView) return;

    if (imageRef.current) {
      animate(imageRef.current, {
        opacity: [0, 1],
        scale: [0.8, 1],
        rotate: [-6, 0],
        duration: 1100,
        ease: createSpring({ stiffness: 90, damping: 12 }),
      });
    }

    if (headingRef.current) {
      animate(headingRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 200,
        ease: 'out(3)',
      });
    }

    if (subRef.current) {
      animate(subRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        delay: 400,
        ease: 'out(3)',
      });
    }

    if (ctaRef.current) {
      const items = ctaRef.current.querySelectorAll<HTMLElement>(':scope > *');
      animate(items, {
        opacity: [0, 1],
        translateY: [25, 0],
        scale: [0.9, 1],
        ease: createSpring({ stiffness: 140, damping: 12 }),
        delay: stagger(120, { start: 600 }),
      });
    }

    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll<HTMLElement>('.stat-card');
      animate(cards, {
        opacity: [0, 1],
        translateY: [30, 0],
        ease: createSpring({ stiffness: 120, damping: 14 }),
        delay: stagger(150, { start: 700 }),
      });

      // Count-up numbers
      const numbers = statsRef.current.querySelectorAll<HTMLElement>('.stat-number');
      numbers.forEach((el) => {
        const target = parseFloat(el.dataset.target ?? '0');
        const suffix = el.dataset.suffix ?? '';
        const obj = { v: 0 };
        animate(obj, {
          v: target,
          duration: 1800,
          delay: 800,
          ease: 'out(3)',
          onUpdate: () => {
            const formatted = target % 1 === 0
              ? Math.round(obj.v).toLocaleString()
              : obj.v.toFixed(1);
            el.textContent = formatted + suffix;
          },
        });
      });
    }
  }, [inView]);
  const features = [
    {
      icon: '\u{1F4CB}',
      title: 'Pet Profile Management',
      description: 'Create rich profiles with photos, breed, DOB, sex, and reservation status. Group pets into litters, assign parents, display verified lineage, plus weight tracking and medical record storage.',
      color: 'from-blue-100 to-indigo-100',
      iconBg: 'bg-blue-500',
      image: '/Pet-Profile.jpeg',
    },
    {
      icon: '\u{1F4F1}',
      title: 'Media Timeline Auto-Build',
      description: 'Every update you send automatically appears in the pet\'s Pawgress timeline. Build chronological galleries with media and age stamps for memory preservation.',
      color: 'from-purple-100 to-violet-100',
      iconBg: 'bg-purple-500',
      image: '/Pet-Timeline.jpeg',
    },
    {
      icon: '\u{1F517}',
      title: 'Invite Links & Bulk Updates',
      description: 'Share unique invite links for each pet—buyers join instantly. Send one update (text, photos, videos) to multiple pets or entire litters at once.',
      color: 'from-green-100 to-emerald-100',
      iconBg: 'bg-green-500',
      image: '/Pet-Profiles-Page.jpeg',
    },
    {
      icon: '\u{1F3E5}',
      title: 'Health Records & Weight Tracking',
      description: 'Add medical entries including vaccinations, vet visits, medications, and test results. Track weight trends over time for wellness monitoring.',
      color: 'from-red-100 to-pink-100',
      iconBg: 'bg-red-500',
      image: '/Medical-Records.jpeg',
    },
    {
      icon: '\u{1F4AC}',
      title: 'Secure Chat Per Pet',
      description: 'One-to-one organized chats per pet keep conversations focused. Breeders and buyers communicate directly in dedicated, clean conversations tied to a single animal.',
      color: 'from-orange-100 to-amber-100',
      iconBg: 'bg-orange-500',
      image: '/Chat-Screen.jpeg',
    },
    {
      icon: '\u{1F916}',
      title: 'AI Assistant (Astro)',
      description: 'Ask general pet care or pet-specific questions with context. Get instant guidance on training, health, nutrition, and behavior—powered by AI.',
      color: 'from-teal-100 to-cyan-100',
      iconBg: 'bg-teal-500',
      image: '/Astro.jpeg',
    },
  ];

  return (
    <section ref={sectionRef} className="py-0 bg-white overflow-visible" id="features">
      {/* Bottom CTA Section with Blue Background and Waves */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 py-16 sm:py-20 lg:py-24 px-8 sm:px-12 lg:px-16 relative overflow-hidden">
        {/* Wave at top */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-16 sm:h-24 lg:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>

        {/* Aurora background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute top-10 -left-20 w-[28rem] h-[28rem] rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.5), rgba(99,102,241,0))' }}
            animate={{ x: [0, 50, -30, 0], y: [0, 30, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 -right-20 w-[28rem] h-[28rem] rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(168,85,247,0.45), rgba(168,85,247,0))' }}
            animate={{ x: [0, -40, 30, 0], y: [0, -30, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
            {/* Main Image */}
            <div className="mb-6 sm:mb-8 lg:mb-10 relative">
              <div ref={imageRef} style={{ opacity: 0 }} className="relative inline-block">
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl shadow-gray-900/20 transform hover:scale-105 transition-all duration-500">
                  <img
                    src="/dog fam1.jpg"
                    alt="Happy family with their adopted pet"
                    className="w-full max-w-md mx-auto"
                  />
                </div>
                {/* Decorative animated elements */}
                <div ref={ballsRef} className="absolute inset-0 pointer-events-none">
                  <div className="deco-ball absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-90 shadow-lg"></div>
                  <div className="deco-ball absolute -bottom-4 -left-4 w-7 h-7 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-90 shadow-lg"></div>
                  <div className="deco-ball absolute top-1/2 -left-6 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-80"></div>
                  <div className="deco-ball absolute top-1/4 -right-6 w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-80"></div>
                </div>
              </div>
            </div>

            <h3 ref={headingRef} style={{ opacity: 0 }} className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-baloo leading-tight">
              Ready to Start
              <br className="sm:hidden" />
              {' '}<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Collaborating?
              </span>
            </h3>
            
            <p ref={subRef} style={{ opacity: 0 }} className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto">
              Join ethical breeders and devoted pet owners who trust Pawgress to document, organize, and celebrate 
              every pet's journey with transparency and care.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 lg:mb-12">
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 350, damping: 22 }}>
                <DownloadButton className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-shadow w-full sm:w-auto text-center overflow-hidden">
                  <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM275.9 92.1c20.6-24.4 18.8-46.7 18.2-54.7-18.3 1.1-39.5 12.5-51.6 26.5-13.3 15-21.1 33.6-19.4 54.3 19.8 1.5 37.9-8.7 52.8-26.1z"/></svg>
                  <span className="relative z-10">Download on the App Store</span>
                </DownloadButton>
              </motion.div>
              
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 350, damping: 22 }}>
                <Link 
                  href="/mission" 
                  className="group relative border-2 border-blue-600/30 bg-white/70 backdrop-blur-md text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:border-blue-600/60 transition-colors font-semibold text-base sm:text-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center overflow-hidden"
                >
                  <span className="relative z-10">Learn Our Mission</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="stat-card text-center group rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md p-5 sm:p-6 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 transition-shadow" style={{ opacity: 0 }}>
                <div className="stat-number text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-baloo mb-2" data-target="500" data-suffix="+">0+</div>
                <div className="text-sm sm:text-base text-gray-600 font-semibold">Ethical Breeders</div>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="stat-card text-center group rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md p-5 sm:p-6 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 transition-shadow" style={{ opacity: 0 }}>
                <div className="stat-number text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-baloo mb-2" data-target="10" data-suffix="K+">0K+</div>
                <div className="text-sm sm:text-base text-gray-600 font-semibold">Pet Journeys Documented</div>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }} className="stat-card text-center group rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md p-5 sm:p-6 shadow-lg shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 transition-shadow" style={{ opacity: 0 }}>
                <div className="stat-number text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-baloo mb-2" data-target="98" data-suffix="%">0%</div>
                <div className="text-sm sm:text-base text-gray-600 font-semibold">Trust & Transparency</div>
              </motion.div>
            </div>
          </div>
        </div>
      
    </section>
  );
}
