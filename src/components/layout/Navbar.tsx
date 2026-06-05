'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const [activeLang, setActiveLang] = useState('EN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background shadow/blur when scrolled down
      setIsScrolled(currentScrollY > 20);

      // Auto-hide logic (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu when hiding
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About', href: '#' },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 flex justify-center pt-4 sm:pt-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'
      } px-4 md:px-8 pointer-events-none`}
    >
      <nav 
        className={`w-full max-w-[1200px] transition-all duration-500 ease-out rounded-full border pointer-events-auto ${
          isScrolled 
            ? 'bg-white/85 backdrop-blur-xl border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-1.5' 
            : 'bg-white/95 backdrop-blur-md border-light-gray/50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] py-2'
        }`}
      >
        <div className="h-[52px] px-5 md:px-7 flex items-center justify-between gap-6">
          <Link href="/" className="font-plus-jakarta font-bold text-[20px] md:text-[22px] text-blue flex-shrink-0 no-underline tracking-tight transition-transform hover:scale-105 active:scale-95 duration-200">
            MediInfo<span className="text-teal">.LK</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-1.5 bg-off-white/40 p-1 rounded-full border border-light-gray/30">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.label}
                  href={link.href}
                  className={`relative px-5 py-1.5 text-[14px] font-bold rounded-full transition-all duration-300 no-underline border-none ${
                    isActive 
                      ? 'text-white bg-blue shadow-[0_4px_12px_rgba(26,111,191,0.3)]' 
                      : 'bg-transparent text-mid-gray hover:text-dark-gray hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex bg-off-white/80 rounded-full p-1 gap-1 border border-light-gray/50">
              {['EN', 'සි', 'த'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 border-none cursor-pointer rounded-full text-[12px] font-bold transition-all duration-300 ${
                    activeLang === lang 
                      ? 'bg-white text-blue shadow-sm' 
                      : 'bg-transparent text-mid-gray hover:text-dark-gray'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <Button variant="login" className="rounded-full px-6 py-2 text-[14px] h-[38px] font-bold shadow-[0_4px_12px_rgba(26,111,191,0.2)]">Login</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -mr-2 text-dark-gray bg-off-white/50 border border-light-gray/30 cursor-pointer hover:bg-off-white rounded-full transition-colors flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`absolute top-[80px] sm:top-[90px] left-4 right-4 max-w-[1200px] mx-auto bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-400 origin-top pointer-events-auto md:hidden ${
        isMobileMenuOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
      }`}>
        <div className="flex flex-col p-4 gap-3">
          <div className="flex flex-col gap-1.5 bg-off-white/40 p-2 rounded-2xl border border-light-gray/30">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-5 py-3.5 rounded-xl text-[15px] font-bold transition-all no-underline flex items-center ${
                    isActive 
                      ? 'bg-blue text-white shadow-[0_4px_12px_rgba(26,111,191,0.25)]' 
                      : 'text-dark-gray hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          <div className="flex flex-col gap-3 px-2 pb-2 mt-2">
            <div className="flex bg-off-white/80 rounded-full p-1.5 gap-1 w-full justify-between border border-light-gray/50">
              {['EN', 'සි', 'த'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`flex-1 py-2.5 border-none cursor-pointer rounded-full text-[13px] font-bold transition-all duration-300 ${
                    activeLang === lang 
                      ? 'bg-white text-blue shadow-sm' 
                      : 'bg-transparent text-mid-gray'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <Button variant="primary" className="w-full justify-center rounded-full py-3.5 h-auto font-bold text-[15px] shadow-[0_4px_16px_rgba(26,111,191,0.25)]">Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
