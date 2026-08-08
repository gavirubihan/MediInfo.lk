'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminRole, PRESET_USERS, AdminUser } from '@/components/admin/AdminRoleContext';
import { getStoredMedicines } from '@/data/medicinesData';
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
  Sparkles,
  BookOpen,
  LogOut,
  UserCheck,
  Stethoscope,
  ChevronDown,
  Building2
} from 'lucide-react';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, switchUser, isAuthenticated } = useAdminRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const list = getStoredMedicines();
      const unverified = list.filter((m) => !m.verified || (m.verifications && m.verifications.length < 2));
      setPendingCount(unverified.length);
    }
  }, [pathname]);

  const { isLoading } = useAdminRole();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  // Filter navigation items based on user role
  // Super Admin: Dashboard, Add Medicine, All Medicines, Prescriptions, Blogs (No Medicine Verify)
  // Doctor: Dashboard, Add Medicine, Medicine Verify, Blogs
  // Other Medical: Dashboard, Add Medicine, Blogs
  const userRole = user?.role || 'super_admin';

  interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge?: string;
  }

  let navItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Add Medicine', href: '/admin/medicine/add', icon: PlusCircle },
  ];

  if (userRole === 'super_admin') {
    navItems.push({ label: 'All Medicines', href: '/admin/medicine/list', icon: Pill });
    navItems.push({ 
      label: 'Medicine Verify', 
      href: '/admin/medicine/verify', 
      icon: ShieldCheck, 
      badge: pendingCount > 0 ? `${pendingCount}` : undefined 
    });
    navItems.push({ label: 'Prescriptions', href: '/admin/prescriptions', icon: FileText });
    navItems.push({ label: 'Blogs', href: '/admin/blogs', icon: BookOpen });
  } else if (userRole === 'doctor') {
    navItems.push({ 
      label: 'Medicine Verify', 
      href: '/admin/medicine/verify', 
      icon: ShieldCheck, 
      badge: pendingCount > 0 ? `${pendingCount}` : undefined 
    });
    navItems.push({ label: 'Blogs', href: '/admin/blogs', icon: BookOpen });
  } else if (userRole === 'other_medical') {
    navItems.push({ label: 'Blogs', href: '/admin/blogs', icon: BookOpen });
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin' || pathname === '/admin/';
    }
    return pathname.startsWith(href);
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'super_admin':
        return { label: 'SUPER ADMIN', color: 'bg-blue/30 text-teal border-teal/30' };
      case 'doctor':
        return { label: 'SLMC DOCTOR', color: 'bg-amber-500/20 text-amber-300 border-amber-400/30' };
      case 'other_medical':
        return { label: 'MEDICAL STAFF', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' };
      default:
        return { label: 'ADMIN', color: 'bg-blue/30 text-teal border-teal/30' };
    }
  };

  const badgeInfo = getRoleBadge(userRole);

  return (
    <div className="min-h-screen bg-off-white flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md text-near-black sticky top-0 z-40 border-b border-light-gray shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-mid-gray hover:text-near-black hover:bg-light-gray/50 transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5 no-underline group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue to-teal flex items-center justify-center text-white shadow-md font-bold text-lg group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-plus-jakarta font-bold text-[16px] sm:text-[17px] leading-tight text-near-black tracking-tight flex items-center gap-1.5">
                  MediInfo<span className="text-teal">.LK</span> <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${badgeInfo.color}`}>{badgeInfo.label}</span>
                </span>
                <span className="text-[11px] text-mid-gray hidden sm:inline">Medicine for everyone — clear, trusted, local</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-mid-gray hover:text-dark-gray hover:bg-off-white px-3 py-1.5 rounded-lg border border-light-gray transition-all no-underline"
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </Link>

            {/* Logged-In User Profile & Logout */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2.5 pl-3 pr-2 py-1 rounded-xl hover:bg-off-white transition-colors cursor-pointer border border-light-gray"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue to-teal text-white font-bold text-xs flex items-center justify-center shadow-sm">
                  {userRole === 'doctor' ? 'DR' : userRole === 'other_medical' ? 'ST' : 'SA'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-near-black leading-tight truncate max-w-[130px]">
                    {user?.name || 'Admin User'}
                  </span>
                  <span className="text-[10px] text-teal font-semibold flex items-center gap-1">
                    {userRole === 'doctor' ? user?.slmcRegNo || 'Doctor' : userRole === 'other_medical' ? 'Medical Staff' : 'Super Administrator'}
                    <ChevronDown size={10} />
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-light-gray p-3 z-50 animate-fade-up text-near-black">
                  <div className="pb-3 border-b border-light-gray mb-2">
                    <span className="text-[10px] font-extrabold uppercase text-mid-gray block mb-0.5">Logged In Account</span>
                    <span className="font-bold text-xs text-near-black block truncate">{user?.name}</span>
                    <span className="text-[11px] text-mid-gray font-mono block truncate">{user?.email}</span>
                    <span className="inline-block mt-1 bg-blue-light text-blue text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {userRole === 'super_admin' ? 'Super Admin' : userRole === 'doctor' ? `Doctor (${user?.slmcRegNo})` : 'Medical Staff'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      setRoleMenuOpen(false);
                      router.push('/admin/login');
                    }}
                    className="w-full text-left p-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={15} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 bg-transparent border-r border-light-gray shrink-0 min-h-[calc(100vh-4rem)] p-5">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-mid-gray mb-3 px-3 flex items-center justify-between">
            <span>
              {userRole === 'super_admin' ? 'Super Admin Navigation' : userRole === 'doctor' ? 'Doctor Review Portal' : 'Medical Staff Panel'}
            </span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-full font-bold text-[14px] no-underline transition-all duration-300 ${
                    active
                      ? 'bg-blue text-white shadow-[0_4px_12px_rgba(26,111,191,0.3)]'
                      : 'text-dark-gray hover:bg-white hover:text-near-black hover:shadow-sm'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-white' : 'text-mid-gray'} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {active && !item.badge && <ChevronRight size={14} className="ml-auto opacity-70" />}
                </Link>
              );
            })}
          </nav>

          {/* Role specific banner */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-light to-off-white border border-blue/15 text-dark-gray">
            <div className="flex items-center gap-2 font-bold text-xs text-blue mb-1">
              <ShieldCheck size={16} />
              <span>
                {userRole === 'doctor' ? '2-Doctor Verification' : 'Role Security Enforced'}
              </span>
            </div>
            <p className="text-[11px] text-mid-gray leading-relaxed m-0">
              {userRole === 'doctor'
                ? 'Minimum 2 registered medical doctor approvals required for medicine verified seal.'
                : userRole === 'super_admin'
                ? 'Super Admin panel overview. Doctor verification workspace reserved for doctor logins.'
                : 'Medical staff panel for medicine drafting and health blog publishing.'}
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
                      {item.badge && (
                        <span className="ml-auto bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
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
