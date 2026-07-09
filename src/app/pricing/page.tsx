'use client';

import { Baloo_2 } from 'next/font/google';
import { motion, type Variants } from 'framer-motion';
import SharedNav from '@/components/SharedNav';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const buyerFeatures = [
  'Discover available pets from ethical breeders',
  'Follow your pet\'s timeline before pickup',
  'Chat directly with your breeder',
  'Access health records, milestones, and updates',
  'Continue tracking your pet\'s information for life',
];

const whyCards = [
  {
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    text: 'You stay in control of your business',
  },
  {
    gradient: 'from-pink-500 to-rose-500',
    bg: 'from-pink-50 to-rose-50',
    border: 'border-pink-100',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    text: 'Buyers keep lifelong access to their pet\'s records',
  },
  {
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    text: 'Pawgress focuses on communication, organization, and transparency',
  },
];

export default function PricingPage() {
  return (
    <main className={`min-h-screen ${baloo.className}`}>
      <SharedNav />
      
      {/* Hero */}
      <section className="pt-32 pb-28 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 to-purple-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Text */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }}
                className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-indigo-600 px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-indigo-200/60 shadow-sm"
              >
                <span>💎</span><span>Transparent Pricing</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              >
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Simple,</span>
                <br />
                <span className="text-gray-900">Fair Pricing</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Pawgress supports breeder–buyer communication without interfering with how breeders run their businesses. Buyers always have free access to their pet's information.
              </motion.p>
            </div>

            {/* Image */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl scale-95" />
              <img
                src="/Pricing.png"
                alt="Pricing"
                className="w-full h-auto max-w-lg mx-auto relative z-10 drop-shadow-2xl rounded-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg className="block w-full h-14 sm:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* For Pet Buyers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-emerald-200/60 mb-4">
                🐾 Pet Buyers
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Always</span>{' '}
                <span className="text-gray-900">Free for Buyers</span>
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Card */}
              <motion.div
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 sm:p-10 border border-emerald-100 shadow-xl">
                  <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full text-base font-bold mb-8 shadow-lg shadow-emerald-500/30">
                    ✨ Always Free
                  </div>
                  <p className="text-lg text-gray-700 font-semibold mb-8">
                    Buyers never pay to use Pawgress. No hidden fees, no paywalls, ever.
                  </p>
                  <ul className="space-y-4">
                    {buyerFeatures.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/10 rounded-3xl blur-2xl scale-95" />
                <img
                  src="/Black Dog2.png"
                  alt="Happy dog"
                  className="w-full h-auto max-w-md mx-auto relative z-10 drop-shadow-xl rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-6 bg-white">
        <div className="flex items-center gap-4 w-full max-w-2xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200 flex-1" />
          <span className="text-2xl">🐾</span>
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-200 to-transparent flex-1" />
        </div>
      </div>

      {/* For Breeders */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-purple-200/60 mb-4">
                🏡 Breeders
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Pricing</span>{' '}
                <span className="text-gray-900">for Breeders</span>
              </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Content */}
              <motion.div
                className="lg:w-1/2 w-full order-2 lg:order-1"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-purple-100 space-y-7">
                  {/* Free Beta */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">Free During Beta</h3>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Active Now</span>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      During beta, breeders have full access to Pawgress at no cost while we build and refine the platform with early users.
                    </p>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* No commissions */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Commissions. No Sales Cuts.</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Pawgress never takes a percentage of your pet sales. You maintain full control over pricing, deposits, contracts, and payments. We operate on a subscription model, not by taking a cut of your business.
                    </p>
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Planned pricing */}
                  <div>
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-2xl font-bold text-gray-900">Planned Subscription Pricing</h3>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Coming Soon</span>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      After beta, Pawgress will offer three tiers that scale with your operation. Plans are expected to:
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Scale based on the size of your breeding operation',
                        'Offer increasing access to pet profiles, listings, health tracking, and AI features',
                        'Avoid per-sale, per-message, or per-buyer fees',
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <p className="text-gray-500 text-sm italic mt-5">
                      Early users will receive advance notice and preferred access before any pricing changes take effect.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                className="lg:w-1/2 relative order-1 lg:order-2"
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/10 rounded-3xl blur-2xl scale-95" />
                <img
                  src="https://pyv.hmu.temporary.site/wp-content/uploads/2026/01/young-lightskinned-brunette-woman-kisses-her-beloved-dog-tightly-while-holding-arms-pink-background-love-pets-joy-tenderness-1-832x1024.png"
                  alt="Woman with her dog"
                  className="w-full h-auto max-w-sm mx-auto relative z-10 drop-shadow-xl rounded-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Model */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Why This</span>{' '}
                <span className="text-gray-900">Model</span>
              </h2>
              <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
                Pawgress is built to support ethical breeders and responsible ownership without inserting itself into private transactions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {whyCards.map((card, i) => (
                <motion.div
                  key={i}
                  className={`bg-gradient-to-br ${card.bg} rounded-2xl p-8 border ${card.border} shadow-sm`}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                    {card.icon}
                  </div>
                  <p className="text-gray-800 font-semibold text-lg leading-snug">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 60%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)' }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Questions About Pricing?</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-10">
              If you want to discuss which future plan might fit your operation, reach out at{' '}
              <a href="mailto:dev@pawgressapp.com" className="text-white underline underline-offset-2 hover:text-blue-200 transition-colors font-semibold">
                dev@pawgressapp.com
              </a>
            </p>
            <motion.a
              href="/contact"
              whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-shadow"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
