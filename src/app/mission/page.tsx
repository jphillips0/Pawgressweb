'use client';

import Image from 'next/image';

import SharedNav from '@/components/SharedNav';
import Link from 'next/link';
import { Baloo_2 } from 'next/font/google';
import { motion } from 'framer-motion';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function MissionPage() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white">
      <SharedNav />
      <div className="w-full pt-24 sm:pt-28 lg:pt-32">
        <div className="flex flex-col md:flex-row relative overflow-hidden">

          {/* Left side - Image */}
          <div className="relative w-full md:w-1/2 h-[35vh] md:h-[80vh] overflow-hidden group">
            <div className="absolute inset-0 md:inset-6 md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer md:border md:border-white/50">
              <Image
                src="/Mission image.png"
                alt="Family bonding with their dog"
                fill
                style={{ objectFit: 'cover' }}
                priority
                className="object-center transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Right side - Minimalistic Text */}
          <div className="relative w-full md:w-1/2 h-[35vh] md:h-[80vh] flex items-center justify-center px-6 md:px-16 lg:px-20 xl:px-24">
            <div className="w-full max-w-4xl text-center">
              {/* Glass-morphism badge with paws */}
              <motion.div
                className="relative inline-block mb-3 sm:mb-4 md:mb-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              >
                <div className="absolute -left-16 sm:-left-24 md:-left-32 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-paw-fade" style={{animationDelay: '0s', transform: 'translateY(-50%) rotate(-15deg)'}}>
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#9333EA" d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
                  </svg>
                </div>
                <div className="inline-flex items-center backdrop-blur-sm bg-white/80 border border-white/50 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">✨ Our Mission</span>
                </div>
                <div className="absolute -right-16 sm:-right-24 md:-right-32 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-paw-fade" style={{animationDelay: '0.5s', transform: 'translateY(-50%) rotate(15deg)'}}>
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EC4899" d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
                  </svg>
                </div>
              </motion.div>
              
              <motion.h1
                className={`tracking-tight font-baloo`}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
              >
                <span className="block text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight font-bold">
                  <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Empowering breeders and pet owners to 
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> collaborate transparently</span>
                </span>
              </motion.h1>

              {/* Scroll indicator */}
              <div className="mt-8 flex justify-center">
                <div className="animate-bounce">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Details Section */}
        <div className="w-full bg-gradient-to-b from-blue-50 via-indigo-50/30 to-purple-50/20 min-h-screen relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12 xl:px-16 h-full py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start min-h-[80vh]">
              {/* Left side - Mission Statement */}
              <motion.div
                className="space-y-8 lg:col-span-3"
                initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-300/30 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span className="text-xl sm:text-2xl mr-2 group-hover:scale-110 transition-transform duration-300">🎯</span>
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Vision</span>
                </div>
                <h2 className={`font-baloo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold mb-4 sm:mb-6`}>
                  <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Connecting ethical breeders with devoted pet owners through 
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> transparent collaboration and care.</span>
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                  We believe transparency builds trust, creating better outcomes for pets, breeders, and families. 
                  Our platform empowers collaboration through growth tracking, health organization, and meaningful updates—so every pet's journey is documented, understood, and celebrated from early weeks to lifelong care.
                </p>
              </motion.div>

              {/* Right side - Value Props */}
              <div className="space-y-6 lg:col-span-2">
                <motion.div
                  className="group relative backdrop-blur-sm bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <span className="text-3xl sm:text-4xl mr-2 sm:mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🐾</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">For Ethical Breeders</h3>
                    </div>
                    <ul className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                      <li className="flex items-start group/item">
                        <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-base sm:text-lg"><strong className="text-gray-900">Save time</strong> with bulk updates and automated timelines</span>
                      </li>
                      <li className="flex items-start group/item">
                        <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-base sm:text-lg"><strong className="text-gray-900">Present professionally</strong> with organized profiles and verified lineage</span>
                      </li>
                      <li className="flex items-start group/item">
                        <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-base sm:text-lg"><strong className="text-gray-900">Keep buyers engaged</strong> with ongoing updates and direct communication</span>
                      </li>
                      <li className="flex items-start group/item">
                        <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-base sm:text-lg"><strong className="text-gray-900">Reduce repetitive questions</strong> with accessible health and growth data</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
                
                <motion.div
                  className="group relative backdrop-blur-sm bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <span className="text-3xl sm:text-4xl mr-2 sm:mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">❤️</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">For Pet Owners</h3>
                    </div>
                    <ul className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                      <li className="flex items-start group/item">
                        <span className="text-green-600 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-base sm:text-lg"><strong className="text-gray-900">Feel connected</strong> with real-time updates and timeline access</span>
                      </li>
                      <li className="flex items-start group/item">
                        <span className="text-green-600 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-base sm:text-lg"><strong className="text-gray-900">Stay informed</strong> with health records and weight tracking</span>
                      </li>
                      <li className="flex items-start group/item">
                        <span className="text-green-600 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-base sm:text-lg"><strong className="text-gray-900">Feel reassured</strong> through direct breeder communication</span>
                      </li>
                      <li className="flex items-start group/item">
                        <span className="text-green-600 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                        <span className="text-base sm:text-lg"><strong className="text-gray-900">Preserve memories</strong> with a living archive of your pet's early life</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="group relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-10 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <span className="text-3xl sm:text-4xl mr-2 sm:mr-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">✨</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Our Commitment</h3>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/95">
                      Professional, modern, trust-building, and growth-focused—centered on collaboration, 
                      clarity, and care for every pet's journey. We're here to strengthen the bond between 
                      ethical breeders and devoted pet owners through technology that serves both.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}