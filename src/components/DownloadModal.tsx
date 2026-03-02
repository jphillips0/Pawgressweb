'use client';

import { useEffect } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/app/pawgress/id6752368171';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full sm:max-w-md sm:mx-4 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-popup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 pt-10 pb-16 text-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -right-6 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute top-4 right-10 w-6 h-6 bg-white/20 rounded-full" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo / icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4">
            <img src="/pawgress-logo.png" alt="Pawgress" className="w-14 h-14 object-contain" />
          </div>

          <h3 className="text-2xl font-bold text-white font-baloo leading-tight">
            Pawgress is live!
          </h3>
          <p className="text-blue-100 text-sm mt-1">
            Now available on the App Store
          </p>
        </div>

        {/* White card body — overlaps header */}
        <div className="relative -mt-6 bg-white rounded-t-3xl px-6 pt-6 pb-8">
          {/* Pill handle */}
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />

          <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed">
            Track milestones, share updates, and stay connected with your pet's journey — all in one place.
          </p>

          {/* Store buttons */}
          <div className="flex flex-col gap-3">
            {/* App Store — live */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-5 py-4 bg-black rounded-2xl text-white hover:bg-gray-900 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-black/20"
            >
              <svg className="w-9 h-9 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <div className="flex-1 text-left">
                <div className="text-[11px] leading-tight text-gray-400">Download on the</div>
                <div className="text-lg font-semibold leading-tight tracking-tight">App Store</div>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Google Play — coming soon */}
            <div className="relative flex items-center gap-4 px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 cursor-not-allowed select-none overflow-hidden">
              {/* Coming soon badge */}
              <span className="absolute top-2.5 right-3 text-[10px] font-semibold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full tracking-wide uppercase">
                Coming soon
              </span>

              <svg className="w-9 h-9 flex-shrink-0 opacity-40" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="gpB" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D7FE" />
                    <stop offset="100%" stopColor="#0091EA" />
                  </linearGradient>
                  <linearGradient id="gpG" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFD500" />
                    <stop offset="100%" stopColor="#00D25B" />
                  </linearGradient>
                  <linearGradient id="gpR" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF3A44" />
                    <stop offset="100%" stopColor="#C31162" />
                  </linearGradient>
                  <linearGradient id="gpY" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD500" />
                    <stop offset="100%" stopColor="#FF9E00" />
                  </linearGradient>
                </defs>
                <path fill="url(#gpB)" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5Z" />
                <path fill="url(#gpG)" d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z" />
                <path fill="url(#gpR)" d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z" />
                <path fill="url(#gpY)" d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left pr-16">
                <div className="text-[11px] leading-tight">Get it on</div>
                <div className="text-lg font-semibold leading-tight tracking-tight">Google Play</div>
              </div>
            </div>
          </div>

          {/* Divider + footnote */}
          <p className="text-center text-xs text-gray-400 mt-5">
            Free to download &nbsp;·&nbsp; iOS 16+ required
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes popup {
          0%   { opacity: 0; transform: translateY(24px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .animate-popup { animation: popup 0.28s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  );
}
