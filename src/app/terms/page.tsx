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

export default function TermsOfService() {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ${baloo.className}`}>
      <SharedNav />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-20">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-blue-400/20 rounded-full blur-3xl animate-float-soft"></div>
        <div className="absolute top-40 right-20 w-24 h-24 sm:w-40 sm:h-40 bg-purple-400/20 rounded-full blur-3xl animate-float-soft" style={{ animationDelay: '1.5s' }}></div>
        
        <PageTransition className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm md:text-base font-semibold mb-6 sm:mb-8">
            Legal Information
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Terms of Service
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
          <div className="mb-8 sm:mb-12 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Welcome to <strong className="text-blue-600">Pawgress</strong>, operated by <strong className="text-blue-600">Timelines LLC</strong> ("Pawgress," "we," "our," or "us"). By creating an account, downloading the app, or using any features of Pawgress, you agree to the following Terms of Service ("Terms"). If you do not agree with these Terms, you may not access or use Pawgress.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">📋</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                1. Eligibility
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              You must be at least 13 years old to use Pawgress. If you are under 18, you may only use the service with permission from a parent or legal guardian. By using Pawgress, you represent that all information you provide is accurate and truthful.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🔐</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                2. User Accounts
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              You are responsible for maintaining the confidentiality of your login credentials and for all activity occurring under your account. You agree to notify us immediately of any unauthorized access or security breaches.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">📸</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                3. User-Generated Content
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                Pawgress allows users (including breeders, shelters, and pet owners) to upload images, videos, text, or other content ("User Content"). By uploading content, you grant Pawgress a worldwide, non-exclusive, transferable license to host, store, and display the content solely for purposes of providing the platform and services.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 font-medium">
                You represent and warrant that:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>you own the rights to all content you upload</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>your content does not violate the rights of any third party</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>your content complies with applicable laws relating to animal welfare, privacy, and intellectual property</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We may remove content that violates our policies or these Terms.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🐾</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                4. Pet and Breeder Information
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                Information posted by breeders, shelters, or other users is provided by the respective user and not verified by Pawgress. Pawgress does not guarantee the accuracy, legitimacy, or health claims of pets listed on the platform.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Pawgress is not responsible for communications, agreements, or transactions between breeders and buyers.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">💬</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                5. Messaging and Communication
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                Pawgress provides chat features to enable communication between breeders, shelters, and buyers. You agree not to use this platform to send spam, solicit illegal activity, or engage in abusive or fraudulent communication.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We may monitor messages for violations of our policies, but we do not guarantee moderation of all conversations.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">⚠️</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                6. Acceptable Use
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 font-medium">
                You agree not to use Pawgress to:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>violate laws or animal welfare regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>impersonate another person</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>upload harmful software</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>distribute illegal, offensive, or abusive content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>interfere with platform functionality, security, or systems</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these policies.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">💳</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                7. Payments and Subscriptions (If Applicable)
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              Some features may require a paid subscription. Fees are billed according to the pricing displayed in the app or website. All payments are non-refundable except where required by law.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🚫</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                8. Prohibited Activities
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3 font-medium">
                Users may not:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>scrape or extract data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>attempt to reverse engineer the app</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>use Pawgress to sell unauthorized or unlawful animals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>solicit medical advice or provide veterinary claims beyond legal limits</span>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Pawgress is not a substitute for veterinary guidance.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🔒</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                9. Privacy
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              Our Privacy Policy explains how we collect, store, and process user information. By using Pawgress, you also agree to our Privacy Policy.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🏥</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                10. Animal Health and Safety
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              Pawgress does not guarantee the health, condition, lineage, safety, or behavioral characteristics of any pet. Users assume full responsibility for verifying breeder information and conducting personal due diligence.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">⚖️</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                11. Warranty Disclaimer
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                Pawgress is provided <strong>"AS IS"</strong> without warranties of any kind. We make no guarantees regarding:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>uninterrupted service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>accuracy or reliability of data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>identity of users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>safety of transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>medical validity of pet information</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 12 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🛡️</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                12. Limitation of Liability
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                To the fullest extent permitted by law, Pawgress and Timelines LLC are not liable for damages arising from:
              </p>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>interactions between users</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>posted content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>loss of data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>misuse of the platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>reliance on information provided by users</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 13 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🔚</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                13. Termination
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              We may suspend or terminate your access at any time if you violate these Terms. You may delete your account at any time through the app.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-8 sm:mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">🔄</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                14. Changes to Terms
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed pl-11">
              We may update these Terms at any time. Continued use of Pawgress after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 15 */}
          <section className="mb-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl sm:text-3xl">📧</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                15. Contact
              </h2>
            </div>
            <div className="pl-11">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                If you have questions about these Terms, you may contact us at:
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full">
                <span className="text-lg">✉️</span>
                <a href="mailto:dev@pawgressapp.com" className="text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg">
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
