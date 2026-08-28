'use client';

import { Baloo_2 } from 'next/font/google';
import { motion } from 'framer-motion';
import SharedNav from '@/components/SharedNav';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
});

type FeatureProps = {
  step: string;
  badge: string;
  badgeColor: string;
  title: React.ReactNode;
  paragraphs: string[];
  image: React.ReactNode;
  reverse?: boolean;
  cardGradient: string;
  cardBorder: string;
  pills?: { i: string; t: string }[];
};

function FeatureRow({ step, badge, badgeColor, title, paragraphs, image, reverse, cardGradient, cardBorder, pills }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
    >
      <div className="lg:w-1/2 w-full">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          className={`relative ${cardGradient} rounded-3xl p-8 sm:p-10 shadow-xl ${cardBorder} overflow-hidden`}
        >
          <span className={`absolute -top-4 right-4 text-8xl sm:text-9xl font-black ${badgeColor} bg-clip-text text-transparent opacity-10 select-none leading-none font-baloo`}>
            {step}
          </span>
          <div className="relative">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider ${badgeColor} bg-clip-text text-transparent border mb-4`}
              style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <span className={`text-base ${badgeColor} bg-clip-text text-transparent`}>STEP {step}</span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-600 not-italic">{badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-[1.1] tracking-tight">
              {title}
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} className={`text-base sm:text-lg leading-relaxed ${i === 0 ? 'text-gray-700' : 'text-gray-500 mt-3'}`}>
                {p}
              </p>
            ))}
            {pills && (
              <div className="flex flex-wrap gap-2 mt-6">
                {pills.map((p) => (
                  <motion.span
                    key={p.t}
                    whileHover={{ y: -2, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span>{p.i}</span> {p.t}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <div className="lg:w-1/2 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: reverse ? 3 : -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 }}
          whileHover={{ scale: 1.04, rotate: reverse ? -1.5 : 1.5 }}
        >
          {image}
        </motion.div>
      </div>
    </motion.div>
  );
}

function PawDivider({ color, emoji }: { color: string; emoji: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex items-center justify-center py-8"
    >
      <div className="flex items-center gap-4 w-full max-w-2xl">
        <div className={`h-0.5 bg-gradient-to-r from-transparent via-${color}-400 to-${color}-300 flex-1`}></div>
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl"
        >
          {emoji}
        </motion.div>
        <div className={`h-0.5 bg-gradient-to-r from-${color}-300 via-${color}-400 to-transparent flex-1`}></div>
      </div>
    </motion.div>
  );
}

export default function ForSheltersPage() {
  return (
    <main className={`min-h-screen ${baloo.className}`}>
      <SharedNav />

      {/* ===== HERO ===== */}
      <section
        className="relative pt-32 pb-32 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 35%, #f5f3ff 70%, #fdf4ff 100%)',
        }}
      >
        {/* Aurora */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.6), transparent)' }}
            animate={{ x: [0, 60, -40, 0], y: [0, 40, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute top-20 -right-40 w-[36rem] h-[36rem] rounded-full opacity-55 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.5), transparent)' }}
            animate={{ x: [0, -50, 30, 0], y: [0, 50, -20, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(217,70,239,0.45), transparent)' }}
            animate={{ x: [0, 40, -30, 0], y: [0, -40, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-12 sm:h-16 md:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md text-blue-700 border border-blue-200/70 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                  </span>
                  <span>For Shelters &amp; Rescues</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight"
                >
                  <span className="text-gray-900">Built for Rescue.</span>{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Not Retrofitted for It.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-xl sm:text-2xl text-gray-600 leading-relaxed mx-auto lg:mx-0 max-w-xl"
                >
                  Pawgress treats shelters and rescues as a first-class account type, not a breeder profile with the labels swapped. Intake to adoption, tracked on its own terms.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3"
                >
                  {[
                    { i: '📅', t: 'Intake date & source' },
                    { i: '🐾', t: 'Estimated age' },
                    { i: '⚡', t: 'Energy level' },
                    { i: '🏠', t: 'Compatibility flags' },
                  ].map((q) => (
                    <motion.span
                      key={q.t}
                      whileHover={{ y: -2, scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 text-sm font-semibold text-gray-700 shadow-sm"
                    >
                      <span>{q.i}</span> {q.t}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="lg:w-1/2 relative">
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] opacity-20 z-0"
                  animate={{ rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <linearGradient id="pawGradientShelters" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: 'rgb(14, 165, 233)', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(79, 70, 229)', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#pawGradientShelters)" d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.3 }}
                  className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border-4 border-white"
                >
                  <img
                    src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80"
                    alt="A dog and a cat, both up for adoption"
                    className="w-full h-auto block"
                  />
                </motion.div>

                {/* Floating chips */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
                  transition={{
                    opacity: { delay: 0.7, duration: 0.5 },
                    x: { delay: 0.7, duration: 0.5 },
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="hidden lg:flex absolute -top-4 -left-4 xl:-left-10 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-2.5 items-center gap-2.5 z-20"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-lg shadow-md">
                    📅
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium">In care</div>
                    <div className="text-sm font-bold text-gray-900">Rosie · 34 days</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
                  transition={{
                    opacity: { delay: 0.9, duration: 0.5 },
                    x: { delay: 0.9, duration: 0.5 },
                    y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="hidden lg:flex absolute -bottom-4 -right-4 xl:-right-10 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-2.5 items-center gap-2.5 z-20"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-md">
                    ✓
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium">Adopted</div>
                    <div className="text-sm font-bold text-gray-900">Duke · Good w/ kids</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-12">

            <FeatureRow
              step="01"
              badge="Profiles"
              badgeColor="bg-gradient-to-r from-blue-600 to-indigo-600"
              cardGradient="bg-gradient-to-br from-blue-50 to-indigo-50"
              cardBorder="border border-blue-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Adoption Profiles</span>{' '}
                  <span className="text-gray-900">Built for Rescue</span>
                </>
              }
              paragraphs={[
                "A rescue rarely has a birth date, so Pawgress doesn't force one. Animals carry an estimated age instead — \"about 2 years old\" — plus intake date, intake source, energy level, and compatibility flags for kids, dogs, and cats.",
                "It's the information an adopter actually asks about, captured the way your team actually has it.",
              ]}
              pills={[
                { i: '🐾', t: 'Estimated age' },
                { i: '📋', t: 'Intake source' },
                { i: '⚡', t: 'Energy level' },
              ]}
              image={
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 max-w-[230px] sm:max-w-[260px] mx-auto border-4 border-white">
                  <img src="/Pet Profile.PNG" alt="Adoption profile" className="w-full h-auto block" />
                </div>
              }
            />

            <PawDivider color="blue" emoji="🐾" />

            <FeatureRow
              step="02"
              badge="Timeline"
              badgeColor="bg-gradient-to-r from-purple-600 to-violet-600"
              cardGradient="bg-gradient-to-br from-purple-50 to-violet-50"
              cardBorder="border border-purple-100"
              reverse
              title={
                <>
                  <span className="text-gray-900">A Timeline Anchored to</span>{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Time in Care</span>
                </>
              }
              paragraphs={[
                "For a breeder, the timeline counts up from birth. For a shelter, that number is often unknown or beside the point — what matters is progress since intake.",
                "Every photo, update, and note is automatically stamped and grouped by days and weeks in your care, so an adopter can see exactly how an animal settled in, start to finish.",
              ]}
              pills={[
                { i: '📸', t: 'Auto-stamped updates' },
                { i: '📆', t: 'Days since intake' },
                { i: '💜', t: 'Full history' },
              ]}
              image={
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 max-w-[230px] sm:max-w-[260px] mx-auto border-4 border-white">
                  <img src="/Follow your pets journey.PNG" alt="Timeline of an animal's time in care" className="w-full h-auto block" />
                </div>
              }
            />

            <PawDivider color="purple" emoji="🐾" />

            <FeatureRow
              step="03"
              badge="Discovery"
              badgeColor="bg-gradient-to-r from-sky-600 to-blue-600"
              cardGradient="bg-gradient-to-br from-sky-50 to-blue-50"
              cardBorder="border border-sky-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Discovered</span>{' '}
                  <span className="text-gray-900">Right Alongside Breeders</span>
                </>
              }
              paragraphs={[
                'Shelters get their own section in search and their own filters — not folded into breeder results with the wrong labels attached.',
                'Adopters browsing Pawgress find your animals the same way they find any pet on the platform: by breed, age, and location.',
              ]}
              pills={[
                { i: '🔍', t: 'Dedicated shelter results' },
                { i: '📍', t: 'Location filters' },
              ]}
              image={
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/20 max-w-[230px] sm:max-w-[260px] mx-auto border-4 border-white">
                  <img src="/Search Page.PNG" alt="Search results including popular shelters" className="w-full h-auto block" />
                </div>
              }
            />

            <PawDivider color="sky" emoji="🐾" />

            <FeatureRow
              step="04"
              badge="Chat"
              badgeColor="bg-gradient-to-r from-emerald-600 to-teal-600"
              cardGradient="bg-gradient-to-br from-emerald-50 to-teal-50"
              cardBorder="border border-emerald-100"
              reverse
              title={
                <>
                  <span className="text-gray-900">One Chat Per</span>{' '}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Adopter</span>
                </>
              }
              paragraphs={[
                "Every conversation is tied to a specific animal and a specific adopter, not a shared shelter inbox where questions get lost.",
                'The language throughout matches how rescue actually works: adopter, adoption, foster and intake, not buyer and sale.',
              ]}
              pills={[
                { i: '💬', t: 'Adopter, not buyer' },
                { i: '🔗', t: 'One thread per animal' },
              ]}
              image={
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20 max-w-[230px] sm:max-w-[260px] mx-auto border-4 border-white">
                  <img src="/Chats.PNG" alt="Organized adopter conversations" className="w-full h-auto block" />
                </div>
              }
            />

            <PawDivider color="emerald" emoji="🐾" />

            <FeatureRow
              step="05"
              badge="Medical"
              badgeColor="bg-gradient-to-r from-red-600 to-pink-600"
              cardGradient="bg-gradient-to-br from-red-50 to-pink-50"
              cardBorder="border border-red-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Medical History</span>{' '}
                  <span className="text-gray-900">That Travels With the Animal</span>
                </>
              }
              paragraphs={[
                'Vaccinations, treatments, and vet visits logged during intake and care go with the animal at adoption, not lost in a paper file.',
                "An adopter starts their new life with their pet already knowing the full medical picture, not guessing at it.",
              ]}
              pills={[
                { i: '💉', t: 'Vaccination history' },
                { i: '🏥', t: 'Treatment records' },
                { i: '📎', t: 'Handoff at adoption' },
              ]}
              image={
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-900/20 max-w-[230px] sm:max-w-[260px] mx-auto border-4 border-white">
                  <img src="/Health.PNG" alt="Medical records" className="w-full h-auto block" />
                </div>
              }
            />

            <PawDivider color="red" emoji="🐾" />

            <FeatureRow
              step="06"
              badge="AI"
              badgeColor="bg-gradient-to-r from-violet-600 to-purple-600"
              cardGradient="bg-gradient-to-br from-violet-50 to-purple-50"
              cardBorder="border border-violet-100"
              reverse
              title={
                <>
                  <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Astro</span>{' '}
                  <span className="text-gray-900">Knows Their Story</span>
                </>
              }
              paragraphs={[
                "Astro answers using the specific animal's intake notes, medical history, and updates, so a new adopter gets guidance grounded in what your team actually observed, not a generic breed article.",
                'Fewer repeat questions in your inbox after adoption day.',
              ]}
              pills={[
                { i: '🧠', t: 'Knows their history' },
                { i: '💬', t: 'Adopter self-serve' },
              ]}
              image={
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-900/20 max-w-[230px] sm:max-w-[260px] mx-auto border-4 border-white">
                  <img src="/Astro.PNG" alt="Astro AI assistant" className="w-full h-auto block" />
                </div>
              }
            />

          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 35%, #f5f3ff 70%, #fdf4ff 100%)',
        }}
      >
        <motion.div
          aria-hidden
          className="absolute -top-32 right-0 w-[36rem] h-[36rem] rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.5), transparent)' }}
          animate={{ x: [0, -40, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -left-20 w-[36rem] h-[36rem] rounded-full opacity-45 blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.45), transparent)' }}
          animate={{ x: [0, 50, -30, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 sm:h-16 md:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 text-center relative pt-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md text-indigo-600 px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-indigo-200/50 shadow-sm"
          >
            <span>✨</span>
            <span>Made For Shelters, Not Adapted For Them</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05] tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Every Animal.</span>{' '}
            <span className="text-gray-900">Every Adopter. One Record.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Join the shelters and rescues using Pawgress to track intake to adoption and give every adopter a complete history of the animal they're bringing home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1638766211854-6c4fd0b9de4f?auto=format&fit=crop&w=1200&h=675&q=80"
                alt="Dogs playing together at the park"
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
