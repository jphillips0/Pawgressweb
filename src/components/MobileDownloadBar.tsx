'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DownloadButton from './DownloadButton';

/** Phone-only download bar: appears after the hero, hides near the bottom of the page. */
export default function MobileDownloadBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 1400;
      setShow(window.scrollY > 700 && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="lg:hidden fixed inset-x-3 z-[60] flex items-center gap-3 rounded-[22px] border border-white/15 px-3 py-2.5 font-inter"
          style={{ bottom: 'calc(12px + env(safe-area-inset-bottom))', background: 'rgba(17,16,40,0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 18px 40px -16px rgba(0,0,0,0.6)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/app-icon.png" alt="" className="w-11 h-11 rounded-xl" />
          <div className="flex-1 min-w-0 leading-tight">
            <div className="text-white font-semibold text-[15px]">Pawgress</div>
            <div className="text-white/60 text-xs whitespace-nowrap">Free download · iOS &amp; Android</div>
          </div>
          <DownloadButton className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30">
            Get the app
          </DownloadButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
