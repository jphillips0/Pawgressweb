'use client';

import { Baloo_2 } from 'next/font/google';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DownloadButton from './DownloadButton';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: true,
});

export default function SharedNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-300 ${baloo.className} ${
      isScrolled ? 'px-4 py-3 sm:px-6 sm:py-4' : 'px-4 py-6 sm:px-6 sm:py-8 lg:px-8'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/">
            <img
              src="/pawgress-logo.png"
              alt="Pawgress Logo"
              className={`transition-all duration-300 ${
                isScrolled ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-12 sm:h-12'
              }`}
            />
          </Link>
          <div className="flex flex-col">
            <Link href="/" className={`font-bold text-blue-600 transition-all duration-300 leading-tight ${
              isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
            }`}>Pawgress</Link>
            <span className={`text-gray-500 transition-all duration-300 ${
              isScrolled ? 'text-[10px] sm:text-xs' : 'text-xs sm:text-sm'
            }`}>by Timelines, LLC</span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className={`hidden lg:flex items-center gap-8 text-gray-700 transition-all duration-300 ${
          isScrolled ? 'text-base' : 'text-lg'
        }`}>
          <Link href="/" className={`hover:text-blue-600 transition-colors font-medium ${pathname === '/' ? 'text-blue-600' : ''}`}>
            Home
          </Link>
          <Link href="/for-buyers" className={`hover:text-blue-600 transition-colors font-medium ${pathname === '/for-buyers' ? 'text-blue-600' : ''}`}>
            For Buyers
          </Link>
          <Link href="/for-breeders" className={`hover:text-blue-600 transition-colors font-medium ${pathname === '/for-breeders' ? 'text-blue-600' : ''}`}>
            For Breeders
          </Link>
          <Link href="/pricing" className={`hover:text-blue-600 transition-colors font-medium ${pathname === '/pricing' ? 'text-blue-600' : ''}`}>
            Pricing
          </Link>
          <Link href="/contact" className={`hover:text-blue-600 transition-colors font-medium ${pathname === '/contact' ? 'text-blue-600' : ''}`}>
            Contact
          </Link>
          
          {/* About Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button className={`hover:text-blue-600 transition-colors font-medium flex items-center gap-1 ${pathname === '/about' || pathname === '/mission' || pathname === '/terms' || pathname === '/privacy' || pathname === '/faq' ? 'text-blue-600' : ''}`}>
              About
              <svg className={`w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 pt-2 transition-all duration-200 origin-top ${aboutDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
              <div className="w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                <Link href="/about" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                  About Us
                </Link>
                <Link href="/mission" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                  Our Mission
                </Link>
                <Link href="/faq" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                  FAQ
                </Link>
                <Link href="/terms" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Sign Up Button and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <DownloadButton className={`hidden sm:block relative bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-medium overflow-hidden group hover:scale-110 hover:shadow-2xl hover:-translate-y-1 ${
            isScrolled ? 'px-5 py-2 sm:px-6 sm:py-2.5 text-base' : 'px-6 py-3 sm:px-8 sm:py-3 text-lg'
          }`}>
            <span className="relative z-10 group-hover:animate-pulse">Download App</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </DownloadButton>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="px-4 py-6 space-y-4">
            <Link 
              href="/" 
              className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${pathname === '/' ? 'text-blue-600' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/for-buyers" 
              className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${pathname === '/for-buyers' ? 'text-blue-600' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              For Buyers
            </Link>
            <Link 
              href="/for-breeders" 
              className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${pathname === '/for-breeders' ? 'text-blue-600' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              For Breeders
            </Link>
            <Link 
              href="/pricing" 
              className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${pathname === '/pricing' ? 'text-blue-600' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/contact" 
              className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 ${pathname === '/contact' ? 'text-blue-600' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* About Section in Mobile */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm font-semibold text-gray-500 mb-2 px-2">About</p>
              <Link 
                href="/about" 
                className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 pl-4 ${pathname === '/about' ? 'text-blue-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/mission" 
                className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 pl-4 ${pathname === '/mission' ? 'text-blue-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Mission
              </Link>
              <Link 
                href="/faq" 
                className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 pl-4 ${pathname === '/faq' ? 'text-blue-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/terms" 
                className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 pl-4 ${pathname === '/terms' ? 'text-blue-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Terms of Service
              </Link>
              <Link 
                href="/privacy" 
                className={`block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 pl-4 ${pathname === '/privacy' ? 'text-blue-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacy Policy
              </Link>
            </div>
            
            <DownloadButton className="block w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium text-center sm:hidden">
              Download on the App Store
            </DownloadButton>
          </div>
        </div>
      )}
      
    </nav>
  );
}