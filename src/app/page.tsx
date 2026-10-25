'use client';

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import CollarRecognition from '@/components/CollarRecognition'
import AstroHomeSection from '@/components/astro/AstroHomeSection'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <AstroHomeSection />
      <HowItWorks />
      <CollarRecognition />
      <Features />
    </main>
  );
}
