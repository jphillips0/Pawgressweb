'use client';

import Image from 'next/image';
import SharedNav from '@/components/SharedNav';
import Link from 'next/link';
import { Baloo_2 } from 'next/font/google';
import DownloadButton from '@/components/DownloadButton';


const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white">
      <SharedNav />
      
      <div className="w-full pt-24 sm:pt-28 lg:pt-32">
        {/* Hero Section */}
        <div className="min-h-[60vh] md:min-h-[80vh] flex flex-col md:flex-row relative overflow-hidden">

          {/* Left side - Image */}
          <div className="relative w-full md:w-1/2 h-[35vh] md:h-[80vh] overflow-hidden group">
            <div className="absolute inset-0 md:inset-6 md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer md:border md:border-white/50">
              <Image
                src="/about page image.jpg"
                alt="Happy family with their pet"
                fill
                style={{ objectFit: 'cover' }}
                priority
                className="object-center transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Right side - Headline */}
          <div className="relative w-full md:w-1/2 h-[35vh] md:h-[80vh] flex items-center justify-center px-6 md:px-16 lg:px-20 xl:px-24">
            <div className="w-full max-w-4xl text-center">
              {/* Glass-morphism badge with paws */}
              <div className="relative inline-block mb-3 sm:mb-4 md:mb-6">
                <div className="absolute -left-16 sm:-left-24 md:-left-32 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-paw-fade" style={{animationDelay: '0s', transform: 'translateY(-50%) rotate(-15deg)'}}>
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#9333EA" d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
                  </svg>
                </div>
                <div className="inline-flex items-center backdrop-blur-sm bg-white/80 border border-white/50 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">✨ About Us</span>
                </div>
                <div className="absolute -right-16 sm:-right-24 md:-right-32 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 animate-paw-fade" style={{animationDelay: '0.5s', transform: 'translateY(-50%) rotate(15deg)'}}>
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EC4899" d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
                  </svg>
                </div>
              </div>
              
              <h1 className="tracking-tight font-baloo">
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight font-bold">
                  <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Building bridges between </span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">ethical breeders</span>
                  <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent"> and </span>
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">devoted pet owners</span>
                </span>
              </h1>

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

        {/* Main Content Section */}
        <div className="w-full bg-gradient-to-b from-white via-blue-50/30 to-white min-h-screen relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-[90rem] mx-auto px-6 py-20 relative z-10">
            
            {/* Our Story */}
            <div className="max-w-4xl mx-auto mb-20">
              <div className="inline-flex items-center backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-300/30 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <span className="text-xl sm:text-2xl mr-2 group-hover:scale-110 transition-transform duration-300">🐾</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Story</span>
              </div>
              <h2 className="font-baloo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold mb-6 sm:mb-8">
                <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">We believe that communication is the key to ensuring your pet is taken care of before adoption.</span>
              </h2>
              <div className="space-y-4 sm:space-y-6 text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                <p>
                  At Pawgress, operated by <strong className="text-blue-600">Timelines, LLC</strong>, we dedicate ourselves to improving the buyer-breeder relationship through smooth, 
                  user-friendly interfaces that streamline connection between breeders and multiple buyers. 
                  We understand that bringing a new pet into your family is one of life's most meaningful decisions, 
                  and transparency should never be an afterthought.
                </p>
                <p>
                  That's why we've built a platform that makes communication effortless, documentation automatic, 
                  and trust-building natural. Every feature we design starts with a simple question: "Does this 
                  strengthen the relationship between breeders and pet owners?"
                </p>
              </div>
            </div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="group relative backdrop-blur-sm bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">💬</div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4">Communication First</h3>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    We believe open, organized communication builds trust. Our secure chat system ensures 
                    every conversation is connected to the right pet, making questions easy to ask and 
                    answers easy to find.
                  </p>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🎯</div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3 sm:mb-4">User-Friendly Design</h3>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    Technology should simplify, not complicate. We've designed smooth, intuitive interfaces 
                    that work for everyone—from tech-savvy breeders managing dozens of pets to first-time 
                    buyers checking in on their future companion.
                  </p>
                </div>
              </div>

              <div className="group relative backdrop-blur-sm bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🤝</div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">Relationship Focused</h3>
                  <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    The breeder-buyer connection doesn't end at adoption—it evolves. Our platform grows 
                    with your relationship, keeping lines of communication open and memories preserved for 
                    the lifetime of your pet.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Help */}
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white mb-20 shadow-2xl overflow-hidden group">
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <h2 className="font-baloo text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center">
                  How We Improve the Buyer-Breeder Relationship
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
                  <div className="space-y-4 sm:space-y-5">
                    <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">For Breeders</h4>
                    <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start">
                      <span className="text-blue-200 mr-2 sm:mr-3 text-lg sm:text-xl">✓</span>
                      <span className="text-base sm:text-lg">Streamline communication with multiple buyers through organized, per-pet chats</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-200 mr-2 sm:mr-3 text-lg sm:text-xl">✓</span>
                      <span className="text-base sm:text-lg">Send bulk updates to entire litters, saving time while keeping everyone informed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-200 mr-2 sm:mr-3 text-lg sm:text-xl">✓</span>
                      <span className="text-base sm:text-lg">Present your program professionally with detailed profiles and verified lineage</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-200 mr-2 sm:mr-3 text-lg sm:text-xl">✓</span>
                      <span className="text-base sm:text-lg">Reduce repetitive questions with accessible health records and updates</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">For Pet Owners</h4>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start group/item">
                      <span className="text-green-200 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                      <span className="text-base sm:text-lg">Stay connected with real-time updates on your pet's growth and development</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="text-green-200 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                      <span className="text-base sm:text-lg">Access complete health records and weight tracking before and after adoption</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="text-green-200 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                      <span className="text-base sm:text-lg">Communicate directly with your breeder through organized, focused conversations</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="text-green-200 mr-2 sm:mr-3 text-lg sm:text-xl font-bold group-hover/item:scale-125 transition-transform duration-300">✓</span>
                      <span className="text-base sm:text-lg">Preserve precious early memories in a living archive you can treasure forever</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
            {/* Why Communication Matters */}
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center backdrop-blur-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-300/30 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg font-semibold tracking-wide mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <span className="text-xl sm:text-2xl mr-2 group-hover:scale-110 transition-transform duration-300">💡</span>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Philosophy</span>
              </div>
              <h2 className="font-baloo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold mb-6 sm:mb-8">
                <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Communication is the foundation of responsible pet ownership</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 sm:mb-10">
                Before a pet comes home, there are crucial weeks where health, socialization, and development 
                lay the groundwork for a lifetime. During this critical period, clear communication ensures:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
                <div className="group relative backdrop-blur-sm bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">✓ Informed Decisions</h4>
                    <p className="text-gray-600 text-base sm:text-lg">Pet owners can make confident choices with complete visibility into their pet's early life.</p>
                  </div>
                </div>
                <div className="group relative backdrop-blur-sm bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">✓ Trust & Transparency</h4>
                    <p className="text-gray-600 text-base sm:text-lg">Open communication builds lasting relationships based on honesty and mutual respect.</p>
                  </div>
                </div>
                <div className="group relative backdrop-blur-sm bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">✓ Better Care</h4>
                    <p className="text-gray-600 text-base sm:text-lg">Breeders can share critical health information, ensuring seamless transitions and ongoing wellness.</p>
                  </div>
                </div>
                <div className="group relative backdrop-blur-sm bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-lg sm:text-xl">✓ Lasting Connections</h4>
                    <p className="text-gray-600 text-base sm:text-lg">Strong breeder-owner relationships continue long after adoption, supporting pets throughout their lives.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="w-full bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white py-20">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="font-baloo text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Join Us in Building Better Relationships</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
              Whether you're an ethical breeder looking to streamline your operations or a pet owner 
              wanting to stay connected, Pawgress is here to make communication effortless and 
              relationships stronger.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <DownloadButton className="group relative bg-blue-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg sm:text-xl text-center shadow-lg hover:shadow-xl hover:scale-105">
                <span className="relative z-10">Download on the App Store</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </DownloadButton>
              <Link href="/mission" className="group relative border-2 border-blue-600 text-blue-600 px-8 py-4 sm:px-10 sm:py-5 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-lg sm:text-xl text-center shadow-lg hover:shadow-xl hover:scale-105">
                <span className="relative z-10">Learn More About Our Mission</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
