'use client';

import Link from 'next/link';
import DownloadButton from './DownloadButton';

export default function Features() {
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
    <section className="py-0 bg-white overflow-visible" id="features">
      {/* Bottom CTA Section with Blue Background and Waves */}
      <div className="bg-blue-100 py-16 sm:py-20 lg:py-24 px-8 sm:px-12 lg:px-16 relative overflow-hidden">
        {/* Wave at top */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16 sm:h-24 lg:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
            {/* Main Image */}
            <div className="mb-6 sm:mb-8 lg:mb-10 relative">
              <div className="relative inline-block">
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl shadow-gray-900/20 transform hover:scale-105 transition-all duration-500">
                  <img
                    src="/dog fam1.jpg"
                    alt="Happy family with their adopted pet"
                    className="w-full max-w-md mx-auto"
                  />
                </div>
                {/* Decorative animated elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-90 animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -bottom-4 -left-4 w-7 h-7 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-90 animate-bounce shadow-lg" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 -left-6 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute top-1/4 -right-6 w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-80 animate-pulse" style={{animationDelay: '0.7s'}}></div>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-baloo leading-tight">
              Ready to Start
              <br className="sm:hidden" />
              {' '}<span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Collaborating?
              </span>
            </h3>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto">
              Join ethical breeders and devoted pet owners who trust Pawgress to document, organize, and celebrate 
              every pet's journey with transparency and care.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 lg:mb-12">
              <DownloadButton className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center overflow-hidden">
                <span className="relative z-10">Download on the App Store</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </DownloadButton>
              
              <Link 
                href="/mission" 
                className="group relative border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-base sm:text-lg inline-block w-full sm:w-auto text-center overflow-hidden"
              >
                <span className="relative z-10">Learn Our Mission</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-baloo mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-sm sm:text-base text-gray-600 font-semibold">Ethical Breeders</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-baloo mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
                <div className="text-sm sm:text-base text-gray-600 font-semibold">Pet Journeys Documented</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-baloo mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-sm sm:text-base text-gray-600 font-semibold">Trust & Transparency</div>
              </div>
            </div>
          </div>
        </div>
      
    </section>
  );
}
