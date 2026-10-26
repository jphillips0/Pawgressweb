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
          // Liquid glass pill, matching the header: the page stays visible through it.
          className="lg:hidden fixed left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-sm z-[60] flex items-center gap-2.5 rounded-full border pl-1.5 pr-1.5 py-1.5 font-inter"
          style={{
            bottom: 'calc(12px + env(safe-area-inset-bottom))',
            background: 'rgba(255,255,255,0.42)',
            backdropFilter: 'blur(14px) saturate(180%)',
            WebkitBackdropFilter: 'blur(14px) saturate(180%)',
            borderColor: 'rgba(255,255,255,0.6)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 28px -12px rgba(30,27,75,0.35)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/app-icon.png" alt="" className="w-9 h-9 rounded-full shrink-0" />
          <div className="flex-1 min-w-0 leading-tight">
            <div className="font-semibold text-[14px] text-gray-900 truncate">Pawgress</div>
            <div className="text-[11.5px] text-gray-700 truncate">iOS &amp; Android</div>
          </div>
          <DownloadButton className="shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/30">
            Get the app
          </DownloadButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
