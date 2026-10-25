import React from 'react';
import Link from 'next/link';
import SharedNav from '@/components/SharedNav';
import { Baloo_2 } from 'next/font/google';
import { PageTransition, RevealGroup } from '@/components/motion';
import { Callout, Caps, H3, List, Mail, P, Ph, Section } from '@/components/legal/LegalBlocks';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
});

const a = 'terms' as const;

const privacyLink = (label = 'Privacy Policy') => (
  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold">{label}</Link>
);

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
            Last Updated: October 25, 2026
          </p>
        </PageTransition>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-16 sm:pb-20">
        <div className="backdrop-blur-sm bg-white/80 border border-white/50 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl">
          <RevealGroup>

          {/* Introduction */}
          <div className="mb-8 sm:mb-12 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              These Terms of Service (“Terms”) are an agreement between you and <strong className="text-blue-600">Timelines, LLC</strong>, a <Ph>[STATE OF FORMATION]</Ph> limited liability company doing business as <strong className="text-blue-600">Pawgress</strong> (“Pawgress,” “we,” “our,” or “us”). They cover the Pawgress app for iOS and Android and our website, pawgressapp.com (together, the “Service”). By creating an account or using the Service, you agree to these Terms and to our {privacyLink()}. If you don’t agree, please don’t use Pawgress.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-semibold">
              Please read Section 20 carefully. It requires most disputes to be settled by binding individual arbitration instead of in court, and it waives class actions and jury trials. You can opt out within 30 days.
            </p>
          </div>

          <Section accent={a} icon="📋" title="1. Eligibility">
            <P>You must be at least 18 years old to use Pawgress, because it involves reserving and buying animals. By using Pawgress, you confirm that:</P>
            <List accent={a} marker="check" items={[
              'you are 18 or older and able to enter into a binding contract',
              'you are not barred from using the Service under any law, and we have not previously banned you',
              'the information you give us is accurate, and you will keep it up to date',
              'if you use Pawgress for a kennel, shelter, or other business, you have authority to accept these Terms for it',
            ]} />
          </Section>

          <Section accent={a} icon="🔐" title="2. Your Account">
            <P>Pawgress has three account types: breeder, shelter, and pet owner (buyer). You are responsible for keeping your login secure and for everything that happens under your account. Tell us right away at <Mail accent={a} /> if you think someone else has accessed it. If you sign in with Apple or Google, their terms also apply to that sign-in.</P>
          </Section>

          <Section accent={a} icon="🐾" title="3. What Pawgress Does, and What It Doesn’t">
            <P>Pawgress lets breeders and shelters post photos, videos, weight logs, and updates about their animals, share them with the families who reserve them through a shared timeline and chat, list pets publicly, take inquiries, send puppy applications, and record an in-app ownership transfer at pickup. Pet owners can also keep records for their own pets.</P>
            <P strong>Pawgress is a software platform. We are not a breeder, shelter, broker, or veterinarian, and we don’t verify users, animals, listings, health claims, or lineage.</P>
          </Section>

          <Section accent={a} icon="🐕" title="4. Animal Sales, Reservations, and Ownership Transfer">
            <H3>Pawgress is not part of your sale</H3>
            <P>Pawgress is not a party to any sale, reservation, deposit, contract, or payment between users, and we don’t hold or guarantee money for anyone. Any deposit or payment you make goes directly to the other person, at your own risk. Disputes about an animal or a sale are between you and the other user.</P>
            <H3>Breeders and shelters must follow the law</H3>
            <P>If you list, reserve, sell, or rehome animals, you are responsible for following every law that applies to you, including:</P>
            <List accent={a} items={[
              'licensing and registration requirements (federal, state, and local)',
              'minimum ages for selling, adopting out, or transporting animals',
              'puppy lemon laws and other consumer protection laws, including required disclosures, refunds, and replacements',
              'health certificates, vaccinations, and veterinary exams',
              'transport and shipping rules, including interstate and airline requirements',
              'taxes and animal welfare laws',
            ]} />
            <P>Your listings and updates must be accurate, including each animal’s age, breed, health, parentage, and price.</P>
            <H3>Buyers should do their own checking</H3>
            <P>Before you pay a deposit or bring an animal home, check the breeder or shelter yourself: meet the animal if you can, review its health records, and get the terms of your purchase in writing.</P>
            <H3>Ownership transfer is a record, not legal title</H3>
            <P>The in-app ownership transfer moves a pet’s profile and timeline to the new owner’s account. It is a record-keeping feature only. It is not legal title, a bill of sale, a breed registration, or proof of ownership.</P>
          </Section>

          <Section accent={a} icon="📸" title="5. Your Content">
            <P>You own the photos, videos, text, records, and other content you post (“your content”).</P>
            <H3>The license you give us</H3>
            <P>You give us a worldwide, non-exclusive, royalty-free license to host, store, copy, process, transmit, display, and adapt your content (for example, resizing images or converting video) to operate, provide, and improve the Service. We may sublicense these rights to the service providers that help us run Pawgress, listed in Section 5 of our {privacyLink()}. For content you make public, such as profiles, public pet listings, litter pages and posts, and reviews, this license includes showing it to anyone, including visitors who aren’t signed in.</P>
            <P>The license ends when you delete the content or your account, except for content you already shared with other users. Deleting your account doesn’t pull back things you already shared with other people: messages you sent and updates you delivered remain in their chats and timelines, and a family keeps the timeline of a puppy they reserved. The license continues for that content.</P>
            <P strong>We will not use your content in our marketing, such as ads, app store screenshots, or social media, without asking your permission separately.</P>
            <H3>What you promise about your content</H3>
            <List accent={a} marker="check" items={[
              'you own it or have permission to post it, including from anyone shown in it',
              'it is accurate and not misleading',
              'it doesn’t break any law or anyone else’s rights',
            ]} />
          </Section>

          <Section accent={a} icon="🛡️" title="6. Community Standards: Zero Tolerance">
            <P>We have zero tolerance for objectionable content and abusive users. You may not post, send, or list:</P>
            <List accent={a} marker="cross" items={[
              'harassment, bullying, threats, or hate speech',
              'sexual content, or graphic violence, including animal cruelty',
              'illegal animal sales, or animals that are stolen, too young to be sold, or legally protected',
              'scams, fraud, fake listings, or false health claims',
              'spam, or impersonation of another person or business',
              'other people’s private information without their permission',
            ]} />
            <H3>Reporting and blocking</H3>
            <P>You can report any profile, listing, post, review, or message in the app, and you can block any user so they can no longer contact you. We review reports and act on them <Ph>[within 24 hours]</Ph>: we remove content that breaks these rules and ban the users who post it. We may also remove content or suspend accounts on our own when we believe it’s needed to protect users or animals.</P>
          </Section>

          <Section accent={a} icon="⚠️" title="7. Acceptable Use">
            <P className="font-medium">You agree not to:</P>
            <List accent={a} marker="cross" items={[
              'break any law or animal welfare regulation',
              'scrape, copy, or collect data from Pawgress by automated means',
              'reverse engineer, decompile, or tamper with the app',
              'upload malware, or interfere with Pawgress’s security or systems',
              'get around usage limits, including AI question limits, or create accounts to avoid a ban',
              'use information from Pawgress to spam or market to other users',
              'sell, rent, or transfer your account',
            ]} />
          </Section>

          <Section accent={a} icon="⭐" title="8. Reviews">
            <List accent={a} marker="check" items={[
              'Reviews must be honest and based on your own experience with that breeder or shelter.',
              'Don’t review yourself, your own business, or a competitor.',
              'Don’t write fake reviews, and don’t offer or accept payment, discounts, or other rewards for reviews.',
              'Breeders and shelters may not make a reservation, deposit, or refund depend on a review.',
            ]} />
            <P>We may remove reviews that break these rules. We don’t remove reviews just because they are negative.</P>
          </Section>

          <Section accent={a} icon="🤖" title="9. AI Features">
            <P>Astro, our AI assistant, answers pet-care questions, reads photos of vet paperwork into medical records, logs weights, and drafts messages and updates. Collar recognition matches puppies in photos and videos by collar color. Astro never sends anything on its own: a draft is only sent when you tap Send, and a record or weight is only saved when you confirm it.</P>
            <P strong>AI can make mistakes. Astro’s answers, records read from photos, collar matches, and drafted messages may be wrong and are not veterinary advice. Please check them before you save or send anything.</P>
            <P>You are responsible for anything you save or send. For a medical concern or emergency, contact a veterinarian. To provide these features, we send some of your data to OpenAI and Google, as described in Section 4 of our {privacyLink()}. AI features may have daily usage limits.</P>
          </Section>

          <Section accent={a} icon="💳" title="10. Subscriptions and Payments">
            <P>Some features require a paid subscription, sold through <Ph>[APPLE / GOOGLE IN-APP PURCHASE, STRIPE ON THE WEB, OR BOTH]</Ph>. The price and billing period are shown before you buy.</P>
            <List accent={a} items={[
              <><strong>Auto-renewal:</strong> subscriptions renew automatically at the end of each period at the then-current price, unless you cancel at least 24 hours before the period ends.</>,
              <><strong>How to cancel:</strong> on iPhone, go to Settings › your name › Subscriptions. On Android, open Google Play › Payments &amp; subscriptions › Subscriptions. For web subscriptions, <Ph>[HOW TO CANCEL A WEB SUBSCRIPTION]</Ph>. Deleting the app or your account does not cancel a subscription bought through Apple or Google.</>,
              <><strong>Free trials:</strong> a free trial becomes a paid subscription when it ends, unless you cancel at least 24 hours before it ends. Any unused part of a trial ends when you buy a subscription.</>,
              <><strong>Price changes:</strong> we will tell you about price changes in advance, as the app stores and the law require.</>,
              <><strong>Refunds:</strong> refunds for purchases made through the App Store or Google Play are handled by Apple or Google under their refund policies; we can’t issue them. For web purchases, <Ph>[WEB REFUND POLICY]</Ph>, except where the law requires otherwise.</>,
            ]} />
          </Section>

          <Section accent={a} icon="📱" title="11. App Store Terms">
            <H3>If you got Pawgress from Apple’s App Store</H3>
            <List accent={a} items={[
              'These Terms are between you and Timelines, LLC only, not Apple. We, not Apple, are responsible for the app and its content.',
              'You get a limited, non-transferable license to use the app on Apple-branded devices you own or control, as allowed by the Usage Rules in Apple’s Media Services Terms and Conditions.',
              'We, not Apple, are responsible for maintenance and support. Apple has no obligation to provide any.',
              'If the app fails to meet any warranty that can’t be disclaimed, you may notify Apple, and Apple will refund the app’s purchase price, if any. To the maximum extent the law allows, Apple has no other warranty obligation for the app.',
              'We, not Apple, are responsible for any claims about the app, including product liability claims, claims that the app fails to meet a legal or regulatory requirement, and consumer protection and privacy claims.',
              'If anyone claims the app infringes their intellectual property, we, not Apple, are responsible for investigating, defending, settling, and resolving that claim.',
              'You confirm you are not in a country subject to a U.S. Government embargo or designated as “terrorist supporting,” and you are not on any U.S. Government list of prohibited or restricted parties.',
              <>Questions, complaints, or claims about the app go to Timelines, LLC, <Ph>[MAILING ADDRESS]</Ph>, <Mail accent={a} />.</>,
              'You must follow any third-party terms that apply when you use the app, such as your wireless data agreement.',
              'Apple and its subsidiaries are third-party beneficiaries of these Terms. Once you accept them, Apple may enforce them against you.',
            ]} />
            <H3>If you got Pawgress from Google Play</H3>
            <P>Google is not a party to these Terms and is not responsible for Pawgress. Google Play’s terms apply to purchases you make there.</P>
          </Section>

          <Section accent={a} icon="💬" title="12. Electronic Communications">
            <P>You agree to receive communications from us electronically, including emails, in-app notices, and push notifications if you allow them. These satisfy any legal requirement that a communication be in writing. You can turn off push notifications in your device settings, but while you have an account we may still email you about security, legal, and account matters.</P>
          </Section>

          <Section accent={a} icon="🔒" title="13. Privacy">
            <P>Our {privacyLink()} explains what we collect and how we use it. We do not sell your personal information, and we do not show ads. You can delete your account at any time in the app under Settings, or by emailing <Mail accent={a} />.</P>
          </Section>

          <Section accent={a} icon="©️" title="14. Copyright Complaints">
            <P>We respond to notices of copyright infringement under the Digital Millennium Copyright Act. If you believe content on Pawgress infringes your copyright, send our designated copyright agent a notice that includes:</P>
            <List accent={a} items={[
              'your physical or electronic signature',
              'a description of the copyrighted work',
              'where the infringing content is on Pawgress (a link or enough detail to find it)',
              'your name, address, phone number, and email',
              'a statement that you believe in good faith the use is not authorized by the owner, its agent, or the law',
              'a statement, under penalty of perjury, that your notice is accurate and that you are the owner or authorized to act for the owner',
            ]} />
            <P>
              Copyright agent: <Ph>[COPYRIGHT AGENT NAME]</Ph>, Timelines, LLC, <Ph>[COPYRIGHT AGENT ADDRESS]</Ph>, <Mail accent={a} />
            </P>
            <P>If your content was removed and you believe it was a mistake, you can send a counter-notice to the same agent. We terminate the accounts of repeat infringers. Knowingly making a false claim can make you liable for damages.</P>
          </Section>

          <Section accent={a} icon="™️" title="15. Our App and Intellectual Property">
            <P>Pawgress, including the app, website, name, logos, and Astro, belongs to Timelines, LLC. We give you a limited, revocable, non-exclusive, non-transferable license to use the Service under these Terms. If you send us feedback or ideas, we may use them without owing you anything.</P>
          </Section>

          <Section accent={a} icon="🔚" title="16. Termination and Account Deletion">
            <P>You can delete your account at any time in the app under Settings, or by emailing <Mail accent={a} /> (see Section 7 of our {privacyLink()}). Deleting your account doesn’t pull back things you already shared with other people: messages you sent and updates you delivered remain in their chats and timelines, and a family keeps the timeline of a puppy they reserved.</P>
            <P>We may suspend or end your access if you break these Terms, if your use creates risk for other users, animals, or Pawgress, or if the law requires it.</P>
            <P>These sections continue to apply after your account ends: 4 (Animal Sales), 5 (the license for content already shared), 8 (Reviews), 9 (AI Features), 14 (Copyright), 15 (Intellectual Property), 17 (Disclaimer), 18 (Limitation of Liability), 19 (Indemnification), 20 (Disputes), and 21 (General Terms).</P>
          </Section>

          <Section accent={a} icon="⚖️" title="17. Disclaimer of Warranties">
            <Caps>The Service is provided “as is” and “as available,” without warranties of any kind, whether express, implied, or statutory, including warranties of merchantability, fitness for a particular purpose, title, non-infringement, and accuracy.</Caps>
            <Caps>We do not warrant that the Service will be uninterrupted, secure, or error-free. We make no warranty about any user, animal, listing, sale, or deposit, about the health, condition, temperament, or lineage of any animal, or about the accuracy of any AI output, including Astro’s answers, records read from photos, collar matches, and drafted messages.</Caps>
            <P>Some places don’t allow these disclaimers, so some of them may not apply to you.</P>
          </Section>

          <Section accent={a} icon="🛡️" title="18. Limitation of Liability">
            <Caps>To the maximum extent permitted by law, Timelines, LLC and its members, managers, employees, and agents will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, or goodwill, even if we were told they were possible.</Caps>
            <Caps>We are not liable for disputes between users; for any sale, reservation, deposit, or transport of an animal; for the illness, injury, or death of any animal; for content posted by users; or for AI output.</Caps>
            <Caps>Our total liability for all claims relating to the Service is limited to the greater of $100 or the amount you paid us in the 12 months before the event that gave rise to the claim.</Caps>
            <P>Some places don’t allow these limits, so some of them may not apply to you. In that case, our liability is limited to the fullest extent the law allows.</P>
          </Section>

          <Section accent={a} icon="🤲" title="19. Indemnification">
            <P>You agree to defend, indemnify, and hold harmless Timelines, LLC and its members, managers, employees, and agents from any claims, losses, damages, and costs (including reasonable attorneys’ fees) arising from:</P>
            <List accent={a} items={[
              'your content, listings, reviews, and messages',
              'any reservation, sale, deposit, transport, or delivery of an animal you are involved in',
              'your dealings with other users',
              'your breaking these Terms, any law, or anyone else’s rights',
            ]} />
            <P>We may take over the defense of a claim, and if we do, you agree to cooperate.</P>
          </Section>

          <Section accent={a} icon="🏛️" title="20. Disputes, Arbitration, and Class-Action Waiver">
            <Callout>
              <strong>Please read this section carefully.</strong> It affects how disputes between you and us are resolved. You can opt out of arbitration within 30 days (see “Opting out” below).
            </Callout>
            <H3>Try to resolve it informally first</H3>
            <P>Before starting arbitration or a lawsuit, email <Mail accent={a} /> with a description of the dispute. We will both try in good faith to resolve it within 60 days.</P>
            <H3>Binding arbitration</H3>
            <P>If we can’t resolve it, any dispute arising out of or relating to these Terms or the Service will be resolved by binding individual arbitration administered by <Ph>[ARBITRATION PROVIDER]</Ph> under its consumer arbitration rules. The Federal Arbitration Act governs this section. The arbitrator decides all questions about whether a dispute must be arbitrated. Hearings may be held by phone or video, or in the county where you live. Fees are paid as the provider’s consumer rules require.</P>
            <H3>Exceptions</H3>
            <List accent={a} items={[
              'Either of us may bring an individual claim in small claims court if it qualifies.',
              'Either of us may go to court to stop infringement or misuse of intellectual property.',
            ]} />
            <H3>Class-action and jury trial waiver</H3>
            <Caps>You and we may bring claims against each other only individually, not as a plaintiff or class member in any class, collective, or representative proceeding. You and we each waive the right to a jury trial.</Caps>
            <P>If this waiver is found unenforceable for a particular claim, that claim will be decided in court, not in arbitration, and paused until any individual claims are arbitrated.</P>
            <H3>Opting out</H3>
            <P>You can opt out of arbitration by emailing <Mail accent={a} /> within 30 days of first accepting these Terms. Include your name, the email on your account, and a statement that you opt out of arbitration. Opting out doesn’t affect anything else in these Terms. If we make a material change to this section, you can reject the change by emailing us within 30 days of it taking effect.</P>
            <H3>Governing law and venue</H3>
            <P>These Terms are governed by the laws of <Ph>[GOVERNING-LAW STATE]</Ph>, without regard to its conflict-of-law rules, except that the Federal Arbitration Act governs this section. Any claim not subject to arbitration must be brought in the state or federal courts located in <Ph>[COUNTY]</Ph>, <Ph>[STATE]</Ph>, and you and we consent to those courts’ jurisdiction.</P>
          </Section>

          <Section accent={a} icon="📜" title="21. General Terms">
            <List accent={a} items={[
              <><strong>Entire agreement:</strong> these Terms and our Privacy Policy are the whole agreement between you and us about the Service.</>,
              <><strong>Severability:</strong> if any part of these Terms is found unenforceable, the rest still applies.</>,
              <><strong>No waiver:</strong> if we don’t enforce a right, we haven’t given it up.</>,
              <><strong>Assignment:</strong> you may not transfer these Terms without our consent. We may transfer them as part of a merger, acquisition, or sale of assets.</>,
              <><strong>Force majeure:</strong> we aren’t responsible for delays or failures caused by events beyond our reasonable control, such as outages, natural disasters, or service provider failures.</>,
              <><strong>Relationship:</strong> these Terms don’t create a partnership, agency, or employment relationship.</>,
            ]} />
          </Section>

          <Section accent={a} icon="🔄" title="22. Changes to These Terms">
            <P>When we update these Terms, we will change the “Last Updated” date above. If we make a major change, we will tell you by email or with a notice in the app at least 30 days before it takes effect. If you don’t agree with a change, you can delete your account before it takes effect. If you keep using Pawgress after that date, the updated Terms apply. Changes won’t apply to a dispute that is already pending between us.</P>
          </Section>

          <Section accent={a} icon="📧" title="23. Contact" last>
            <P>For questions about these Terms, legal notices, and privacy or deletion requests, contact:</P>
            <P>
              <strong>Timelines, LLC</strong> (doing business as Pawgress)
              <br />
              <Ph>[MAILING ADDRESS]</Ph>
            </P>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full">
              <span className="text-lg">✉️</span>
              <a href="mailto:dev@pawgressapp.com" className="text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg">
                dev@pawgressapp.com
              </a>
            </div>
          </Section>

          </RevealGroup>
        </div>
      </div>
    </div>
  );
}
