import React from 'react';
import Link from 'next/link';
import SharedNav from '@/components/SharedNav';
import { Baloo_2 } from 'next/font/google';
import { PageTransition, RevealGroup } from '@/components/motion';
import { H3, List, Mail, P, Ph, Section } from '@/components/legal/LegalBlocks';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
});

const a = 'privacy' as const;

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
            Last Updated: October 25, 2026
          </p>
        </PageTransition>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 pb-16 sm:pb-20">
        <div className="backdrop-blur-sm bg-white/80 border border-white/50 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xl">
          <RevealGroup>

          {/* Introduction */}
          <div className="mb-8 sm:mb-12 p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              Pawgress is operated by <strong className="text-purple-600">Timelines, LLC</strong>, a <Ph>[STATE OF FORMATION]</Ph> limited liability company doing business as Pawgress (“Pawgress,” “we,” “our,” “us”). This Privacy Policy explains what information we collect when you use the Pawgress app for iOS and Android and our website, pawgressapp.com, how we use it, who we share it with, and the choices you have.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              The short version: we use your information to run Pawgress. We do not sell your personal information, and we do not show ads. Pawgress is for adults 18 and older. This policy works together with our <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-semibold">Terms of Service</Link>.
            </p>
          </div>

          <Section accent={a} icon="📋" title="1. Information We Collect">
            <P>Pawgress connects breeders and shelters with the families who reserve their animals, and helps pet owners keep records for their own pets. There are three account types: breeder, shelter, and pet owner (buyer). Here is what we collect.</P>

            <H3>Account and profile</H3>
            <List accent={a} items={[
              'Your name and email address',
              'Your phone number, if you choose to add one',
              'Your profile photo and bio',
              'Your account type, and for breeders and shelters, your kennel or shelter name, the location you enter on your profile, and any social media links you add',
            ]} />

            <H3>Sign in with Apple or Google</H3>
            <List accent={a} items={[
              'If you sign in with Apple or Google, we receive your name, email address (or an Apple private relay address if you choose to hide your email), and an account identifier from that company. We never receive your Apple or Google password.',
            ]} />

            <H3>Pets, litters, and updates</H3>
            <List accent={a} items={[
              'Pet details such as name, breed, sex, birth date, collar color, parentage, price, and reservation status',
              'Litter information, pickup dates, and public pet listings',
              'Photos, videos, captions, and updates you post',
              'Weight logs',
            ]} />

            <H3>Pet medical records and health profile</H3>
            <List accent={a} items={[
              'Medical records such as vaccines, medications, and vet visits, and photos of vet paperwork you upload',
              'A pet health profile, which can include allergies, conditions, spay or neuter status, blood type, vet clinic, insurance provider and policy number, microchip details, and diet',
            ]} />
            <P>Medical records and photos of vet paperwork are stored privately. Only the pet’s owner and the family linked to that pet can see them.</P>

            <H3>Messages</H3>
            <List accent={a} items={['Chat messages, the photos and videos you send in chat, and reactions to messages']} />

            <H3>Puppy applications</H3>
            <List accent={a} items={[
              'The questions a breeder asks and the answers a family gives. Answers can include personal details about your home and household, such as who lives with you, other pets, your yard, and your schedule. Your answers are shared with the breeder you apply to.',
            ]} />

            <H3>Your activity in the app</H3>
            <List accent={a} items={['Reviews you write, and the pets and profiles you swipe on, like, bookmark, or follow', 'Inquiries you send about public pet listings']} />

            <H3>Location (only with your permission)</H3>
            <P>If you allow it, we use your device’s GPS at an accuracy of roughly 100 meters to show pets and litters near you. You can turn this off at any time in your device settings, and Pawgress still works without it. <Ph>[CONFIRM: whether we store this location, and if so, for how long]</Ph></P>

            <H3>Microphone (only with your permission)</H3>
            <P>If you allow it, we record audio while you hold the talk button to speak to Astro, our AI assistant. The audio clip is sent to OpenAI to be turned into text (see Section 4). <Ph>[CONFIRM: whether we store voice clips after transcription]</Ph></P>

            <H3>Notifications</H3>
            <List accent={a} items={['A push notification token for your device, so we can send you alerts you’ve allowed']} />

            <H3>Subscriptions and purchases</H3>
            <List accent={a} items={[
              <>Your subscription status, plan, and renewal dates, from <Ph>[APPLE / GOOGLE IN-APP PURCHASE, STRIPE ON THE WEB, OR BOTH]</Ph>. We do not receive or store your full card number.</>,
            ]} />

            <H3>Device and diagnostic information</H3>
            <List accent={a} items={[
              'Device type, operating system, and app version',
              'IP address',
              'Crash reports and error logs',
              'Usage analytics, such as which screens and features you use',
            ]} />

            <H3>When you contact us</H3>
            <List accent={a} items={['The content of emails and support requests you send us']} />
          </Section>

          <Section accent={a} icon="🎯" title="2. How We Use Your Information">
            <P className="font-medium">We use your information to:</P>
            <List accent={a} marker="check" items={[
              'create and run your account, and sign you in',
              'show your profile, listings, litters, and posts',
              'deliver updates to the right families: one post can reach several chats, pet timelines, and a litter feed',
              'run chat, puppy applications, inquiries, reviews, and in-app ownership transfer',
              'provide the AI features you choose to use (see Section 4)',
              'show nearby pets and litters, if you allow location',
              'send notifications you have allowed',
              'manage subscriptions',
              'keep Pawgress safe: review reports, block abuse, prevent fraud, and enforce our Terms of Service',
              'find and fix bugs and crashes, and understand how Pawgress is used so we can improve it',
              'answer your questions and support requests',
              'meet legal obligations',
            ]} />
            <P strong>We do not use your information to show you ads, and we do not sell it.</P>
          </Section>

          <Section accent={a} icon="🌐" title="3. What’s Public and What’s Private">
            <H3>Public</H3>
            <P>These can be seen by anyone, including people who aren’t signed in and visitors to our website. Public pages may also appear in search engine results.</P>
            <List accent={a} items={[
              'Breeder and shelter profiles, including name, photo, bio, location, social links, and ratings',
              'Public pet listings',
              'Litter pages and litter posts',
              'Reviews, shown with the reviewer’s name and profile photo',
            ]} />
            <H3>Private</H3>
            <P>These are visible only to you and the people you share them with:</P>
            <List accent={a} items={[
              'Chat messages, visible to the people in that conversation',
              'Updates sent to a family, visible in that family’s chat and the pet’s timeline',
              'Medical records, photos of vet paperwork, and the pet health profile, visible to the pet’s owner and the linked family',
              'Puppy application answers, visible to you and the breeder you applied to',
              'Your email address, phone number, and location',
            ]} />
            <P>Please think before you post something publicly. Once content is public, others may have seen, saved, or shared it.</P>
          </Section>

          <Section accent={a} icon="🤖" title="4. AI Features: Astro and Collar Recognition">
            <P>Pawgress has two AI features. Both send some of your data to outside AI providers so the feature can work.</P>

            <H3>Astro, the AI assistant</H3>
            <P>Astro answers pet-care questions, reads photos of vet paperwork into medical records, logs weights, and drafts messages and updates for breeders. Astro never sends anything on its own: a draft is only sent when you tap Send, and a record or weight is only saved when you confirm it.</P>
            <P>When you use Astro, we send <strong>OpenAI</strong>:</P>
            <List accent={a} items={[
              'your question or request, and your conversation with Astro',
              'for the pet you’ve selected: its breed, age, weight history, medical records, and photos of vet paperwork',
              'any photo you give Astro to read, such as a vaccine card or weigh sheet',
              'when you ask Astro to draft a message, the details it needs to write it, such as the pet’s and family’s names',
              'voice clips, if you use hold-to-talk, so they can be turned into text',
            ]} />

            <H3>Collar recognition</H3>
            <P>Collar recognition matches the puppies in your photos and videos by the color of their collars, so an update reaches the right families.</P>
            <List accent={a} items={[
              <>Photos are sent to <strong>OpenAI</strong> to identify collar colors.</>,
              <>Frames from videos are sent to <strong>Google Gemini</strong> to identify collar colors.</>,
            ]} />

            <H3>How these providers use your data</H3>
            <P>We send this data only to provide the feature you are using. How long the providers keep it, and whether they may use it to train their models, is set by their terms:</P>
            <List accent={a} items={[
              <>OpenAI: <Ph>[OPENAI RETENTION PERIOD AND TRAINING TERMS]</Ph></>,
              <>Google Gemini: <Ph>[GOOGLE GEMINI RETENTION PERIOD AND TRAINING TERMS]</Ph></>,
            ]} />
            <P>AI can make mistakes. Astro’s answers, records read from photos, collar matches, and drafted messages may be wrong and are not veterinary advice. Please check them before you save or send anything. Our Terms of Service say more about this.</P>
          </Section>

          <Section accent={a} icon="🤝" title="5. Service Providers and Other Sharing">
            <P>We use these companies to run Pawgress. Each receives only what it needs to do its job for us:</P>
            <List accent={a} items={[
              <><strong>Supabase</strong>: our database, sign-in system, and file storage. It holds your account, profile, pets, records, photos, videos, and other app data.</>,
              <><strong>Stream</strong>: chat. It receives chat messages, reactions, and the photos and videos sent in chat.</>,
              <><strong>OpenAI</strong>: Astro and collar recognition, as described in Section 4.</>,
              <><strong>Google Gemini</strong>: video frames for collar recognition, as described in Section 4.</>,
              <><strong>PostHog</strong>: product analytics, such as which screens and features are used.</>,
              <><strong>Sentry</strong>: crash and error reports, linked to your user ID and account type so we can fix problems.</>,
              <><strong>Apple and Google</strong>: Sign in with Apple, Google Sign-In, and push notifications.</>,
              <><strong>Vercel</strong>: hosting for our website.</>,
              <><strong><Ph>[APPLE / GOOGLE / STRIPE]</Ph></strong>: subscription purchases and billing.</>,
            ]} />
            <P>We may also share information:</P>
            <List accent={a} marker="muted" items={[
              'with other users, when you post, message, apply, review, or transfer ownership, as described in Section 3',
              'when required by law, such as a subpoena or court order',
              'to protect the safety, rights, or property of our users, the public, animals, or Pawgress',
              'with a buyer or successor if Pawgress is part of a merger, acquisition, or sale of assets. We would tell you before your information becomes subject to a different privacy policy.',
              'with your permission',
            ]} />
          </Section>

          <Section accent={a} icon="🚫" title="6. No Selling and No Ads">
            <P strong>We do not sell your personal information. We do not share it for cross-context behavioral advertising, and we do not show ads in Pawgress.</P>
          </Section>

          <Section accent={a} id="delete-account" icon="🗑️" title="7. Deleting Your Account">
            <P>You can delete your Pawgress account at any time. Direct link to these instructions: <strong>pawgressapp.com/delete-account</strong></P>
            <H3>In the app (fastest)</H3>
            <List accent={a} marker="check" items={[
              'Open Pawgress and sign in',
              <>Go to <strong>Settings</strong> and tap <strong>Delete Account</strong></>,
              'Confirm',
            ]} />
            <H3>By email (if you can’t use the app)</H3>
            <P>Email <Mail accent={a} /> from the address on your account with the subject “Delete my account.” We may ask you to confirm the request. We complete email requests within 30 days.</P>

            <H3>What is deleted</H3>
            <P>Your account, profile, and the pets, posts, photos, videos, records, and other content stored in your account are deleted from our live systems within 30 days. Copies in backups are removed as backups expire, within <Ph>[BACKUP RETENTION PERIOD]</Ph>.</P>

            <H3>What stays with other people</H3>
            <P>Deleting your account doesn’t pull back things you already shared with other people:</P>
            <List accent={a} items={[
              'Messages you sent and updates you delivered to other users remain in their chats and timelines.',
              'A family keeps the timeline of a puppy they reserved, including updates, photos, videos, and weight logs the breeder already shared with them.',
              'After an in-app ownership transfer, the pet’s profile and timeline belong to the new owner.',
            ]} />

            <H3>What we may keep</H3>
            <List accent={a} items={[
              'Records of purchases, as required for tax and accounting',
              'Information needed to resolve disputes, enforce our Terms, or meet legal obligations',
              'Records of abuse reports and bans, to stop banned users from coming back',
            ]} />
            <P>You can also delete individual posts, photos, videos, and records in the app at any time without deleting your account.</P>
          </Section>

          <Section accent={a} icon="⏱️" title="8. How Long We Keep Information">
            <List accent={a} items={[
              <><strong>Account, profile, pets, posts, media, and records:</strong> until you delete them or your account, then removed within 30 days (subject to the shared-content rules in Section 7)</>,
              <><strong>Chat messages:</strong> until the conversation or your account is deleted. Copies delivered to others stay with them.</>,
              <><strong>Puppy applications:</strong> until the breeder or the applicant deletes their account <Ph>[CONFIRM]</Ph></>,
              <><strong>Location:</strong> <Ph>[CONFIRM: not stored / stored for X]</Ph></>,
              <><strong>Voice clips:</strong> <Ph>[CONFIRM: not stored after transcription / stored for X]</Ph></>,
              <><strong>Push tokens:</strong> until you sign out, turn off notifications, or delete your account</>,
              <><strong>Crash reports (Sentry):</strong> up to <Ph>[SENTRY RETENTION, e.g. 90 days]</Ph></>,
              <><strong>Analytics (PostHog):</strong> up to <Ph>[POSTHOG RETENTION]</Ph></>,
              <><strong>Backups:</strong> up to <Ph>[BACKUP RETENTION PERIOD]</Ph></>,
              <><strong>Purchase records:</strong> as long as tax and accounting law requires</>,
            ]} />
            <P>We may keep information longer if the law requires it or if it’s needed for an active dispute or investigation.</P>
          </Section>

          <Section accent={a} icon="🔒" title="9. Security">
            <P>We protect your information with encryption in transit, encryption at rest by our hosting providers, access controls that limit who can see each record, and private storage for medical records and vet paperwork. No system is perfectly secure, so we can’t guarantee absolute security. If a breach affects your personal information, we will notify you as the law requires.</P>
          </Section>

          <Section accent={a} icon="⚙️" title="10. Your Choices">
            <List accent={a} marker="check" items={[
              'Edit your profile and pet information in the app',
              'Delete individual posts, photos, videos, and records',
              'Turn location, microphone, camera, photo library, and notification permissions on or off in your device settings',
              <>Ask for a copy of your information by emailing <Mail accent={a} /></>,
              'Delete your account (see Section 7)',
            ]} />
          </Section>

          <Section accent={a} icon="🇺🇸" title="11. US State Privacy Rights">
            <P>Residents of California, Colorado, Connecticut, Virginia, Utah, Texas, Oregon, and other states with similar laws have rights over their personal information. We offer these rights to all Pawgress users in the US:</P>
            <List accent={a} marker="check" items={[
              <><strong>Know and access:</strong> ask what personal information we have about you and get a copy</>,
              <><strong>Delete:</strong> ask us to delete your personal information (see Section 7)</>,
              <><strong>Correct:</strong> ask us to fix inaccurate information</>,
              <><strong>Opt out of sale, sharing, and targeted advertising:</strong> we don’t do any of these, so there is nothing to opt out of</>,
              <><strong>No discrimination:</strong> we won’t treat you differently for using any of these rights</>,
            ]} />
            <H3>What we collect, in legal terms</H3>
            <P>In the past 12 months we have collected these categories of personal information, all for the purposes in Section 2: identifiers (name, email, phone, account IDs, IP address); customer records; commercial information (subscriptions); internet or app activity (usage analytics, crash reports); geolocation (if you allow it); audio (hold-to-talk, if you allow it); photos and videos; and content of messages and applications. We get this information from you, your device, and other users (for example, when a breeder adds a pet you’ve reserved). We disclosed these categories to the service providers in Section 5 for business purposes. We have not sold or shared personal information.</P>
            <P>Some of this is “sensitive personal information” under certain state laws: your account login, your precise location (if you allow location), and some puppy application answers about your household. We use it only to provide Pawgress, not to infer things about you.</P>
            <H3>How to make a request</H3>
            <P>Email <Mail accent={a} /> or use the in-app options. We will confirm your identity by matching your request to the email on your account, and respond within 45 days (we’ll tell you if we need up to 45 more). You can use an authorized agent if you give them signed permission. If we deny your request, you can appeal by replying with “Appeal” in the subject line. We will respond within 60 days, and if you’re not satisfied you can contact your state attorney general.</P>
          </Section>

          <Section accent={a} icon="🇪🇺" title="12. Users in the EU and UK">
            <P><Ph>[IF WE DO NOT ACCEPT USERS IN THE EU, EEA, OR UK, DELETE THIS SECTION]</Ph></P>
            <P>If you are in the European Economic Area or the United Kingdom, Timelines, LLC is the controller of your personal information.</P>
            <H3>Legal bases</H3>
            <List accent={a} items={[
              <><strong>Contract:</strong> to provide your account and the features you use</>,
              <><strong>Consent:</strong> for location, microphone, and push notifications. You can withdraw consent at any time in your device settings.</>,
              <><strong>Legitimate interests:</strong> to keep Pawgress secure, fix crashes, understand usage, and prevent abuse</>,
              <><strong>Legal obligation:</strong> to meet tax, accounting, and other legal requirements</>,
            ]} />
            <H3>Your rights</H3>
            <P>You have the right to access, correct, delete, restrict, or move your information, and to object to processing based on legitimate interests. You can also complain to your local data protection authority (in the UK, the Information Commissioner’s Office).</P>
            <H3>International transfers</H3>
            <P>Pawgress is based in the United States, and your information is processed there. When we transfer information from the EEA or UK, we rely on the European Commission’s Standard Contractual Clauses (with the UK Addendum), or on the EU-U.S. Data Privacy Framework where a provider is certified.</P>
            <P>EU representative: <Ph>[EU REPRESENTATIVE, IF REQUIRED]</Ph>. UK representative: <Ph>[UK REPRESENTATIVE, IF REQUIRED]</Ph>.</P>
          </Section>

          <Section accent={a} icon="🍪" title="13. Cookies, Do Not Track, and Global Privacy Control">
            <P>Our website uses cookies and similar storage only where needed to work, for example to keep you signed in while you reset your password. <Ph>[CONFIRM: whether PostHog or other analytics run on the website]</Ph> We do not use advertising cookies.</P>
            <P><strong>Do Not Track:</strong> there is no common standard for Do Not Track signals, so our website doesn’t respond to them. We don’t track you across other companies’ websites or apps.</P>
            <P><strong>Global Privacy Control:</strong> we treat a Global Privacy Control signal as a request to opt out of the sale or sharing of your information. We don’t sell or share it in the first place.</P>
          </Section>

          <Section accent={a} icon="🔞" title="14. Age Requirement">
            <P>Pawgress is only for people 18 and older, the same age requirement as our Terms of Service, because it involves reserving and buying animals. We do not knowingly collect information from anyone under 18. If we learn that we have, we will delete it. If you believe a minor is using Pawgress, contact <Mail accent={a} />.</P>
          </Section>

          <Section accent={a} icon="🔄" title="15. Changes to This Policy">
            <P>When we update this policy, we will change the “Last Updated” date above. If we make a major change, such as collecting new kinds of information or using it in a new way, we will tell you by email or with a notice in the app at least 30 days before the change takes effect. If you don’t agree with a change, you can delete your account.</P>
          </Section>

          <Section accent={a} icon="📧" title="16. Contact" last>
            <P>For privacy questions, requests to access or delete your information, and legal notices, contact:</P>
            <P>
              <strong>Timelines, LLC</strong> (doing business as Pawgress)
              <br />
              <Ph>[MAILING ADDRESS]</Ph>
            </P>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-full">
              <span className="text-lg">✉️</span>
              <a href="mailto:dev@pawgressapp.com" className="text-purple-600 hover:text-purple-700 font-semibold text-base sm:text-lg">
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
