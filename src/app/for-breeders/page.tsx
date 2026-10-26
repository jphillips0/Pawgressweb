'use client';

import { Baloo_2 } from 'next/font/google';
import { motion } from 'framer-motion';
import SharedNav from '@/components/SharedNav';
import PageHeroVisual from '@/components/PageHeroVisual';
import AstroWorkflow from '@/components/astro/AstroWorkflow';
import {
  BreederProfileScreen, FamilyChatScreen, HealthPair, PetOverviewScreen, PetProfilesScreen, PostUpdateScreen,
} from '@/components/app-screens/screens';

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

export default function ForBreedersPage() {
  return (
    <main className={`min-h-screen ${baloo.className}`}>
      <SharedNav />

      {/* ===== HERO ===== */}
      <section
        className="relative pt-24 sm:pt-32 pb-16 sm:pb-32 overflow-hidden"
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
            style={{ background: 'radial-gradient(closest-side, rgba(217,70,239,0.5), transparent)' }}
            animate={{ x: [0, -50, 30, 0], y: [0, 50, -20, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(56,189,248,0.55), transparent)' }}
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
            <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 lg:gap-12">
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
                  <span>For Breeders</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-[2.4rem] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.15] tracking-tight"
                >
                  <span className="text-gray-900">Run Your Breeding Program</span>{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Without the Inbox Chaos
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="text-lg sm:text-2xl text-gray-600 leading-relaxed mx-auto lg:mx-0 max-w-xl"
                >
                  <span className="sm:hidden">One place for every update, buyer and record, all tied to each pet.</span><span className="hidden sm:inline">Pawgress is built for ethical breeders tired of juggling DMs, resending updates, and losing records. One organized place for updates, buyers, and documents, all tied to each pet.</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="mt-8 hidden sm:flex flex-wrap justify-center lg:justify-start gap-3"
                >
                  {[
                    { i: '📋', t: 'Pet profiles' },
                    { i: '📢', t: 'Bulk updates' },
                    { i: '🔗', t: 'Buyer invites' },
                    { i: '🏥', t: 'Health logs' },
                    { i: '✨', t: 'Astro AI assistant' },
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

              <div className="lg:w-1/2 w-full relative">
                <PageHeroVisual variant="breeder" />
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
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Pet Profile</span>{' '}
                  <span className="text-gray-900">Management</span>
                </>
              }
              paragraphs={[
                'Create complete pet profiles with photos, breed, gender, reservation status, and parent lineage.',
                'Group pets into litters and keep all foundational information organized from the start.',
              ]}
              pills={[
                { i: '🧬', t: 'Lineage' },
                { i: '👶', t: 'Litters' },
                { i: '📅', t: 'Status' },
              ]}
              image={
                <div className="flex justify-center"><PetOverviewScreen width={260} /></div>
              }
            />

            <PawDivider color="blue" emoji="🐾" />

            <FeatureRow
              step="02"
              reverse
              badge="Litters"
              badgeColor="bg-gradient-to-r from-fuchsia-600 to-pink-600"
              cardGradient="bg-gradient-to-br from-fuchsia-50 to-pink-50"
              cardBorder="border border-fuchsia-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">Litter Profiles</span>{' '}
                  <span className="text-gray-900">Built In</span>
                </>
              }
              paragraphs={[
                "Group a litter's puppies under one page with a shared cover photo, birth date, breed, and live counts — how many are in the litter, how many are still available.",
                "Every puppy on the roster links straight to its own profile, so the litter page works as a hub, not a dead end.",
              ]}
              pills={[
                { i: '🐾', t: 'Shared roster' },
                { i: '📊', t: 'Live availability' },
                { i: '🔗', t: 'Linked pet profiles' },
              ]}
              image={
                <div className="flex justify-center"><PetProfilesScreen width={260} /></div>
              }
            />

            <PawDivider color="fuchsia" emoji="🐕" />

            <FeatureRow
              step="03"
              badge="Litter Feed"
              badgeColor="bg-gradient-to-r from-indigo-600 to-blue-600"
              cardGradient="bg-gradient-to-br from-indigo-50 to-blue-50"
              cardBorder="border border-indigo-100"
              title={
                <>
                  <span className="text-gray-900">One Post.</span>{' '}
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Every Buyer in the Litter.</span>
                </>
              }
              paragraphs={[
                "Post an update to the whole litter at once and it publishes to a shared litter feed that every buyer with a puppy in that litter can follow, on top of landing in each puppy's own chat and timeline.",
                "Buyers aren't stuck waiting on a personal message to see how their puppy's littermates are doing — the litter feed holds every post the breeder has made about that litter, in one place, in order.",
              ]}
              pills={[
                { i: '📣', t: 'Post once, reaches all' },
                { i: '📰', t: 'Shared litter feed' },
                { i: '🕒', t: 'Full posting history' },
              ]}
              image={
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20 max-w-[230px] sm:max-w-[260px] mx-auto border-4 border-white">
                  <img src="/Litter Posts.PNG" alt="Litter feed showing every update posted to the litter" className="w-full h-auto block" />
                </div>
              }
            />

            <PawDivider color="indigo" emoji="📣" />

            <FeatureRow
              step="04"
              reverse
              badge="Discovery"
              badgeColor="bg-gradient-to-r from-purple-600 to-pink-600"
              cardGradient="bg-gradient-to-br from-purple-50 to-pink-50"
              cardBorder="border border-purple-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Public Pet</span>{' '}
                  <span className="text-gray-900">Profiles</span>
                </>
              }
              paragraphs={[
                "Available pets appear on your public breeder profile, letting buyers discover them and express interest without cluttered messages.",
                "Once a pet is linked to a buyer, it's removed from public view and all communication continues in that pet's private timeline and chat.",
              ]}
              pills={[
                { i: '🌐', t: 'Public listing' },
                { i: '🔒', t: 'Auto-private' },
                { i: '💬', t: 'Tied to pet' },
              ]}
              image={
                <div className="flex justify-center"><BreederProfileScreen width={260} /></div>
              }
            />

            <PawDivider color="purple" emoji="💜" />

            <FeatureRow
              step="05"
              badge="Updates"
              badgeColor="bg-gradient-to-r from-green-600 to-teal-600"
              cardGradient="bg-gradient-to-br from-green-50 to-teal-50"
              cardBorder="border border-green-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Bulk Updates</span>{' '}
                  <span className="text-gray-900">& Invite Links</span>
                </>
              }
              paragraphs={[
                'Post one update (text, photos, or video) to a single pet or an entire litter with one click.',
                'Connect buyers to their pet through unique links that create a dedicated chat and give them access to the full profile.',
              ]}
              pills={[
                { i: '⚡', t: 'One-click post' },
                { i: '🔗', t: 'Invite links' },
                { i: '👥', t: 'Litter-wide' },
              ]}
              image={
                <div className="flex justify-center"><PostUpdateScreen width={260} /></div>
              }
            />

            <PawDivider color="green" emoji="❤️" />

            <FeatureRow
              step="06"
              reverse
              badge="Chat"
              badgeColor="bg-gradient-to-r from-amber-600 to-orange-600"
              cardGradient="bg-gradient-to-br from-amber-50 to-orange-50"
              cardBorder="border border-amber-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Secure Chat</span>{' '}
                  <span className="text-gray-900">Per Pet</span>
                </>
              }
              paragraphs={[
                "Each pet has its own timeline and chat, keeping updates, media, and conversations clearly organized.",
                "Buyers chat with you directly inside the pet's page, so discussions stay focused and easy to manage.",
              ]}
              pills={[
                { i: '💬', t: 'Per-pet thread' },
                { i: '🗂️', t: 'No mixing' },
                { i: '🔔', t: 'Notifications' },
              ]}
              image={
                <div className="flex justify-center"><FamilyChatScreen width={260} /></div>
              }
            />

            <PawDivider color="amber" emoji="✨" />

            <FeatureRow
              step="07"
              badge="Health"
              badgeColor="bg-gradient-to-r from-pink-600 to-red-600"
              cardGradient="bg-gradient-to-br from-rose-50 to-red-50"
              cardBorder="border border-rose-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">Health Records</span>{' '}
                  <span className="text-gray-900">& Weight Tracking</span>
                </>
              }
              paragraphs={[
                "Log vaccinations, vet visits, medications, tests, and weight trends directly on each pet's timeline.",
                'Buyers can view health history at any time without needing to ask.',
              ]}
              pills={[
                { i: '💉', t: 'Vaccines' },
                { i: '⚖️', t: 'Weight trends' },
                { i: '📑', t: 'Auto-shared' },
              ]}
              image={
<HealthPair />
              }
            />

            <PawDivider color="rose" emoji="🏥" />

            <FeatureRow
              step="08"
              reverse
              badge="Timeline"
              badgeColor="bg-gradient-to-r from-cyan-600 to-blue-600"
              cardGradient="bg-gradient-to-br from-cyan-50 to-blue-50"
              cardBorder="border border-cyan-100"
              title={
                <>
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Media Timeline</span>{' '}
                  <span className="text-gray-900">Auto-Build</span>
                </>
              }
              paragraphs={[
                'Every update you post automatically builds a chronological timeline with media and age stamps.',
                'No more re-sending photos or videos across different platforms.',
              ]}
              pills={[
                { i: '🕒', t: 'Chronological' },
                { i: '📸', t: 'Photos & video' },
                { i: '🎂', t: 'Age stamps' },
              ]}
              image={
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/20 max-w-[230px] sm:max-w-[260px] mx-auto border-4 border-white">
                  <img src="/Follow your pets journey.PNG" alt="Media timeline" className="w-full h-auto block" />
                </div>
              }
            />

          </div>
        </div>
      </section>

      {/* ===== ASTRO KENNEL ASSISTANT ===== */}
      <AstroWorkflow variant="breeder" />

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
          style={{ background: 'radial-gradient(closest-side, rgba(217,70,239,0.45), transparent)' }}
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
            <span>Professional Breeding Management</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05] tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">One Platform.</span>{' '}
            <span className="text-gray-900">Complete Control.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl sm:text-2xl mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Join the ethical breeders already using Pawgress to organize their operations and build stronger relationships with buyers.
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
                src="/photos/breeders-cta.webp"
                alt="Man playing with his happy dog"
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
