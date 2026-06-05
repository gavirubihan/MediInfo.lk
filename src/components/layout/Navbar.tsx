'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const [activeLang, setActiveLang] = useState('EN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-light-gray shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
      <div className="h-[72px] w-full max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        <Link href="/" className="font-plus-jakarta font-bold text-[22px] text-blue flex-shrink-0 no-underline">
          MediInfo<span className="text-teal">.LK</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1 items-center flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-2 text-[15px] font-semibold rounded-md transition-colors duration-200 no-underline border-none bg-transparent ${isActive ? 'text-blue' : 'text-dark-gray hover:text-blue hover:bg-blue-light'}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-blue rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex bg-off-white rounded-full p-[3px] gap-[2px]">
            {['EN', 'සි', 'த'].map(lang => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1.5 border-none cursor-pointer rounded-[17px] text-[13px] font-semibold transition-all duration-200 ${activeLang === lang ? 'bg-blue text-white' : 'bg-transparent text-dark-gray'}`}
              >
                {lang}
              </button>
            ))}
          </div>
          <Button variant="login">Login</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-dark-gray bg-transparent border-none cursor-pointer hover:bg-off-white rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-light-gray bg-white absolute top-[72px] left-0 w-full shadow-lg">
          <div className="flex flex-col px-6 py-4 gap-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-semibold transition-colors no-underline ${isActive ? 'bg-blue-light text-blue' : 'text-dark-gray hover:bg-off-white'}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            
            <div className="h-px bg-light-gray w-full" />
            
            <div className="flex flex-col gap-4">
              <div className="flex bg-off-white rounded-full p-[3px] gap-[2px] w-fit">
                {['EN', 'සි', 'த'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-4 py-2 border-none cursor-pointer rounded-[17px] text-sm font-semibold transition-all duration-200 ${activeLang === lang ? 'bg-blue text-white' : 'bg-transparent text-dark-gray'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <Button variant="primary" className="w-full justify-center">Login</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
