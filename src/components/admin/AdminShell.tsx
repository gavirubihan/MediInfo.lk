'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Pill, 
  PlusCircle, 
  FileText, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Add Medicine', href: '/admin/medicine/add', icon: PlusCircle },
    { label: 'All Medicines', href: '/admin/medicine/list', icon: Pill },
    { label: 'Prescriptions', href: '/admin/prescriptions', icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin' || pathname === '/admin/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-near-black text-white sticky top-0 z-40 shadow-md">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5 no-underline group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue to-teal flex items-center justify-center text-white shadow-md font-bold text-lg group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-plus-jakarta font-bold text-[17px] leading-tight text-white tracking-tight flex items-center gap-1.5">
                  MediInfo <span className="bg-blue/30 text-teal text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-teal/30">ADMIN</span>
                </span>
                <span className="text-[11px] text-white/60">Healthcare Content Management</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 text-xs font-semibold text-white/90">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>AI Multi-Lang Translator Active</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg border border-white/10 transition-all no-underline"
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-white/15">
              <div className="w-8 h-8 rounded-full bg-blue text-white font-bold text-xs flex items-center justify-center border border-white/20">
                AD
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">Admin User</span>
                <span className="text-[10px] text-teal font-semibold">Super Administrator</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-light-gray shrink-0 min-h-[calc(100vh-4rem)] p-5">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-mid-gray mb-3 px-3">
            Management Panel
          </div>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-[14px] no-underline transition-all duration-200 ${
                    active
                      ? 'bg-blue text-white shadow-sm shadow-blue/20'
                      : 'text-dark-gray hover:bg-off-white hover:text-near-black'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-white' : 'text-mid-gray'} />
                  <span>{item.label}</span>
                  {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-light to-off-white border border-blue/15 text-dark-gray">
            <div className="flex items-center gap-2 font-bold text-xs text-blue mb-1">
              <ShieldCheck size={16} />
              <span>3-Language Ready</span>
            </div>
            <p className="text-[11px] text-mid-gray leading-relaxed m-0">
              Add medicine details in English, Sinhala, and Tamil with 1-click AI translation.
            </p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-near-black/50 backdrop-blur-sm flex">
            <div className="w-72 bg-white h-full p-5 flex flex-col shadow-2xl animate-fade-up">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-light-gray">
                <span className="font-plus-jakarta font-bold text-lg text-near-black">Admin Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-off-white text-mid-gray"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1.5 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[15px] no-underline transition-all ${
                        active
                          ? 'bg-blue text-white shadow-sm'
                          : 'text-dark-gray hover:bg-off-white'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
