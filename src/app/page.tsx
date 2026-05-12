'use client';

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <Features />
    </main>
  );
}
