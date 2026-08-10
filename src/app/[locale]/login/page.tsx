'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Mail, Lock, User, ArrowRight, HeartPulse, ShieldCheck, ChevronLeft, UploadCloud, Stethoscope, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { PRESET_USERS, AdminUser } from '@/components/admin/AdminRoleContext';
import { addStaffRequest, findStaffByEmail, ProfessionType } from '@/data/staffData';

type AuthView = 'login' | 'signup-select' | 'signup-normal' | 'signup-med-1' | 'signup-med-2' | 'success' | 'staff-pending-success' | 'google-select-account';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('LoginPage');
  const [view, setView] = useState<AuthView>('login');

  React.useEffect(() => {
    if (searchParams.get('view') === 'signup') {
      setView('signup-normal');
    }
  }, [searchParams]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Medical Signup form state
  const [medName, setMedName] = useState('');
  const [medEmail, setMedEmail] = useState('');
  const [medPassword, setMedPassword] = useState('');
  const [medProfession, setMedProfession] = useState<ProfessionType>('doctor');
  const [medSlmcRegNo, setMedSlmcRegNo] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim()) return;

    const cleanEmail = email.trim().toLowerCase();
    // 1. Check preset admin accounts
    const matchedPreset = PRESET_USERS.find(
      (u: any) => u.email.toLowerCase() === cleanEmail || (cleanEmail.includes('doc') && u.role === 'doctor')
    );

    if (matchedPreset) {
      localStorage.setItem('mediinfo_admin_user', JSON.stringify(matchedPreset));
      window.location.href = '/admin';
      return;
    }

    // 2. Check submitted staff registrations
    const staffRecord = findStaffByEmail(cleanEmail);
    if (staffRecord) {
      if (staffRecord.status === 'approved') {
        const approvedUser: AdminUser = {
          id: staffRecord.id,
          email: staffRecord.email,
          name: staffRecord.name,
          role: staffRecord.profession === 'doctor' ? 'doctor' : 'other_medical',
          slmcRegNo: staffRecord.slmcRegNo,
          specialization: staffRecord.specialization || staffRecord.profession.toUpperCase(),
          hospital: staffRecord.hospital || 'Registered Healthcare Staff'
        };
        localStorage.setItem('mediinfo_admin_user', JSON.stringify(approvedUser));
        window.location.href = '/admin';
        return;
      } else if (staffRecord.status === 'pending') {
        setAuthError('Your registration is pending Super Admin verification. You will gain access once approved.');
        return;
      } else if (staffRecord.status === 'rejected') {
        setAuthError(`Registration Declined: ${staffRecord.adminNotes || 'Contact admin for details.'}`);
        return;
      }
    }

    // 3. Otherwise normal user login
    setView('success');
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const SocialButtons = ({ isMedical = false }) => (
    <>
      <div className="flex items-center gap-4 my-6">
        <div className="h-px bg-light-gray flex-1" />
        <div className="text-[12px] uppercase tracking-widest font-bold text-mid-gray">{t('continueWith')}</div>
        <div className="h-px bg-light-gray flex-1" />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            if (isMedical) setView('signup-med-2');
            else setView('success');
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-light-gray rounded-xl hover:bg-off-white transition-colors cursor-pointer active:scale-95"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
          <span className="text-[14px] font-bold text-dark-gray">{t('google')}</span>
        </button>
        <button
          onClick={() => {
            if (isMedical) setView('signup-med-2');
            else setView('success');
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-light-gray rounded-xl hover:bg-off-white transition-colors cursor-pointer active:scale-95 text-[#1877F2]"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor" /></svg>
          <span className="text-[14px] font-bold text-dark-gray">{t('facebook')}</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <div className="flex-1 flex w-full">

        {/* Left Side: Branding / Visual (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 relative bg-blue overflow-hidden flex-col justify-between px-12 pt-32 pb-12 lg:px-20 lg:pt-40 lg:pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue to-blue-dark opacity-90 z-0" />
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-white/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-teal/20 blur-[120px] rounded-full pointer-events-none" />


          <div className="relative z-10 max-w-lg mb-10">
            <h1 className="text-white text-[42px] font-extrabold font-plus-jakarta leading-[1.1] mb-6">
              {view === 'login' ? t('welcomeTitle') : 'Join Sri Lanka\'s top medical database.'}
            </h1>
            <p className="text-white/80 text-[18px] leading-relaxed font-medium">
              {t('welcomeDesc')}
            </p>
          </div>

          <div className="relative z-10 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-xl">D</div>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-xl -ml-6">P</div>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-xl -ml-6">+</div>
            <div className="flex flex-col justify-center ml-2">
              <div className="text-white text-sm font-bold">{t('verifiedStaff')}</div>
              <div className="text-white/70 text-xs">{t('staffDesc')}</div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="flex-1 flex items-center justify-center p-6 pt-28 sm:p-12 sm:pt-36 overflow-y-auto">
          <div className="w-full max-w-[440px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 sm:p-10 animate-fade-up border border-light-gray/50 my-auto mt-auto sm:mt-auto">

            {/* --- LOGIN VIEW --- */}
            {view === 'login' && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h2 className="text-[28px] font-extrabold font-plus-jakarta text-near-black mb-2 tracking-tight">{t('signInTitle')}</h2>
                  <p className="text-[15px] text-mid-gray">{t('signInSubtitle')}</p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">{t('emailLabel')}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><Mail size={18} /></div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="hello@example.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-blue focus:ring-4 focus:ring-blue/10 transition-all placeholder:text-mid-gray/70"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide">{t('passwordLabel')}</label>
                      <Link href="#" className="text-[13px] font-bold text-blue hover:underline">{t('forgotPassword')}</Link>
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><Lock size={18} /></div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-blue focus:ring-4 focus:ring-blue/10 transition-all placeholder:text-mid-gray/70"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="primary" className="w-full justify-center py-4 rounded-xl text-[15px] shadow-[0_4px_12px_rgba(26,111,191,0.2)] hover:shadow-[0_6px_20px_rgba(26,111,191,0.3)] mt-2 font-bold group">
                    {t('signIn')} <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
                <SocialButtons />
                <div className="text-center mt-8 text-[14px] text-dark-gray">
                  {t('noAccount')} <button onClick={() => setView('signup-select')} className="font-bold text-blue hover:underline cursor-pointer bg-transparent border-none p-0">{t('signUpBtn')}</button>
                </div>
              </div>
            )}

            {/* --- SIGNUP SELECTION VIEW --- */}
            {view === 'signup-select' && (
              <div className="animate-fade-up">
                <button onClick={() => setView('login')} className="flex items-center text-[13px] font-bold text-mid-gray hover:text-dark-gray mb-6 transition-colors bg-transparent border-none cursor-pointer p-0">
                  <ChevronLeft size={16} className="mr-0.5" /> {t('backToLogin')}
                </button>
                <div className="text-center mb-8">
                  <h2 className="text-[28px] font-extrabold font-plus-jakarta text-near-black mb-2 tracking-tight">{t('createAccountTitle')}</h2>
                  <p className="text-[15px] text-mid-gray">{t('createAccountSubtitle')}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div
                    onClick={() => setView('signup-normal')}
                    className="group border-2 border-light-gray rounded-2xl p-5 cursor-pointer hover:border-blue hover:bg-blue/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-off-white group-hover:bg-blue group-hover:text-white text-mid-gray flex items-center justify-center transition-colors">
                        <HeartPulse size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[16px] text-near-black mb-0.5">{t('normalUser')}</h3>
                        <p className="text-[13px] text-dark-gray">{t('normalUserDesc')}</p>
                      </div>
                      <ArrowRight size={20} className="text-light-gray group-hover:text-blue transition-colors" />
                    </div>
                  </div>

                  <div
                    onClick={() => setView('signup-med-1')}
                    className="group border-2 border-light-gray rounded-2xl p-5 cursor-pointer hover:border-teal hover:bg-teal/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-off-white group-hover:bg-teal group-hover:text-white text-mid-gray flex items-center justify-center transition-colors">
                        <Stethoscope size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[16px] text-near-black mb-0.5">{t('medicalStaff')}</h3>
                        <p className="text-[13px] text-dark-gray">{t('medicalStaffDesc')}</p>
                      </div>
                      <ArrowRight size={20} className="text-light-gray group-hover:text-teal transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- NORMAL SIGNUP VIEW --- */}
            {view === 'signup-normal' && (
              <div className="animate-fade-up">
                <button onClick={() => setView('signup-select')} className="flex items-center text-[13px] font-bold text-mid-gray hover:text-dark-gray mb-6 transition-colors bg-transparent border-none cursor-pointer p-0">
                  <ChevronLeft size={16} className="mr-0.5" /> {t('backBtn')}
                </button>
                <div className="text-center mb-8">
                  <h2 className="text-[28px] font-extrabold font-plus-jakarta text-near-black mb-2 tracking-tight">{t('normalSignUpTitle')}</h2>
                  <p className="text-[15px] text-mid-gray">{t('normalSignUpSubtitle')}</p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setView('success'); }}>
                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">{t('fullNameLabel')}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><User size={18} /></div>
                      <input type="text" placeholder="John Doe" className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-blue focus:ring-4 focus:ring-blue/10 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">{t('emailLabel')}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><Mail size={18} /></div>
                      <input type="email" placeholder="hello@example.com" className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-blue focus:ring-4 focus:ring-blue/10 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">{t('passwordLabel')}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><Lock size={18} /></div>
                      <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-blue focus:ring-4 focus:ring-blue/10 transition-all" />
                    </div>
                  </div>
                  {authError && (
                    <div className="p-3.5 bg-red/10 border border-red/20 rounded-xl text-xs font-bold text-red animate-fade-up">
                      {authError}
                    </div>
                  )}
                  <Button variant="primary" className="w-full justify-center py-4 rounded-xl text-[15px] shadow-[0_4px_12px_rgba(26,111,191,0.2)] mt-2 font-bold group">
                    {t('createAccountBtn')} <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
                <SocialButtons />
              </div>
            )}

            {/* --- MEDICAL SIGNUP STEP 1 --- */}
            {view === 'signup-med-1' && (
              <div className="animate-fade-up">
                <button onClick={() => setView('signup-select')} className="flex items-center text-[13px] font-bold text-mid-gray hover:text-dark-gray mb-6 transition-colors bg-transparent border-none cursor-pointer p-0">
                  <ChevronLeft size={16} className="mr-0.5" /> {t('backBtn')}
                </button>
                <div className="text-center mb-8">
                  <div className="flex justify-center gap-1.5 mb-4">
                    <div className="w-8 h-1.5 rounded-full bg-teal"></div>
                    <div className="w-8 h-1.5 rounded-full bg-light-gray"></div>
                  </div>
                  <h2 className="text-[28px] font-extrabold font-plus-jakarta text-near-black mb-2 tracking-tight">{t('staffDetailsTitle')}</h2>
                  <p className="text-[15px] text-mid-gray">{t('step1Subtitle')}</p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setView('signup-med-2'); }}>
                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">{t('fullNameLabel')}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><User size={18} /></div>
                      <input
                        type="text"
                        value={medName}
                        onChange={(e) => setMedName(e.target.value)}
                        placeholder="Dr. Kasun Perera"
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">{t('profEmailLabel')}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><Mail size={18} /></div>
                      <input
                        type="email"
                        value={medEmail}
                        onChange={(e) => setMedEmail(e.target.value)}
                        placeholder="doctor@hospital.lk"
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">{t('passwordLabel')}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><Lock size={18} /></div>
                      <input
                        type="password"
                        value={medPassword}
                        onChange={(e) => setMedPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all"
                      />
                    </div>
                  </div>
                  <Button variant="primary" style={{ backgroundColor: 'var(--color-teal)', borderColor: 'var(--color-teal)' }} className="w-full justify-center py-4 rounded-xl text-[15px] shadow-[0_4px_12px_rgba(23,169,142,0.2)] mt-2 font-bold group border hover:bg-opacity-90">
                    Next Step <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
                <SocialButtons isMedical={true} />
              </div>
            )}

            {/* --- MEDICAL SIGNUP STEP 2 (VERIFICATION) --- */}
            {view === 'signup-med-2' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <button onClick={() => setView('signup-med-1')} className="flex items-center text-[13px] font-bold text-mid-gray hover:text-dark-gray mb-6 transition-colors bg-transparent border-none cursor-pointer p-0">
                  <ChevronLeft size={16} className="mr-0.5" /> Back
                </button>
                <div className="text-center mb-8">
                  <div className="flex justify-center gap-1.5 mb-4">
                    <div className="w-8 h-1.5 rounded-full bg-teal"></div>
                    <div className="w-8 h-1.5 rounded-full bg-teal"></div>
                  </div>
                  <h2 className="text-[28px] font-extrabold font-plus-jakarta text-near-black mb-2 tracking-tight">Verification</h2>
                  <p className="text-[15px] text-mid-gray">Step 2 of 2: Required for staff access.</p>
                </div>
                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addStaffRequest({
                      name: medName || 'Medical Professional',
                      email: medEmail || 'staff@hospital.lk',
                      password: medPassword,
                      profession: medProfession,
                      slmcRegNo: medSlmcRegNo || 'SLMC-99999',
                      proofFileName: fileName || 'Medical_License_Verification.pdf'
                    });
                    setView('staff-pending-success');
                  }}
                >
                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">Position</label>
                    <select
                      value={medProfession}
                      onChange={(e) => setMedProfession(e.target.value as ProfessionType)}
                      className="w-full px-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="doctor">Medical Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="nurse">Registered Nurse</option>
                      <option value="student">Medical Student</option>
                      <option value="other">Other Healthcare Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">SLMC Registration Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none"><ShieldCheck size={18} /></div>
                      <input
                        type="text"
                        value={medSlmcRegNo}
                        onChange={(e) => setMedSlmcRegNo(e.target.value)}
                        placeholder="e.g. 12345"
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-off-white border border-light-gray rounded-xl text-[15px] font-medium text-near-black outline-none focus:bg-white focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-dark-gray uppercase tracking-wide mb-1.5">Upload Proof (ID / License)</label>
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${dragActive ? 'border-teal bg-teal/5' : 'border-light-gray bg-off-white hover:border-teal hover:bg-teal/5'} ${fileName ? 'border-teal bg-teal/5 border-solid' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                      <div className="flex flex-col items-center justify-center gap-2">
                        {fileName ? (
                          <>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-teal mb-1"><CheckCircle2 size={24} /></div>
                            <div className="text-[14px] font-bold text-near-black">{fileName}</div>
                            <div className="text-[12px] text-teal">Click to replace file</div>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-mid-gray mb-1"><UploadCloud size={24} /></div>
                            <div className="text-[14px] font-bold text-near-black">Drag & drop your document</div>
                            <div className="text-[12px] text-mid-gray">Supports PDF, JPG, PNG</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button variant="primary" style={{ backgroundColor: 'var(--color-teal)', borderColor: 'var(--color-teal)' }} className="w-full justify-center py-4 rounded-xl text-[15px] shadow-[0_4px_12px_rgba(23,169,142,0.2)] mt-4 font-bold border">
                    Submit Verification
                  </Button>
                </form>
              </div>
            )}

            {/* --- GOOGLE SELECT ACCOUNT VIEW --- */}
            {view === 'google-select-account' && (
              <div className="animate-fade-up">
                <div className="flex justify-center mb-6">
                  <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-[24px] font-medium text-near-black mb-1 tracking-tight">Choose an account</h2>
                  <p className="text-[15px] text-near-black">to continue to MediInfo.LK</p>
                </div>
                <div className="flex flex-col border border-light-gray rounded-xl overflow-hidden">
                  <div
                    onClick={() => {
                      localStorage.setItem('isLoggedIn', 'true');
                      window.location.href = '/admin';
                    }}
                    className="flex items-center gap-4 p-4 hover:bg-off-white transition-colors cursor-pointer border-b border-light-gray"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#9c27b0] text-white flex items-center justify-center font-bold text-lg shrink-0">
                      N
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-[14px] font-bold text-near-black truncate">Nirosha</div>
                      <div className="text-[13px] text-mid-gray truncate">nirosha@example.com</div>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-4 p-4 hover:bg-off-white transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-light-gray text-dark-gray flex items-center justify-center shrink-0">
                      <User size={20} />
                    </div>
                    <div className="text-[14px] font-bold text-near-black truncate">Use another account</div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-[12px] text-mid-gray max-w-[300px] mx-auto leading-relaxed">
                    To continue, Google will share your name, email address, and language preference with MediInfo.LK.
                  </p>
                </div>
              </div>
            )}

            {/* --- STAFF PENDING VERIFICATION SUCCESS VIEW --- */}
            {view === 'staff-pending-success' && (
              <div className="animate-fade-up text-center py-8">
                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                  <Stethoscope size={40} className="text-amber-600" />
                </div>
                <h2 className="text-[26px] font-extrabold font-plus-jakarta text-near-black mb-3">Verification Under Review</h2>
                <p className="text-[14px] text-dark-gray leading-relaxed mb-6">
                  Thank you, <strong>{medName || 'Medical Professional'}</strong>! Your SLMC credentials and document proof have been submitted to our <strong>Super Administrator team</strong> for review.
                </p>
                <div className="p-4 bg-off-white rounded-xl border border-light-gray text-left text-xs space-y-2 mb-8 text-dark-gray">
                  <div className="flex justify-between"><span className="text-mid-gray">Profession:</span><span className="font-bold uppercase text-near-black">{medProfession}</span></div>
                  <div className="flex justify-between"><span className="text-mid-gray">SLMC Reg No:</span><span className="font-bold text-near-black">{medSlmcRegNo || 'SLMC-99999'}</span></div>
                  <div className="flex justify-between"><span className="text-mid-gray">Document:</span><span className="font-bold text-teal">{fileName || 'Verification_Doc.pdf'}</span></div>
                  <div className="flex justify-between"><span className="text-mid-gray">Status:</span><span className="font-bold text-amber-600">Pending Review (0/1)</span></div>
                </div>
                <Button onClick={() => setView('login')} variant="primary" className="w-full justify-center py-3.5 rounded-xl text-[14px] font-bold">
                  Return to Login
                </Button>
              </div>
            )}

            {/* --- SUCCESS VIEW --- */}
            {view === 'success' && (
              <div className="animate-fade-up text-center py-10">
                <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-teal" />
                </div>
                <h2 className="text-[28px] font-extrabold font-plus-jakarta text-near-black mb-3">Welcome Aboard!</h2>
                <p className="text-[15px] text-dark-gray mb-8">Your account has been successfully set up.</p>
                <Link href="/" className="no-underline">
                  <Button onClick={() => localStorage.setItem('isLoggedIn', 'true')} variant="primary" className="w-full justify-center py-4 rounded-xl text-[15px] font-bold">
                    Go to Homepage
                  </Button>
                </Link>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
