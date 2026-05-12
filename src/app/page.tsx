'use client';

import Link from 'next/link'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* TEMP: dev shortcut to the password reset page. Remove before launch. */}
      <Link
        href="/reset-password?preview=1"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          background: '#FF6B9D',
          color: '#fff',
          padding: '10px 16px',
          borderRadius: 999,
          fontWeight: 700,
          fontSize: 14,
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        TEMP: Reset Password
      </Link>
      <Hero />
      <HowItWorks />
      <Features />
    </main>
  );
}
