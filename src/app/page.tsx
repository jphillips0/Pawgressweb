'use client';

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import CollarRecognition from '@/components/CollarRecognition'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <CollarRecognition />
      <Features />
    </main>
  );
}
