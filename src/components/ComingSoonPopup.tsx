'use client';

import { useEffect } from 'react';

interface ComingSoonPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonPopup({ isOpen, onClose }: ComingSoonPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 transform transition-all animate-popup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-5xl">🎉</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-baloo">
            Now on the App Store! 🎉
          </h3>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Pawgress is live! Download from the{' '}
            <span className="font-semibold text-blue-600">App Store</span> today, or stay tuned for{' '}
            <span className="font-semibold text-blue-600">Google Play</span> coming soon.
          </p>

          {/* App Store Badges */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            {/* Apple App Store */}
            <a href="https://apps.apple.com/app/pawgress/id6752368171" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-black rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs leading-tight opacity-90">Download on the</div>
                <div className="text-base font-semibold leading-tight">App Store</div>
              </div>
            </a>
            
            {/* Google Play Store */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-black rounded-lg text-white font-medium cursor-not-allowed opacity-50 hover:opacity-60 transition-opacity" title="Coming Soon">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D7FE" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0091EA" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFD500" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00D25B" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF3A44" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C31162" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="gradientYellow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD500" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FF9E00" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path fill="url(#gradientBlue)" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5Z"/>
                <path fill="url(#gradientGreen)" d="M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12Z"/>
                <path fill="url(#gradientRed)" d="M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81Z"/>
                <path fill="url(#gradientYellow)" d="M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs leading-tight opacity-90">GET IT ON</div>
                <div className="text-base font-semibold leading-tight">Google Play</div>
                <div className="text-[10px] opacity-70 leading-tight">Coming Soon</div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Got It!
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-popup {
          animation: popup 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
