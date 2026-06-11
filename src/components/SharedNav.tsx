'use client';

import { Baloo_2 } from 'next/font/google';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import DownloadButton from './DownloadButton';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
});

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/for-buyers', label: 'For Buyers' },
  { href: '/for-breeders', label: 'For Breeders' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

const ABOUT_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/mission', label: 'Our Mission' },
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const, when: 'afterChildren' as const },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
      when: 'beforeChildren' as const,
      staggerChildren: 0.04,
    },
  },
};

const mobileItemVariants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function SharedNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAboutActive = ABOUT_LINKS.some((l) => pathname === l.href);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${baloo.className} ${
        isScrolled
          ? 'px-4 py-2.5 sm:px-6 sm:py-3 bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-900/5 border-b border-white/60'
          : 'px-4 py-5 sm:px-6 sm:py-6 lg:px-8 bg-white/60 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" aria-label="Pawgress home">
            <motion.img
              src="/pawgress-logo.png"
              alt="Pawgress Logo"
              whileHover={{ rotate: -8, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className={`transition-all duration-300 ${
                isScrolled ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12'
              }`}
            />
          </Link>
          <div className="flex flex-col">
            <Link
              href="/"
              className={`font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 leading-tight ${
                isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
              }`}
            >
              Pawgress
            </Link>
            <span
              className={`text-gray-500 transition-all duration-300 ${
                isScrolled ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'
              }`}
            >
              by Timelines, LLC
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div
          className={`hidden lg:flex items-center gap-2 text-gray-700 transition-all duration-300 ${
            isScrolled ? 'text-base' : 'text-lg'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full font-medium transition-colors hover:text-blue-600 ${
                  active ? 'text-blue-600' : ''
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-blue-50 border border-blue-100"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              className={`relative px-3 py-1.5 rounded-full font-medium transition-colors hover:text-blue-600 flex items-center gap-1 ${
                isAboutActive ? 'text-blue-600' : ''
              }`}
            >
              {isAboutActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-blue-50 border border-blue-100"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">About</span>
              <motion.svg
                className="relative z-10 w-4 h-4"
                animate={{ rotate: aboutDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {aboutDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 pt-2 origin-top"
                >
                  <div className="w-52 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden p-1.5">
                    {ABOUT_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium ${
                          pathname === link.href ? 'text-blue-600 bg-blue-50' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side - Download Button and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="hidden sm:block"
          >
            <DownloadButton
              className={`relative inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold overflow-hidden group shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-shadow duration-300 ${
                isScrolled ? 'px-5 py-2 sm:px-6 sm:py-2.5 text-base' : 'px-6 py-3 sm:px-8 sm:py-3 text-lg'
              }`}
            >
              <span className="relative z-10">Download App</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </DownloadButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl shadow-blue-900/10 z-40 overflow-hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} variants={mobileItemVariants}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium ${
                      pathname === link.href ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* About Section in Mobile */}
              <motion.div variants={mobileItemVariants} className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm font-semibold text-gray-500 mb-2 px-3">About</p>
              </motion.div>
              {ABOUT_LINKS.map((link) => (
                <motion.div key={link.href} variants={mobileItemVariants}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-3 py-2.5 pl-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium ${
                      pathname === link.href ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={mobileItemVariants} className="pt-4 sm:hidden">
                <DownloadButton className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3.5 rounded-full font-semibold text-center shadow-lg shadow-blue-600/25">
                  Download the App
                </DownloadButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
