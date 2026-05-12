'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { animate, stagger, createSpring } from 'animejs';
import { useInView } from '@/hooks/useInView';

export default function HowItWorks() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const animationRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'buyers' | 'breeders'>('breeders');

  // Refs for scroll-triggered & ambient animations
  const stepsRef = useRef<HTMLDivElement>(null);
  const whatDoesRef = useRef<HTMLDivElement>(null);
  const whatIsRef = useRef<HTMLDivElement>(null);
  const transparencyRef = useRef<HTMLDivElement>(null);
  const decoBallsRef = useRef<HTMLDivElement>(null);
  const whatDoesBallsRef = useRef<HTMLDivElement>(null);

  const stepsInView = useInView(stepsRef, { threshold: 0.15 });
  const whatDoesInView = useInView(whatDoesRef, { threshold: 0.2 });
  const whatIsInView = useInView(whatIsRef, { threshold: 0.2 });
  const transparencyInView = useInView(transparencyRef, { threshold: 0.2 });

  // Ambient orbital motion for decorative balls
  useEffect(() => {
    const groups = [decoBallsRef.current, whatDoesBallsRef.current].filter(Boolean) as HTMLElement[];
    groups.forEach((group) => {
      const balls = group.querySelectorAll<HTMLElement>('.deco-ball');
      balls.forEach((ball, i) => {
        const radius = 14 + i * 6;
        animate(ball, {
          translateX: [0, radius, 0, -radius, 0],
          translateY: [0, -radius * 1.2, 0, radius * 1.2, 0],
          duration: 5500 + i * 700,
          loop: true,
          ease: 'inOutSine',
          delay: i * 250,
        });
        animate(ball, {
          scale: [1, 1.3, 1],
          duration: 2400 + i * 350,
          loop: true,
          ease: 'inOutQuad',
        });
      });
    });
  }, []);

  // Step + feature-highlight entry animations are handled per-element via framer-motion
  // (initial/animate on each card). Avoid animejs here because AnimatePresence mode="wait"
  // unmounts the old panel before the new cards exist in the DOM, causing inline opacity:0
  // to get stuck. The stepsInView ref is still kept for layout purposes.
  void stepsInView;

  // Animate "What Pawgress Does" panel
  useEffect(() => {
    if (!whatDoesInView || !whatDoesRef.current) return;
    const heading = whatDoesRef.current.querySelector<HTMLElement>('.wpd-heading');
    const text = whatDoesRef.current.querySelector<HTMLElement>('.wpd-text');
    const img = whatDoesRef.current.querySelector<HTMLElement>('.wpd-image');
    if (heading) animate(heading, { opacity: [0, 1], translateY: [30, 0], duration: 800, ease: 'out(3)' });
    if (text) animate(text, { opacity: [0, 1], translateY: [20, 0], duration: 800, delay: 200, ease: 'out(3)' });
    if (img) animate(img, {
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 1100,
      delay: 400,
      ease: createSpring({ stiffness: 90, damping: 12 }),
    });
  }, [whatDoesInView]);

  // Animate "What Pawgress Is" paragraphs
  useEffect(() => {
    if (!whatIsInView || !whatIsRef.current) return;
    const items = whatIsRef.current.querySelectorAll<HTMLElement>('.wis-item');
    items.forEach((el) => { el.style.opacity = '0'; });
    animate(items, {
      opacity: [0, 1],
      translateY: [25, 0],
      duration: 800,
      delay: stagger(180),
      ease: 'out(3)',
    });
  }, [whatIsInView]);

  // Animate transparency section
  useEffect(() => {
    if (!transparencyInView || !transparencyRef.current) return;
    const img = transparencyRef.current.querySelector<HTMLElement>('.tr-image');
    const content = transparencyRef.current.querySelectorAll<HTMLElement>('.tr-content > *');
    if (img) animate(img, {
      opacity: [0, 1],
      translateX: [-40, 0],
      duration: 1000,
      ease: createSpring({ stiffness: 90, damping: 14 }),
    });
    content.forEach((el) => { el.style.opacity = '0'; });
    animate(content, {
      opacity: [0, 1],
      translateX: [40, 0],
      duration: 800,
      delay: stagger(150, { start: 200 }),
      ease: 'out(3)',
    });
  }, [transparencyInView]);



  useEffect(() => {
    if (!isDragging) {
      let lastTime = performance.now();
      const speed = 60; // pixels per second
      
      const animate = (currentTime: number) => {
        const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;
        
        setTranslateX(prev => {
          const newVal = prev - (speed * deltaTime);
          // Reset position when scrolled through half the duplicates (3 sets)
          // This keeps the animation going infinitely
          const resetPoint = -3000; // Approximate width to trigger reset
          if (newVal < resetPoint) {
            return newVal + 1500; // Jump back by half, creating seamless loop
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
  }, [features.length]);
  const buyerSteps = [
    {
      number: '01',
      title: 'Connect to your specific pet',
      description: 'Get a unique invite link from your breeder to access your pet\'s dedicated profile and timeline.',
      icon: '\u{1F517}',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      number: '02',
      title: 'View your pet\'s timeline, medical records, and photos',
      description: 'Access your pet\'s complete timeline with updates, health records, weight trends, and memories.',
      icon: '\u{1F4F1}',
      color: 'from-purple-500 to-pink-600',
    },
    {
      number: '03',
      title: 'Chat with the breeder from day one through pickup',
      description: 'Message your breeder directly with organized one-to-one chat.',
      icon: '\u{1F4AC}',
      color: 'from-green-500 to-teal-600',
    },
    {
      number: '04',
      title: 'After transfer, the timeline stays with you',
      description: 'Track health records, milestones, and memories for life – your pet\'s complete history stays with you.',
      icon: '\u{1F4CB}',
      color: 'from-emerald-500 to-green-600',
    },
    {
      number: '05',
      title: 'Smart Search',
      description: 'Filter by breed, location, age, and more to find your perfect match.',
      icon: '\u{1F50D}',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      number: '06',
      title: 'Swipe to Match',
      description: 'Browse adorable profiles and connect with ethical breeders instantly.',
      icon: '\u{1F495}',
      color: 'from-pink-500 to-purple-600',
    },
  ];

  const breederSteps = [
    {
      number: '01',
      title: 'Create your pets profiles',
      description: 'Set up comprehensive profiles for each pet with all the essential information.',
      icon: '\u{1F4CB}',
      color: 'from-emerald-500 to-green-600',
    },
    {
      number: '02',
      title: 'Post updates, photos, and videos as you go',
      description: 'Share moments and milestones that automatically build each pet\'s timeline.',
      icon: '\u{1F4E4}',
      color: 'from-orange-500 to-red-600',
    },
    {
      number: '03',
      title: 'Invite buyers to connect to their specific pet',
      description: 'Share unique invite links with buyers for seamless access to their pet.',
      icon: '\u{1F91D}',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      number: '04',
      title: 'All updates, records, and messages stay tied to that pet',
      description: 'Keep everything organized in one place for clear, focused communication.',
      icon: '\u{1F4AC}',
      color: 'from-purple-500 to-pink-600',
    },
    {
      number: '05',
      title: 'Profile Showcase',
      description: 'Display your pets on your breeder profile — your storefront is always open.',
      icon: '\u{1F464}',
      color: 'from-orange-500 to-red-600',
    },
    {
      number: '06',
      title: 'Swipe Discovery',
      description: 'Get featured where buyers discover their perfect pet daily.',
      icon: '\u{2728}',
      color: 'from-pink-500 to-purple-600',
    },
  ];

  return (
    <section className="pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-32 bg-white" id="how-it-works">
      {/* Wide Animated Feature Carousel */}
      <div className="mb-16 sm:mb-20 lg:mb-24">
        <div className="rounded-3xl transition-transform duration-300 hover:scale-105 overflow-hidden">
          {/* Carousel Container - Continuous infinite scroll */}
          <div
            className="relative h-24 sm:h-32 lg:h-36 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing py-4"
            onMouseDown={(e) => {
              setIsDragging(true);
              setStartX(e.clientX);
            }}
            onMouseMove={(e) => {
              if (!isDragging) return;
              e.preventDefault();
              const diff = e.clientX - startX;
              setTranslateX(prev => prev + diff);
              setStartX(e.clientX);
            }}
            onMouseUp={() => {
              setIsDragging(false);
            }}
            onMouseLeave={() => {
              if (isDragging) {
                setIsDragging(false);
              }
            }}
          >
            <div
              ref={scrollRef}
              className="absolute flex items-center gap-16 sm:gap-20 lg:gap-32 select-none"
              style={{
                transform: `translateX(${translateX}px)`,
                transition: 'none'
              }}
            >
              {/* Render features many times for seamless infinite loop */}
              {[...features, ...features, ...features, ...features, ...features, ...features].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 sm:gap-4 flex-shrink-0"
                >
                  <span className="text-xl sm:text-3xl lg:text-5xl font-bold drop-shadow-lg whitespace-nowrap">
                    <span>{feature.icon}</span>{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {feature.text}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress indicator dots */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-2 sm:mt-3 lg:mt-4 pb-4 sm:pb-5 lg:pb-6">
            {features.map((_, index) => (
              <div
                key={index}
                className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${index === currentFeatureIndex
                    ? 'w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl'
                    : 'w-2 sm:w-3 bg-blue-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
        
        {/* What Pawgress Does Section - Split layout with floating chips */}
        <div ref={whatDoesRef} className="mb-20 sm:mb-24 lg:mb-32">
          <div className="relative rounded-3xl lg:rounded-[2.5rem] border border-white/80 overflow-hidden shadow-2xl shadow-indigo-900/15"
            style={{
              background:
                'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 30%, #fdf2f8 65%, #fef3c7 100%)',
            }}
          >
            {/* Soft glow accents */}
            <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-60 blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.5), transparent)' }} />
            <div aria-hidden className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-55 blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(168,85,247,0.45), transparent)' }} />
            <div aria-hidden className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-40 blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(244,114,182,0.4), transparent)' }} />
            <div aria-hidden className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full opacity-35 blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.45), transparent)' }} />
            {/* Top inner sheen */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-32 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)' }} />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 sm:p-12 lg:p-16">
              {/* Left: copy */}
              <div>
                <div className="wpd-heading inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-4 py-1.5 rounded-full text-sm font-semibold mb-5" style={{ opacity: 0 }}>
                  <span>🐾</span> What Pawgress Does
                </div>
                <h2 className="wpd-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 font-baloo tracking-tight leading-[1.05]" style={{ opacity: 0 }}>
                  One place for{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">every pet's story</span>
                </h2>
                <p className="wpd-text text-lg text-gray-600 leading-relaxed mb-8" style={{ opacity: 0 }}>
                  Pawgress organizes the communication between breeder and buyer. Breeders post updates to one or multiple pets, and those updates automatically appear in their chat and timeline. Buyers connect to their specific pet and chat directly with the breeder on that pet's page, keeping conversations clear, organized, and easy to find.
                </p>

                {/* Feature pills */}
                <div className="wpd-text flex flex-wrap gap-2.5" style={{ opacity: 0 }}>
                  {[
                    { i: '🔗', t: 'Per-pet invite links' },
                    { i: '📸', t: 'Auto-built timeline' },
                    { i: '💬', t: 'Focused chats' },
                    { i: '📦', t: 'Bulk updates' },
                    { i: '🏥', t: 'Health records' },
                  ].map((p) => (
                    <motion.span
                      key={p.t}
                      whileHover={{ y: -2, scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm hover:border-blue-300 hover:shadow-md transition-shadow"
                    >
                      <span>{p.i}</span> {p.t}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Right: image with floating chips */}
              <div className="relative">
                <motion.img
                  src="https://pyv.hmu.temporary.site/wp-content/uploads/2026/01/cute-pet-collage-isolated-2-980x389.png"
                  alt="Cute pets collage"
                  style={{ opacity: 0 }}
                  className="wpd-image relative w-full rounded-2xl shadow-2xl shadow-blue-900/15"
                  whileHover={{ scale: 1.02, rotate: 0.5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                />

                {/* Floating chips around image */}
                <motion.div
                  className="absolute -top-2 -left-1 lg:-top-4 lg:-left-6 bg-white rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 px-2 py-1.5 lg:px-4 lg:py-2.5 flex items-center gap-2 lg:gap-2.5 max-w-[55%] lg:max-w-none"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  animate={{ y: [0, -6, 0] }}
                >
                  <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md lg:rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs lg:text-base flex-shrink-0">📈</div>
                  <div className="min-w-0">
                    <div className="text-[10px] lg:text-xs text-gray-500 font-medium leading-tight">Weight</div>
                    <div className="text-xs lg:text-sm font-bold text-gray-900 leading-tight">+0.4 kg this week</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -right-1 lg:-bottom-4 lg:-right-6 bg-white rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 px-2 py-1.5 lg:px-4 lg:py-2.5 flex items-center gap-2 lg:gap-2.5 max-w-[55%] lg:max-w-none"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  animate={{ y: [0, 6, 0] }}
                >
                  <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-md lg:rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs lg:text-base flex-shrink-0">💬</div>
                  <div className="min-w-0">
                    <div className="text-[10px] lg:text-xs text-gray-500 font-medium leading-tight">New message</div>
                    <div className="text-xs lg:text-sm font-bold text-gray-900 leading-tight">From Sarah · Buddy</div>
                  </div>
                </motion.div>

                <motion.div
                  className="hidden sm:flex absolute top-1/2 -right-1 lg:-right-6 -translate-y-1/2 bg-white rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 px-2 py-1.5 lg:px-3.5 lg:py-2 items-center gap-1.5 lg:gap-2 max-w-[55%] lg:max-w-none"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="w-5 h-5 lg:w-7 lg:h-7 rounded-md lg:rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-[10px] lg:text-sm flex-shrink-0">❤️</div>
                  <span className="text-xs lg:text-sm font-semibold text-gray-900 leading-tight">Milestone unlocked</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Pawgress Is Section - Before/After comparison */}
      <div ref={whatIsRef} className="mb-20 sm:mb-24 lg:mb-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        {/* Wave at top */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>

        {/* Aurora blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div aria-hidden className="absolute top-32 -left-20 w-[26rem] h-[26rem] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(244,114,182,0.45), rgba(244,114,182,0))' }}
            animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div aria-hidden className="absolute bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.5), rgba(99,102,241,0))' }}
            animate={{ x: [0, -40, 20, 0], y: [0, -30, 20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <div className="wis-item inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-200/60 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 shadow-sm" style={{ opacity: 0 }}>
              <span>💡</span> Why Pawgress
            </div>
            <h2 className="wis-item text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 font-baloo tracking-tight" style={{ opacity: 0 }}>
              From <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">chaos</span> to{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">clarity</span>
            </h2>
            <p className="wis-item text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto" style={{ opacity: 0 }}>
              Most breeders juggle inquiries across DMs, texts, and emails. Pawgress was built to fix that.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* BEFORE card */}
            <motion.div
              className="wis-item relative rounded-3xl border border-rose-200/60 bg-white/70 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-rose-900/5 overflow-hidden"
              style={{ opacity: 0 }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                  ✗
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-rose-600 font-bold">Before</div>
                  <div className="text-xl font-bold text-gray-900 font-baloo">Scattered & overwhelmed</div>
                </div>
              </div>

              {/* Chaos visual: floating message bubbles */}
              <div className="relative h-44 sm:h-52 mb-6">
                {[
                  { txt: '💬 Insta DM', x: '4%', y: '8%', rot: -8, delay: 0 },
                  { txt: '✉️ Email #14', x: '55%', y: '4%', rot: 6, delay: 0.4 },
                  { txt: '📱 Text', x: '32%', y: '36%', rot: -3, delay: 0.8 },
                  { txt: '📞 Voicemail', x: '68%', y: '44%', rot: 9, delay: 1.2 },
                  { txt: '💬 FB Msgr', x: '8%', y: '62%', rot: 4, delay: 1.6 },
                  { txt: '📩 "Photos pls?"', x: '48%', y: '70%', rot: -5, delay: 2.0 },
                ].map((b, i) => (
                  <motion.div
                    key={i}
                    className="absolute px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-md text-sm font-medium text-gray-700 whitespace-nowrap"
                    style={{ left: b.x, top: b.y, rotate: b.rot }}
                    animate={{ y: [0, -4, 0, 4, 0], rotate: [b.rot, b.rot + 2, b.rot, b.rot - 2, b.rot] }}
                    transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
                  >
                    {b.txt}
                  </motion.div>
                ))}
              </div>

              <ul className="space-y-2.5 text-gray-600">
                {[
                  'Updates buried under new inquiries',
                  'Same questions asked over and over',
                  'No central record of a pet\'s history',
                  'Photos & videos lost in chat threads',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">✗</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* AFTER card */}
            <motion.div
              className="wis-item relative rounded-3xl border border-blue-200/60 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/40 backdrop-blur-md p-6 sm:p-8 shadow-2xl shadow-blue-900/10 overflow-hidden"
              style={{ opacity: 0 }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              {/* Glow */}
              <div aria-hidden className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-50 blur-3xl"
                style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.4), transparent)' }} />

              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                  ✓
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-blue-600 font-bold">With Pawgress</div>
                  <div className="text-xl font-bold text-gray-900 font-baloo">Organized & in sync</div>
                </div>
              </div>

              {/* Organized timeline visual */}
              <div className="relative mb-6 rounded-2xl bg-white border border-gray-100 shadow-inner p-4 space-y-2.5">
                {[
                  { dot: 'bg-blue-500', label: 'Buddy · Week 6 update', time: '2h' },
                  { dot: 'bg-purple-500', label: 'Daisy · Vet visit added', time: '1d' },
                  { dot: 'bg-emerald-500', label: 'Litter · Photos shared', time: '3d' },
                  { dot: 'bg-pink-500', label: 'Rocky · New milestone', time: '5d' },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50/60 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${row.dot}`} />
                    <span className="flex-1 text-sm font-medium text-gray-700">{row.label}</span>
                    <span className="text-xs text-gray-400">{row.time}</span>
                  </motion.div>
                ))}
              </div>

              <ul className="space-y-2.5 text-gray-700">
                {[
                  'Every update auto-saved to the right pet',
                  'One-to-one chat per pet, never lost',
                  'Lifetime timeline that travels with the pet',
                  'Send to one pet or an entire litter at once',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
        {/* How It Works Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 sm:px-6 rounded-full text-sm font-semibold tracking-wide mb-5">
            <span className="mr-2">🚀</span> How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 font-baloo mb-4">
            Simple. Connected. Transparent.
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Whether you're welcoming a new pet or raising one, Pawgress keeps everyone on the same page.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="relative flex bg-white border border-gray-200 rounded-2xl p-1.5 gap-1 shadow-lg shadow-blue-900/5">
            {/* Breeders button — first / default */}
            <button
              onClick={() => setActiveTab('breeders')}
              className={`relative flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors duration-300 z-10 ${
                activeTab === 'breeders' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {activeTab === 'breeders' && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="text-2xl">🌱</span>
              <span>For Breeders</span>
            </button>
            {/* Buyers button */}
            <button
              onClick={() => setActiveTab('buyers')}
              className={`relative flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors duration-300 z-10 ${
                activeTab === 'buyers' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {activeTab === 'buyers' && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="text-2xl">🏠</span>
              <span>For Buyers</span>
            </button>
          </div>
        </div>

        {/* For Buyers Panel */}
        <div ref={stepsRef} className="mb-20 sm:mb-24 lg:mb-32">
        <AnimatePresence mode="wait">
        {activeTab === 'buyers' && (
          <motion.div
            key="buyers"
            id="buyers"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Steps grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto mb-10">
              {buyerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="timeline-step group relative rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-lg shadow-blue-900/5 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Hover glow */}
                  <div aria-hidden className={`absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-60 blur-3xl transition-opacity duration-500 bg-gradient-to-br ${step.color}`} />
                  {/* Big watermark number */}
                  <span className={`absolute -top-2 right-3 text-7xl sm:text-8xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-10 select-none leading-none`}>
                    {step.number}
                  </span>
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-lg mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold tracking-wider bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        STEP {step.number}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug font-baloo">{step.title}</h4>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href="/for-buyers"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 hover:-translate-y-0.5"
              >
                See the full buyer workflow
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}

        {/* For Breeders Panel */}
        {activeTab === 'breeders' && (
          <motion.div
            key="breeders"
            id="breeders"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Steps grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto mb-10">
              {breederSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="timeline-step group relative rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-lg shadow-emerald-900/5 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <div aria-hidden className={`absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-60 blur-3xl transition-opacity duration-500 bg-gradient-to-br ${step.color}`} />
                  <span className={`absolute -top-2 right-3 text-7xl sm:text-8xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-10 select-none leading-none`}>
                    {step.number}
                  </span>
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl shadow-lg mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold tracking-wider bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        STEP {step.number}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug font-baloo">{step.title}</h4>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href="/for-breeders"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition-all duration-300 hover:-translate-y-0.5"
              >
                See the full breeder workflow
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
        </div>

        {/* Built On Transparency Section */}
        <div ref={transparencyRef} className="mb-20 sm:mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Image with floating trust badges */}
            <div className="relative">
              {/* Background blob */}
              <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] opacity-60 blur-2xl"
                style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.35), transparent 70%)' }} />

              <motion.div
                style={{ opacity: 0 }}
                className="tr-image relative"
                whileHover={{ rotate: 0, scale: 1.01 }}
                initial={{ rotate: -2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border-4 border-white">
                  <img
                    src="https://pyv.hmu.temporary.site/wp-content/uploads/2026/01/african-american-woman-wearing-pink-sweater-holding-puppies-1-1-980x653.png"
                    alt="Woman with puppies"
                    className="w-full block"
                  />
                </div>
              </motion.div>

              {/* Floating trust badges */}
              <motion.div
                className="absolute -top-2 -left-1 lg:-top-4 lg:-left-8 bg-white rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 px-2 py-1.5 lg:px-4 lg:py-3 flex items-center gap-2 lg:gap-3 max-w-[60%] lg:max-w-none"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                animate={{ y: [0, -6, 0] }}
              >
                <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <svg className="w-3.5 h-3.5 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] lg:text-xs text-gray-500 font-medium leading-tight">Verified</div>
                  <div className="text-xs lg:text-sm font-bold text-gray-900 leading-tight">Ethical breeders only</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-1 lg:-right-8 -translate-y-1/2 bg-white rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 px-2 py-1.5 lg:px-4 lg:py-3 flex items-center gap-2 lg:gap-3 max-w-[60%] lg:max-w-none"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                animate={{ y: [0, 6, 0] }}
              >
                <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <svg className="w-3.5 h-3.5 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] lg:text-xs text-gray-500 font-medium leading-tight">Private</div>
                  <div className="text-xs lg:text-sm font-bold text-gray-900 leading-tight">Invite-only timelines</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 left-2 lg:-bottom-4 lg:left-12 bg-white rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 px-2 py-1.5 lg:px-4 lg:py-3 flex items-center gap-2 lg:gap-3 max-w-[60%] lg:max-w-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                animate={{ y: [0, -5, 0] }}
              >
                <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <svg className="w-3.5 h-3.5 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs text-gray-500 font-medium leading-tight">Secure</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">Encrypted records</div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Content */}
            <div className="tr-content">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                <span>🛡️</span> Built On Transparency
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-baloo tracking-tight leading-[1.05]">
                Trust isn't a feature.{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">It's the foundation.</span>
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed mb-8">
                <p>
                  Pawgress is designed to support responsible breeding and long-term pet care. We prioritize clear documentation, honest communication, and organized records — and we do not support puppy mills or non-transparent practices.
                </p>
              </div>

              {/* Trust feature list */}
              <div className="space-y-3">
                {[
                  { i: '✓', t: 'Every timeline is private and invite-only' },
                  { i: '✓', t: 'Records travel with the pet for life' },
                  { i: '✓', t: 'Breeders are reviewed for ethical standards' },
                ].map((row) => (
                  <div key={row.t} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-md">{row.i}</span>
                    <span className="text-gray-700 font-medium">{row.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes panelFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .panel-fade { animation: panelFade 0.3s ease-out both; }
      `}</style>
    </section>
  );
}
