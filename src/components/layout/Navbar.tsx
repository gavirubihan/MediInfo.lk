'use client';
import React, { useState, useEffect } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const activeLang = locale === 'si' ? 'සි' : locale === 'ta' ? 'த' : 'EN';

  const handleLangChange = (lang: string) => {
    const nextLocale = lang === 'සි' ? 'si' : lang === 'த' ? 'ta' : 'en';
    router.replace(pathname, {locale: nextLocale});
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{name: string, email: string, isAdmin: boolean} | null>(null);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    const adminUser = localStorage.getItem('mediinfo_admin_user');
    if (adminUser) {
      try {
        const parsed = JSON.parse(adminUser);
        setUserProfile({ name: parsed.name, email: parsed.email, isAdmin: true });
      } catch (e) {}
    } else {
      const uName = localStorage.getItem('userName');
      const uEmail = localStorage.getItem('userEmail');
      if (uName && uEmail) {
        setUserProfile({ name: uName, email: uEmail, isAdmin: false });
      } else {
        setUserProfile({ name: 'Nirosha', email: 'nirosha@example.com', isAdmin: false });
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('mediinfo_admin_user');
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background shadow/blur when scrolled down
      setIsScrolled(currentScrollY > 20);

      // Prevent shaking from micro-scrolls or layout shifts during language change
      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Hide when scrolling down
      } else {
        setIsVisible(true); // Show when scrolling up
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
    { label: 'About', href: '/about' },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 flex justify-center pt-2 sm:pt-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'
      } px-3 md:px-8 pointer-events-none`}
    >
      <nav 
        className={`w-full max-w-[1200px] transition-all duration-500 ease-out rounded-full border pointer-events-auto ${
          isScrolled 
            ? 'bg-white/85 backdrop-blur-xl border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-1.5' 
            : 'bg-white/95 backdrop-blur-md border-light-gray/50 shadow-[0_4px_24px_rgba(0,0,0,0.06)] py-1.5 md:py-2'
        }`}
      >
        <div className="h-[44px] md:h-[52px] px-4 md:px-7 flex items-center justify-between gap-4 md:gap-6">
          <Link href="/" className="font-plus-jakarta font-bold text-[18px] md:text-[22px] text-blue flex-shrink-0 no-underline tracking-tight transition-transform hover:scale-105 active:scale-95 duration-200">
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
                  onClick={() => handleLangChange(lang)}
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
            {isLoggedIn ? (
              <div className="relative">
                <div 
                  className="w-[38px] h-[38px] rounded-full bg-blue-50 flex items-center justify-center shadow-[0_4px_12px_rgba(26,111,191,0.2)] hover:scale-105 transition-transform cursor-pointer border-2 border-white overflow-hidden"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.name || 'User'}&backgroundColor=e8f3fc`} alt="Profile" className="w-full h-full object-cover" />
                </div>

                {/* Profile Popup Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-light-gray/50 overflow-hidden z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 bg-off-white border-b border-light-gray/50">
                      <div className="font-bold text-[15px] text-near-black truncate">{userProfile?.name || 'Nirosha'}</div>
                      <div className="text-[13px] text-mid-gray truncate mt-0.5">{userProfile?.email || 'nirosha@example.com'}</div>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      {userProfile?.isAdmin && (
                        <a 
                          href="/admin" 
                          className="px-3 py-2.5 hover:bg-off-white rounded-xl text-[14px] font-medium text-dark-gray transition-colors cursor-pointer no-underline flex items-center"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Dashboard
                        </a>
                      )}
                      <button 
                        onClick={handleLogout}
                        className="px-3 py-2.5 hover:bg-red-50 hover:text-red-600 rounded-xl text-[14px] font-medium text-dark-gray transition-colors cursor-pointer text-left border-none bg-transparent flex items-center w-full"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="no-underline">
                <Button variant="login" className="rounded-full px-6 py-2 text-[14px] h-[38px] font-bold shadow-[0_4px_12px_rgba(26,111,191,0.2)]">Login</Button>
              </Link>
            )}
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
                  onClick={() => handleLangChange(lang)}
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
            {isLoggedIn ? (
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-light-gray/50">
                <div className="w-full flex items-center gap-3 bg-off-white rounded-2xl py-3 px-4 border border-light-gray/50">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border-2 border-white overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.name || 'User'}&backgroundColor=e8f3fc`} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-[15px] text-near-black truncate">{userProfile?.name || 'Nirosha'}</span>
                    <span className="text-[13px] text-mid-gray truncate">{userProfile?.email || 'nirosha@example.com'}</span>
                  </div>
                </div>
                {userProfile?.isAdmin && (
                  <a href="/admin" className="no-underline block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full justify-center rounded-xl py-3 h-auto font-bold text-[14px]">Dashboard</Button>
                  </a>
                )}
              <button 
                  type="button"
                  className="w-full flex items-center justify-center rounded-xl py-3 h-auto font-bold text-[14px] text-red-600 border-2 border-red-200 hover:bg-red-50 bg-white transition-colors cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="no-underline block" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full justify-center rounded-full py-3.5 h-auto font-bold text-[15px] shadow-[0_4px_16px_rgba(26,111,191,0.25)]">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
