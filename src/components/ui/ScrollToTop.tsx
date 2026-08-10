'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed z-50 flex items-center justify-center rounded-full text-white cursor-pointer
        bg-blue hover:bg-blue-dark shadow-[0_4px_14px_rgba(26,111,191,0.4)] hover:shadow-[0_8px_24px_rgba(26,111,191,0.5)]
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        /* Mobile sizing and positioning */
        w-10 h-10 bottom-5 right-5
        /* Desktop sizing and positioning */
        md:w-12 md:h-12 md:bottom-8 md:right-8
        hover:-translate-y-1 active:scale-95
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}
      `}
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
};
