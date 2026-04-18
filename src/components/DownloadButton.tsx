'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DownloadModal from './DownloadModal';

const APP_STORE_URL = 'https://apps.apple.com/app/pawgress/id6752368171';

type Platform = 'ios' | 'android' | 'web';

interface DownloadButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function DownloadButton({ className, children }: DownloadButtonProps) {
  const [platform, setPlatform] = useState<Platform>('web');
  const [showWebModal, setShowWebModal] = useState(false);
  const [showAndroidPopup, setShowAndroidPopup] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua)) {
      setPlatform('ios');
    } else if (/Android/i.test(ua)) {
      setPlatform('android');
    }
    // else stays 'web'
  }, []);

  // iOS — direct link to App Store, no intermediate step
  if (platform === 'ios') {
    return (
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  // Android — Coming Soon popup
  if (platform === 'android') {
    return (
      <>
        <button onClick={() => setShowAndroidPopup(true)} className={className}>
          {children}
        </button>

        {showAndroidPopup && typeof document !== 'undefined' && createPortal((
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAndroidPopup(false)}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-8 text-center animate-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAndroidPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-5xl">🐾</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-baloo">
                Coming Soon to Google Play
              </h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                We're working hard to bring Pawgress to Android. In the meantime, ask a friend with an iPhone to share their experience!
              </p>

              <button
                onClick={() => setShowAndroidPopup(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
              >
                Got It!
              </button>
            </div>

            <style jsx>{`
              @keyframes popup {
                0%   { opacity: 0; transform: scale(0.9) translateY(-16px); }
                100% { opacity: 1; transform: scale(1)   translateY(0);     }
              }
              .animate-popup { animation: popup 0.25s ease-out; }
            `}</style>
          </div>
        ), document.body)}
      </>
    );
  }

  // Web / desktop — modal with both store options
  return (
    <>
      <button onClick={() => setShowWebModal(true)} className={className}>
        {children}
      </button>
      <DownloadModal isOpen={showWebModal} onClose={() => setShowWebModal(false)} />
    </>
  );
}
