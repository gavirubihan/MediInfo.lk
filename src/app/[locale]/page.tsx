import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SearchInput } from '@/components/ui/SearchInput';
import { Pill, Check, AlertTriangle, Globe, Stethoscope, Search, Bot, CheckCircle, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-36 pb-20 before:content-[''] before:absolute before:-top-20 before:-right-30 before:w-[600px] before:h-[600px] before:bg-[radial-gradient(ellipse,rgba(232,243,252,0.9)_0%,transparent_70%)] before:pointer-events-none after:content-[''] after:absolute after:-bottom-10 after:-left-20 after:w-[400px] after:h-[400px] after:bg-[radial-gradient(ellipse,rgba(23,169,142,0.06)_0%,transparent_70%)] after:pointer-events-none">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div>
            <div className="mb-5">
              <Badge variant="hero">
                <Pill size={14} className="text-blue" /> {t('badge')}
              </Badge>
            </div>
            <h1 className="text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.1] font-plus-jakarta text-near-black mb-5">
              {t('titleLine1')}<br />
              <em className="not-italic text-blue relative">{t('titleLine2')}</em><br />
              {t('titleLine3')}
            </h1>
            <p className="text-[17px] leading-[1.7] text-dark-gray mb-9 max-w-[480px]">
              {t('description')}
            </p>
            <div className="flex gap-3.5 flex-wrap mb-8">
              <Link href="/search" className="no-underline">
                <Button variant="primary">{t('searchBtn')}</Button>
              </Link>
              <Button variant="secondary">{t('uploadBtn')}</Button>
            </div>
            <div className="flex gap-5 flex-wrap">
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-dark-gray"><Check size={16} className="text-teal" /> {t('verifiedDoctors')}</span>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-dark-gray"><Check size={16} className="text-teal" /> {t('multilingual')}</span>
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-dark-gray"><Check size={16} className="text-teal" /> {t('freeToUse')}</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Phone Mockup */}
            <div className="w-[260px] h-[480px] bg-white rounded-[32px] border-2 border-light-gray shadow-[0_24px_80px_rgba(26,111,191,0.18),0_4px_20px_rgba(0,0,0,0.08)] p-5 flex flex-col gap-3 relative z-10">
              <div className="w-[60px] h-1 bg-light-gray rounded-sm mx-auto mb-2" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-light rounded-lg flex items-center justify-center shrink-0">
                  <Pill size={20} className="text-blue" />
                </div>
                <div>
                  <div className="font-plus-jakarta font-bold text-sm text-near-black">Paracetamol</div>
                  <div className="text-[11px] text-mid-gray">Acetaminophen • Painkiller</div>
                </div>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                <Badge variant="blue" className="!text-[9px] !px-1.5">TABLET</Badge>
                <Badge variant="blue" className="!text-[9px] !px-1.5">500MG</Badge>
                <span className="bg-[rgba(23,169,142,0.12)] text-teal text-[9px] font-bold uppercase px-1.5 py-[3px] rounded flex items-center gap-1">
                  <Check size={10} /> VERIFIED
                </span>
              </div>
              <div className="h-px bg-light-gray" />
              <div className="text-[10px] font-bold uppercase text-mid-gray tracking-[0.5px]">Dosage</div>
              <div className="flex justify-between text-xs"><span className="text-mid-gray">Adults</span><span className="font-semibold text-near-black font-jetbrains">500–1000mg</span></div>
              <div className="flex justify-between text-xs"><span className="text-mid-gray">Children</span><span className="font-semibold text-near-black font-jetbrains">250–500mg</span></div>
              <div className="h-px bg-light-gray" />
              <div className="text-[10px] font-bold uppercase text-mid-gray tracking-[0.5px]">Side Effects</div>
              <div className="flex items-center gap-1 text-xs"><Check size={12} className="text-teal shrink-0" /><span className="text-teal">Nausea (common)</span></div>
              <div className="flex items-center gap-1 text-xs"><Check size={12} className="text-teal shrink-0" /><span className="text-teal">Headache (rare)</span></div>
              <div className="h-px bg-light-gray" />
              <div className="bg-[#FFF5F5] rounded-lg px-2.5 py-2 flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-red shrink-0" />
                <span className="text-[10px] text-red font-semibold">Avoid with alcohol — liver risk</span>
              </div>
              <div className="flex justify-between text-xs mt-1.5"><span className="text-mid-gray">Prescription</span><span className="text-teal">Not Required</span></div>
            </div>

            {/* Floating Cards */}
            <div className="hidden md:flex absolute top-10 -left-10 bg-white rounded-xl py-3 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-light-gray items-center gap-2.5 text-[13px] font-semibold text-near-black whitespace-nowrap z-20 animate-float">
              <div className="w-8 h-8 rounded-lg bg-blue-light flex items-center justify-center">
                <Pill size={16} className="text-blue" />
              </div>
              <div><div className="text-[11px] text-mid-gray font-normal">Database</div>500+ Medicines</div>
            </div>
            <div className="hidden md:flex absolute bottom-20 -right-5 bg-white rounded-xl py-3 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-light-gray items-center gap-2.5 text-[13px] font-semibold text-near-black whitespace-nowrap z-20 animate-float-delay-1">
              <div className="w-8 h-8 rounded-lg bg-[rgba(23,169,142,0.12)] flex items-center justify-center">
                <Globe size={16} className="text-teal" />
              </div>
              <div><div className="text-[11px] text-mid-gray font-normal">Languages</div>EN • සි • த</div>
            </div>
            <div className="hidden lg:flex absolute top-44 -right-12 bg-white rounded-xl py-3 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-light-gray items-center gap-2.5 text-[13px] font-semibold text-near-black whitespace-nowrap z-20 animate-float-delay-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFF8E8] flex items-center justify-center">
                <Stethoscope size={16} className="text-amber-500" />
              </div>
              <div><div className="text-[11px] text-mid-gray font-normal">Doctors</div>Verified Only</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Band */}
      <section className="py-12 bg-off-white text-center">
        <div className="max-w-[720px] mx-auto px-6">
          <h2 className="text-[28px] font-bold leading-[1.25] font-plus-jakarta text-near-black mb-2">{t('searchBandTitle')}</h2>
          <p className="text-[15px] text-mid-gray mb-6">{t('searchBandDesc')}</p>
          <div className="max-w-[680px] mx-auto mb-4">
            <SearchInput placeholder={t('searchPlaceholder')} />
          </div>
          <div className="flex gap-2 justify-center flex-wrap">
            {['Paracetamol', 'Amoxicillin', 'Metformin', 'Omeprazole', 'Cetirizine'].map(med => (
              <button key={med} className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-blue-light text-blue border-none cursor-pointer font-sans transition-all hover:bg-blue hover:text-white">
                {med}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold leading-[1.25] font-plus-jakarta text-near-black">{t('hiwTitle')}</h2>
            <p className="text-mid-gray mt-2.5 max-w-[560px] mx-auto">{t('hiwSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative">
            <div className="md:p-8 flex flex-col gap-3.5 relative md:after:content-['→'] after:absolute after:-right-3 after:top-11 after:text-2xl after:text-mid-gray after:z-10">
              <div className="w-8 h-8 bg-blue-light rounded-full flex items-center justify-center text-[13px] font-bold text-blue">01</div>
              <div className="w-16 h-16 bg-blue rounded-2xl flex items-center justify-center mb-1 shadow-[0_4px_16px_rgba(26,111,191,0.3)]">
                <Search size={32} className="text-white" />
              </div>
              <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black">{t('hiwStep1Title')}</h3>
              <p className="text-[15px] text-dark-gray">{t('hiwStep1Desc')}</p>
            </div>
            <div className="md:p-8 flex flex-col gap-3.5 relative md:after:content-['→'] after:absolute after:-right-3 after:top-11 after:text-2xl after:text-mid-gray after:z-10">
              <div className="w-8 h-8 bg-blue-light rounded-full flex items-center justify-center text-[13px] font-bold text-blue">02</div>
              <div className="w-16 h-16 bg-blue rounded-2xl flex items-center justify-center mb-1 shadow-[0_4px_16px_rgba(26,111,191,0.3)]">
                <Bot size={32} className="text-white" />
              </div>
              <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black">{t('hiwStep2Title')}</h3>
              <p className="text-[15px] text-dark-gray">{t('hiwStep2Desc')}</p>
            </div>
            <div className="md:p-8 flex flex-col gap-3.5 relative">
              <div className="w-8 h-8 bg-blue-light rounded-full flex items-center justify-center text-[13px] font-bold text-blue">03</div>
              <div className="w-16 h-16 bg-blue rounded-2xl flex items-center justify-center mb-1 shadow-[0_4px_16px_rgba(26,111,191,0.3)]">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black">{t('hiwStep3Title')}</h3>
              <p className="text-[15px] text-dark-gray">{t('hiwStep3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold leading-[1.25] font-plus-jakarta text-near-black">{t('featTitle')}</h2>
            <p className="text-mid-gray mt-2.5 max-w-[560px] mx-auto">{t('featSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Search size={24} className="text-blue" />, title: 'Smart Medicine Search', desc: 'Search any medicine by brand or generic name with instant results.' },
              { icon: <Bot size={24} className="text-blue" />, title: 'AI Prescription Reading', desc: 'Upload a photo of your prescription — our AI extracts medicine details automatically.' },
              { icon: <Globe size={24} className="text-blue" />, title: 'Multilingual Support', desc: 'Full support for Sinhala, Tamil, and English — choose your preferred language.' },
              { icon: <Stethoscope size={24} className="text-blue" />, title: 'Verified Doctor Reviews', desc: 'Only certified healthcare professionals can contribute content to our platform.' },
              { icon: <Pill size={24} className="text-blue" />, title: 'Medicine Safety Profiles', desc: 'Complete dosage guides, side effect lists, and safety warnings for every medicine.' },
              { icon: <FileText size={24} className="text-blue" />, title: 'Trusted Health Blogs', desc: 'Doctor-written health articles covering medicine guides, tips, and safe practices.' }
            ].map((feat, i) => (
              <div key={i} className="bg-blue-light rounded-2xl p-7 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="w-[52px] h-[52px] bg-white rounded-[14px] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]">{feat.icon}</div>
                <h4 className="text-[17px] font-semibold font-plus-jakarta text-near-black">{feat.title}</h4>
                <p className="text-[15px] text-dark-gray">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-[28px] font-bold leading-[1.25] font-plus-jakarta text-near-black">{t('artTitle')}</h2>
              <p className="text-[15px] text-mid-gray mt-2">{t('artSubtitle')}</p>
            </div>
            <Link href="/blogs" className="no-underline shrink-0">
              <Button variant="text">{t('viewAll')}</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { tag: 'Medicine Guide', date: '12 Jun 2025', title: 'Safe Use of Antibiotics: What Every Sri Lankan Should Know', excerpt: 'Antibiotic resistance is a growing concern. Learn how to use antibiotics correctly and when not to use them at all.', avatar: 'DK', avatarColor: 'bg-blue', name: 'Dr. Kasun Perera', time: '5 min' },
              { tag: 'Elderly Care', date: '8 Jun 2025', title: 'Managing Multiple Medications Safely in Older Adults', excerpt: 'Polypharmacy risks are real. A geriatric specialist explains how to review and simplify medication regimens.', avatar: 'DF', avatarColor: 'bg-teal', name: 'Dr. Fatima Aslam', time: '7 min' },
              { tag: 'Drug Interactions', date: '3 Jun 2025', title: '5 Common Drug Interactions You Might Not Know About', excerpt: 'Some everyday medicines can interact dangerously. Discover the most common combinations to watch out for.', avatar: 'DN', avatarColor: 'bg-[#7B5EA7]', name: 'Dr. Nimal Bandara', time: '4 min' }
            ].map((blog, i) => (
              <div key={i} className="bg-white border border-light-gray rounded-2xl p-6 flex flex-col gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-between items-center">
                  <Badge variant="blue">{blog.tag}</Badge>
                  <span className="text-xs text-mid-gray">{blog.date}</span>
                </div>
                <div className="text-[17px] font-bold font-plus-jakarta text-near-black leading-[1.35]">{blog.title}</div>
                <div className="text-[14px] text-dark-gray leading-[1.6] line-clamp-2">{blog.excerpt}</div>
                <div className="flex items-center gap-2.5 mt-auto pt-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${blog.avatarColor}`}>{blog.avatar}</div>
                  <div className="flex-1">
                    <div className="text-[13px] font-semibold text-near-black">{blog.name}</div>
                    <span className="bg-teal text-white text-[9px] font-bold uppercase px-1.5 py-[2px] rounded flex items-center gap-0.5 w-fit mt-0.5">
                      <Check size={10} /> VERIFIED DR.
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[13px] text-mid-gray">{blog.time} read</span>
                  <Button variant="text" className="!text-[13px]">Read More →</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="bg-gradient-to-br from-blue to-blue-dark py-20 text-center relative overflow-hidden before:content-[''] before:absolute before:-top-[40%] before:-right-[10%] before:w-[400px] before:h-[400px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-[28px] font-bold leading-[1.25] font-plus-jakarta text-white mb-2">{t('ctaTitle')}</h2>
          <p className="text-[17px] text-white/80">{t('ctaSubtitle')}</p>
          <div className="flex gap-3.5 justify-center flex-wrap mt-8">
            <Button variant="white">{t('ctaBtn1')}</Button>
            <Button variant="outline-white">{t('ctaBtn2')}</Button>
          </div>
        </div>
      </div>
    </>
  );
}
