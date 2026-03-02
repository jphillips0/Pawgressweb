'use client';

import { useState } from 'react';
import { Baloo_2 } from 'next/font/google';
import SharedNav from '@/components/SharedNav';
import Footer from '@/components/Footer';
import DownloadButton from '@/components/DownloadButton';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
});

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isOpen = (id: string) => openItems.includes(id);

  return (
    <main className={`min-h-screen ${baloo.className}`}>
      <SharedNav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Everything you need to know about Pawgress. Can't find the answer you're looking for? 
              <a href="mailto:dev@pawgressapp.com" className="text-blue-600 hover:underline ml-1">Contact us</a>.
            </p>
          </div>
        </div>
      </section>

      {/* General Questions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">General</h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('general-1')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">What is Pawgress?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('general-1') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('general-1') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Pawgress is a platform that helps ethical breeders and pet owners stay connected through organized timelines, 
                      health records, and direct communication. Each pet gets their own profile where updates, photos, and messages 
                      are stored in one secure place.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('general-2')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Who is Pawgress for?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('general-2') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('general-2') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Pawgress is designed for ethical breeders, shelters, and pet owners. Breeders use it to organize communication 
                      and share updates efficiently. Buyers use it to stay connected to their pet's journey from day one through their 
                      entire life.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('general-3')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Is Pawgress free?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('general-3') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('general-3') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Yes! Pawgress is completely free for all pet buyers and owners. For breeders, Pawgress is currently free 
                      during the beta period. After beta, breeders will have subscription-based pricing that scales with the size 
                      of their operation, with no commissions or sales cuts ever taken.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('general-4')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">How is Pawgress different from social media?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('general-4') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('general-4') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Unlike social media where messages get buried and conversations get lost, Pawgress keeps everything organized by pet. 
                      Updates automatically appear in the right timelines, chats stay connected to specific pets, and nothing gets mixed up 
                      or pushed out of view.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('general-6')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Is Pawgress private and secure?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('general-6') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('general-6') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. Pet timelines and chats are private by default and only accessible to invited users. Breeders control who can 
                      view each pet's information. All data is encrypted and stored securely, and we never sell or share your information 
                      with third parties.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('general-7')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Does Pawgress support ethical breeding?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('general-7') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('general-7') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Absolutely. Pawgress was built specifically to support responsible, transparent breeding practices. Our platform 
                      encourages thorough record-keeping, open communication, and lifelong connections between breeders and pet owners. 
                      We believe ethical breeding is about transparency, care, and commitment to each animal's well-being.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Breeders */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">For Breeders</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('breeders-1')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">How do I add a new pet?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('breeders-1') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('breeders-1') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      From your dashboard, click "Add New Pet" and fill in the basic information like name, breed, birthdate, and photos. 
                      You can add more details anytime as the pet grows.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('breeders-2')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Can I post one update to multiple pets?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('breeders-2') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('breeders-2') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Yes! When posting an update, you can select multiple pets. The update will appear in each selected pet's timeline, 
                      and all connected buyers will see it automatically.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('breeders-3')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">How do I invite buyers?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('breeders-3') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('breeders-3') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Go to a pet's profile and click "Invite Buyer." Enter their email address or phone number, and they'll receive 
                      an invitation to connect to that specific pet's timeline.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('breeders-4')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">What happens after I transfer a pet to the buyer?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('breeders-4') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('breeders-4') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      You can transfer ownership of a pet's timeline to the buyer. They'll maintain access to all the history, photos, 
                      and records you created, and can continue adding to it throughout the pet's life.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('breeders-5')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Can I customize my profile?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('breeders-5') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('breeders-5') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Yes! Pro and Enterprise plans include custom branding options where you can add your logo, colors, and kennel information.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('breeders-6')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">What happens to a pet's profile after it's linked to a buyer?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('breeders-6') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('breeders-6') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      When you transfer a pet to a buyer, they gain full ownership of the profile. You'll maintain access to view the 
                      timeline and can continue to see updates if the buyer chooses to share them with you. This allows you to stay 
                      connected with the pets you've raised throughout their lives.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('breeders-7')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">How is communication organized?</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isOpen('breeders-7') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('breeders-7') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Communication in Pawgress is organized around each individual pet. Each pet has its own dedicated chat thread 
                      where you can message buyers, share photos, and coordinate pickups. You can also create litter groups to 
                      communicate with multiple buyers at once.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">For Buyers</h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('buyers-1')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">How do I connect to my pet?</h3>
                  <svg
                    className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${isOpen('buyers-1') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('buyers-1') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Your breeder will send you an invitation link via email or text. Click the link, create your free account, 
                      and you'll be instantly connected to your pet's timeline. You can also express interest in a pet directly 
                      in the app or enter a pet-specific invite code to connect to your pet.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('buyers-2')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Will I get notified when there's a new update?</h3>
                  <svg
                    className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${isOpen('buyers-2') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('buyers-2') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Yes! You'll receive notifications (via email, SMS, or push notification) whenever your breeder posts new photos, 
                      videos, or updates about your pet.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('buyers-3')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Can I add my own updates after I get my pet?</h3>
                  <svg
                    className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${isOpen('buyers-3') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('buyers-3') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Absolutely! Once ownership is transferred to you, you can continue adding photos, milestones, vet records, 
                      and memories to your pet's timeline for their entire life.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('buyers-4')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">Is my pet's information private?</h3>
                  <svg
                    className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${isOpen('buyers-4') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('buyers-4') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      Yes! Each pet's timeline is completely private and only accessible to people who have been invited. 
                      Your breeder can't see what you add after transfer, and other buyers can't see your pet's timeline.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem('buyers-5')}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">What happens after pickup?</h3>
                  <svg
                    className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${isOpen('buyers-5') ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen('buyers-5') && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      After pickup, your pet's timeline continues! You can keep adding updates, photos, and milestones. If you choose, 
                      you can share updates with your breeder to keep them connected to your pet's journey. The timeline becomes a 
                      lifelong record of your pet's life.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            We're here to help! Contact our friendly support team anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:dev@pawgressapp.com" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-colors">
              Contact Support
            </a>
            <DownloadButton className="bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-800 transition-colors border-2 border-white">
              Download on the App Store
            </DownloadButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
