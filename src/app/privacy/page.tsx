import React from 'react';
import SharedNav from '@/components/SharedNav';
import { Baloo_2 } from 'next/font/google';
import { PageTransition, RevealGroup } from '@/components/motion';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
});

export default function PrivacyPolicy() {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ${baloo.className}`}>
      <SharedNav />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-20">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-blue-400/20 rounded-full blur-3xl animate-float-soft"></div>
        <div className="absolute top-40 right-20 w-24 h-24 sm:w-40 sm:h-40 bg-purple-400/20 rounded-full blur-3xl animate-float-soft" style={{ animationDelay: '1.5s' }}></div>
        
        <PageTransition className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-purple-100 text-purple-600 rounded-full text-xs sm:text-sm md:text-base font-semibold mb-6 sm:mb-8">
            Your Privacy Matters
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Last Updated: December 7, 2025
          </p>
        </PageTransition>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-16 sm:pb-20">
        <div className="backdrop-blur-sm bg-white/80 border border-white/50 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl">
          <RevealGroup>
          
          {/* Introduction */}
          <div className="mb-8 sm:mb-12 p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Pawgress is operated by <strong className="text-purple-600">Timelines LLC</strong> ("Pawgress," "we," "our," "us"). This Privacy Policy explains how Pawgress collects, uses, stores, and protects your information when you use our app or website. By using Pawgress, you agree to the practices described in this Privacy Policy.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">📋</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                1. Information We Collect
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                We may collect the following information when you use Pawgress:
              </p>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Personal Information</h3>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Phone number (optional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Account credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>User profile details</span>
                </li>
              </ul>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Pet & Breeder Information</h3>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Pet details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Breeding information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Shelter details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Pet media (images, videos)</span>
                </li>
              </ul>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Uploaded Content</h3>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Photos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Descriptions or notes</span>
                </li>
              </ul>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Device & Usage Data</h3>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Device type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Operating system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>IP address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Crash logs / errors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>App usage statistics</span>
                </li>
              </ul>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Location Information</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We may collect approximate location if you allow location permissions on your device.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🎯</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                2. How We Use Your Information
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 font-medium">
                We use information to:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>operate and maintain Pawgress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>authenticate your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>enable chat and media sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>improve user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>personalize recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>provide customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>ensure platform safety and compliance</span>
                </li>
              </ul>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 font-medium">
                We may use anonymized data for:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>performance tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>product improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>AI model improvement (non-personal only)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🤖</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                3. AI & Machine Learning
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                Certain features use artificial intelligence, including:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>collar recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>pet-based insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>content enhancement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>optional automated suggestions</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-2">
                We do not use your personal profile data to train external AI systems. AI processing may occur in third-party cloud services consistent with data protection standards.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🤝</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                4. Sharing & Third Parties
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                We may share limited data with:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>cloud hosting providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>analytics services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>payment processors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>customer support tools</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 font-semibold">
                We will never sell your personal information to third parties.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-2">
                We may disclose information if required by:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>legal process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>law enforcement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>regulatory requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>safety concerns</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">💬</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                5. Communication Between Users
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                Messages exchanged inside Pawgress are private between users, but may be processed by our servers in order to:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>enable real-time messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>protect safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>enforce platform policies</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We do not sell or publicly display your private conversations.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">💾</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                6. Data Storage
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              User data may be stored and processed in the United States or other countries where we operate secure cloud services. We take reasonable steps to protect personal information from loss, misuse, or unauthorized access.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🍪</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                7. Cookies & Tracking
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                Our website may use cookies or similar tracking technologies to:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>remember login sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>track usage analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>improve performance</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                You may disable cookies through browser settings.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">👶</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                8. Minors
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              Pawgress is not directed to children under 13. Minors under 18 may only use Pawgress under the supervision of a parent or legal guardian. If we learn we have collected data from a child without consent, we will delete it.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">⚙️</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                9. Your Choices
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                You may:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>update your account information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>delete your content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>request access to stored information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>request account deletion</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                To request deletion, email: <a href="mailto:support@pawgressapp.com" className="text-purple-600 hover:text-purple-700 font-semibold">support@pawgressapp.com</a>
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">⏱️</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                10. Data Retention
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                We retain data as long as necessary to:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>provide services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>maintain records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>comply with legal obligations</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Upon account deletion, your user content and personal information may be permanently removed or anonymized, except where retention is required by law.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🔒</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                11. Security
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              We use reasonable safeguards to protect data, including encryption, authentication, and secure hosting practices. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🔄</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                12. Changes to Privacy Policy
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              We may update this policy periodically. Continued use of Pawgress after changes means you accept the updated Privacy Policy.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">📧</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                13. Contact
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                For questions or privacy requests, contact:
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full">
                <span className="text-lg">✉️</span>
                <a href="mailto:dev@pawgressapp.com" className="text-purple-600 hover:text-purple-700 font-semibold text-base sm:text-lg">
                  dev@pawgressapp.com
                </a>
              </div>
            </div>
          </section>

          </RevealGroup>
        </div>
      </div>
    </div>
  );
}
