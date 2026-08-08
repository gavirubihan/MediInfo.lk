'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminRole } from '@/components/admin/AdminRoleContext';
import { Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck, Sparkles, Languages, Stethoscope, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminRole();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      login(email);
      setLoading(false);
      router.push('/admin');
    }, 500);
  };

  const handleQuickFill = (targetEmail: string) => {
    setEmail(targetEmail);
    setPassword('password123');
    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      login(targetEmail);
      setLoading(false);
      router.push('/admin');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090D16] via-[#111827] to-[#1F2937] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl grid lg:grid-cols-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        
        {/* Left Side: Professional Production Hero Section */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Logo Header */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue to-teal flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-teal/20">
                M
              </div>
              <div>
                <h1 className="text-xl font-bold font-plus-jakarta text-white tracking-tight m-0 flex items-center gap-2">
                  <span>MediInfo<span className="text-teal">.LK</span></span>
                  <span className="bg-teal/20 text-teal text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-teal/30">
                    PORTAL
                  </span>
                </h1>
                <p className="text-[11px] text-white/60 m-0">Medicine for everyone — clear, trusted, local</p>
              </div>
            </div>

            {/* Portal Title */}
            <div className="space-y-3 mb-10">
              <h2 className="text-2xl lg:text-3xl font-extrabold font-plus-jakarta leading-tight text-white tracking-tight">
                Central Medical Administration & Verification
              </h2>
              <p className="text-xs text-white/70 leading-relaxed">
                Secure access for authorized administrative personnel and registered medical doctors in Sri Lanka.
              </p>
            </div>

            {/* Compliance & System Highlights */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <span className="font-bold text-white block">Clinical Standards & Verification</span>
                  <span className="text-[11px] text-white/60">Strict 2-Doctor clinical verification workflow for patient safety.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Languages size={18} />
                </div>
                <div>
                  <span className="font-bold text-white block">3-Language Medical Content</span>
                  <span className="text-[11px] text-white/60">Publishing localized medical guides in English, Sinhala, and Tamil.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue shrink-0 mt-0.5">
                  <Stethoscope size={18} />
                </div>
                <div>
                  <span className="font-bold text-white block">Role-Based Access Safeguards</span>
                  <span className="text-[11px] text-white/60">Granular permissions for Super Admins, Doctors, and Medical Staff.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 pt-8 mt-8 border-t border-white/10 text-[11px] text-white/40 flex items-center justify-between">
            <span>© 2026 MediInfo.LK</span>
            <span className="flex items-center gap-1 text-white/60 font-semibold">
              <Sparkles size={12} className="text-teal" /> Secure SSL Portal
            </span>
          </div>
        </div>

        {/* Right Side: Clean Production Login Form */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between bg-white">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-near-black font-plus-jakarta tracking-tight m-0">
                Welcome Back
              </h2>
              <p className="text-xs text-mid-gray mt-1.5 m-0 leading-relaxed">
                Sign in to access your administrative workspace or doctor verification panel.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-dark-gray mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@mediinfo.lk"
                    className="w-full pl-10 pr-4 py-3 bg-off-white border border-light-gray rounded-xl text-xs font-bold text-near-black outline-none focus:border-blue focus:bg-white focus:ring-2 focus:ring-blue/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-dark-gray uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] font-bold text-blue hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-off-white border border-light-gray rounded-xl text-xs font-bold text-near-black outline-none focus:border-blue focus:bg-white focus:ring-2 focus:ring-blue/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mid-gray hover:text-dark-gray transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-dark-gray font-semibold select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue accent-blue cursor-pointer"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue hover:bg-blue/90 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-4"
              >
                {loading ? (
                  <span>Authenticating Account...</span>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>Sign In to Panel</span>
                  </>
                )}
              </button>
            </form>

            {/* Subtle Demo Testing Credentials Bar */}
            <div className="pt-6 mt-6 border-t border-light-gray">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold text-mid-gray uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} className="text-teal" /> Demo Test Credentials
                </span>
                <span className="text-[10px] text-mid-gray font-medium">Click to test login</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin@mediinfo.lk')}
                  className="p-2 rounded-xl bg-blue-light/50 hover:bg-blue-light border border-blue/20 text-left transition-all cursor-pointer active:scale-95"
                >
                  <div className="font-extrabold text-xs text-blue">Super Admin</div>
                  <div className="text-[10px] text-mid-gray font-mono truncate">admin@mediinfo.lk</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('doctor@mediinfo.lk')}
                  className="p-2 rounded-xl bg-teal/5 hover:bg-teal/10 border border-teal/20 text-left transition-all cursor-pointer active:scale-95"
                >
                  <div className="font-extrabold text-xs text-teal">Doctor</div>
                  <div className="text-[10px] text-mid-gray font-mono truncate">doctor@mediinfo.lk</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('staff@mediinfo.lk')}
                  className="p-2 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 text-left transition-all cursor-pointer active:scale-95"
                >
                  <div className="font-extrabold text-xs text-amber-800">Staff</div>
                  <div className="text-[10px] text-mid-gray font-mono truncate">staff@mediinfo.lk</div>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-light-gray text-center">
            <p className="text-[11px] text-mid-gray m-0 leading-relaxed">
              Restricted portal. Unauthorized access attempts are monitored and logged.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
