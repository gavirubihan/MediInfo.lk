'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { SearchInput } from '@/components/ui/SearchInput';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Pill, Syringe, Circle, AlertCircle, Camera, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function SearchPage() {
  const t = useTranslations('SearchPage');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <>
      {/* Search Header */}
      {/* Search Header */}
      <div className="bg-blue pt-[120px] lg:pt-[150px] pb-12 lg:pb-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-between">
            
            {/* Left side: Text Search */}
            <div className="flex-1 w-full pt-2 lg:pt-4 flex flex-col items-center lg:items-start">
              <p className="text-[12px] sm:text-[13px] text-white/70 uppercase tracking-[1.5px] mb-2 sm:mb-3 font-bold text-center lg:text-left">{t('dbTag')}</p>
              <h1 className="text-[32px] sm:text-[38px] lg:text-[46px] font-extrabold leading-[1.15] font-plus-jakarta text-white mb-3 sm:mb-5 text-center lg:text-left">{t('title')}</h1>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-white/85 mb-8 max-w-[500px] text-center lg:text-left leading-relaxed">{t('subtitle')}</p>
              
              <div className="w-full flex flex-col items-center lg:items-start">
                <div className="relative w-full max-w-[600px] shadow-[0_12px_32px_rgba(0,0,0,0.15)] rounded-2xl group transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
                  <span className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none transition-colors group-focus-within:text-blue">
                    <Search size={20} className="lg:w-[22px] lg:h-[22px]" />
                  </span>
                  <input
                    className="w-full h-[56px] lg:h-[64px] border-none rounded-2xl pl-[44px] lg:pl-[52px] pr-[96px] lg:pr-[126px] text-[15px] lg:text-[16px] font-sans text-dark-gray bg-white outline-none transition-all duration-300 placeholder:text-mid-gray/80 focus:ring-[4px] focus:ring-white/30"
                    type="text"
                    placeholder={t('placeholder')}
                  />
                  <button
                    className="absolute right-2 lg:right-2.5 top-1/2 -translate-y-1/2 px-5 lg:px-8 py-[10px] lg:py-[12px] bg-near-black text-white border-none rounded-[10px] lg:rounded-[12px] text-[14px] lg:text-[15px] font-bold font-sans cursor-pointer transition-all duration-300 hover:bg-dark-gray shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] hover:-translate-y-[calc(50%+2px)] active:scale-95"
                  >
                    Search
                  </button>
                </div>
                
                <div className="flex gap-2 flex-wrap mt-6 items-center justify-center lg:justify-start">
                  <span className="text-[12px] lg:text-[13px] text-white/70 mr-1 font-medium">{t('popular')}</span>
                  {['Paracetamol', 'Amoxicillin', 'Metformin', 'Omeprazole', 'Cetirizine'].map((med, i) => (
                    <button key={med} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-semibold bg-white/10 text-white border border-white/20 cursor-pointer font-sans transition-all duration-200 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 shadow-sm ${i > 2 ? 'hidden sm:block' : ''}`}>
                      {med}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Divider */}
            <div className="w-full flex items-center justify-center gap-4 lg:hidden opacity-60 my-4">
              <div className="h-px bg-white/30 w-full max-w-[80px] sm:max-w-[120px]"></div>
              <span className="text-white text-[12px] font-bold tracking-[2px] uppercase">Or</span>
              <div className="h-px bg-white/30 w-full max-w-[80px] sm:max-w-[120px]"></div>
            </div>

            {/* Right side: Image Upload */}
            <div className="w-full max-w-[440px] bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_24px_48px_rgba(0,0,0,0.2)] shrink-0 animate-in fade-in slide-in-from-bottom-4 lg:slide-in-from-right-8 duration-700">
              <h3 className="text-center font-bold text-[18px] lg:text-[20px] text-near-black mb-6 font-plus-jakarta tracking-tight">{t('uploadTitle')}</h3>
              
              <div className="relative border-2 border-dashed border-light-gray/80 bg-off-white/50 rounded-[20px] h-[160px] lg:h-[180px] flex flex-col items-center justify-center mb-6 cursor-pointer hover:border-blue hover:bg-blue-light/20 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 bg-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <Camera size={26} className="text-blue/70 group-hover:text-blue" />
                </div>
                <p className="text-[14px] font-semibold text-dark-gray mb-1">{t('uploadDesc1')}</p>
                <p className="text-[12px] font-medium text-mid-gray">{t('uploadDesc2')}</p>
              </div>

              <div className="flex justify-center">
                <button className="w-full bg-blue hover:bg-blue-dark text-white py-3.5 sm:py-4 rounded-xl font-bold text-[15px] shadow-[0_8px_20px_rgba(26,111,191,0.25)] hover:shadow-[0_12px_24px_rgba(26,111,191,0.35)] hover:-translate-y-1 transition-all duration-300 cursor-pointer active:scale-[0.98]">
                  Upload Prescription
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 py-10">
          
          {/* Sidebar Filters */}
          <aside className="bg-white border border-light-gray rounded-2xl shadow-sm overflow-hidden h-fit">
            {/* Mobile Toggle Header */}
            <div 
              className="lg:hidden p-5 flex items-center justify-between cursor-pointer transition-colors hover:bg-off-white/50 active:bg-off-white"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center gap-2 font-plus-jakarta font-bold text-[16px] text-near-black">
                <Filter size={18} className="text-blue" />
                {t('filterResults')}
              </div>
              <div className="bg-off-white w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300">
                {isFilterOpen ? <ChevronUp size={18} className="text-mid-gray" /> : <ChevronDown size={18} className="text-mid-gray" />}
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex p-6 pb-0 font-plus-jakarta font-bold text-[16px] text-near-black items-center gap-2">
              <Filter size={18} className="text-blue" />
              {t('filterResults')}
            </div>

            {/* Filter Content */}
            <div className={`p-6 pt-2 lg:pt-5 ${isFilterOpen ? 'block animate-in fade-in slide-in-from-top-4 duration-300' : 'hidden lg:block'}`}>
              <div className="h-px bg-light-gray mb-6 lg:hidden" />
              
              <div className="mb-6">
                <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">{t('category')}</div>
                {['Antibiotic', 'Painkiller', 'Antihistamine', 'Antacid', 'Vitamin', 'Antidiabetic'].map((cat, i) => (
                  <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked={i < 2} className="accent-blue w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-dark-gray group-hover:text-blue transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
              <div className="h-px bg-light-gray mb-5" />

              <div className="mb-6">
                <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">{t('language')}</div>
                {['English', 'සිංහල (Sinhala)', 'தமிழ் (Tamil)'].map((lang, i) => (
                  <label key={lang} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked={i < 2} className="accent-blue w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-dark-gray group-hover:text-blue transition-colors">{lang}</span>
                  </label>
                ))}
              </div>
              <div className="h-px bg-light-gray mb-5" />

              <div className="mb-6">
                <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">{t('ageGroup')}</div>
                {['All Ages', 'Adults Only', 'Children Safe', 'Elderly Friendly'].map((age, i) => (
                  <label key={age} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <input type="radio" name="age" defaultChecked={i === 0} className="accent-blue w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-dark-gray group-hover:text-blue transition-colors">{age}</span>
                  </label>
                ))}
              </div>
              <div className="h-px bg-light-gray mb-5" />

              <div className="mb-6">
                <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">{t('prescription')}</div>
                {['All', 'Required', 'Not Required'].map((rx, i) => (
                  <label key={rx} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <input type="radio" name="rx" defaultChecked={i === 0} className="accent-blue w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-dark-gray group-hover:text-blue transition-colors">{rx}</span>
                  </label>
                ))}
              </div>

              <button className="w-full lg:w-auto bg-off-white hover:bg-light-gray lg:bg-transparent lg:hover:bg-transparent border border-light-gray lg:border-none text-red py-2.5 lg:py-0 lg:mt-2 rounded-lg lg:rounded-none text-[13px] font-bold cursor-pointer transition-colors lg:hover:underline text-center lg:text-left">
                {t('clearFilters')}
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="text-sm text-mid-gray">{t('showing')} <strong className="text-near-black font-bold">24 results</strong> {t('resultsFor')} "All Medicines"</div>
              <select className="px-3.5 py-2 border-[1.5px] border-light-gray rounded-lg text-sm font-sans text-dark-gray outline-none cursor-pointer bg-white focus:border-blue">
                <option>Sort: Relevance</option>
                <option>A–Z</option>
                <option>Z–A</option>
                <option>By Category</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: 'Paracetamol', generic: 'Acetaminophen', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', tag: 'Painkiller', tagColor: 'blue', desc: 'Used for mild to moderate pain relief and fever reduction. Safe for most age groups.', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Amoxicillin', generic: 'Amoxicillin Trihydrate', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80', tag: 'Antibiotic', tagColor: 'blue', desc: 'Broad-spectrum antibiotic for bacterial infections including ear, throat, and urinary infections.', req: 'Prescription', reqColor: 'bg-[#FFF8E8] text-[#B87A00]' },
                { name: 'Metformin', generic: 'Metformin Hydrochloride', image: 'https://images.unsplash.com/photo-1550572017-edb148c40fa9?w=400&q=80', tag: 'Antidiabetic', tagColor: 'blue', desc: 'First-line treatment for type 2 diabetes. Helps control blood sugar levels effectively.', req: 'Prescription', reqColor: 'bg-[#FFF8E8] text-[#B87A00]' },
                { name: 'Omeprazole', generic: 'Omeprazole Magnesium', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&q=80', tag: 'Antacid', tagColor: 'blue', desc: 'Proton pump inhibitor that reduces stomach acid. Used for ulcers and acid reflux.', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Cetirizine', generic: 'Cetirizine Hydrochloride', image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&q=80', tag: 'Antihistamine', tagColor: 'blue', desc: 'Second-generation antihistamine for allergy relief including hay fever and urticaria.', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Warfarin', generic: 'Warfarin Sodium', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', tag: 'Warning', tagColor: 'red', desc: 'Blood thinner (anticoagulant) used to prevent blood clots. Requires careful monitoring.', req: 'Prescription', reqColor: 'bg-[#FFF8E8] text-[#B87A00]' },
                { name: 'Amlodipine', generic: 'Amlodipine Besylate', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&q=80', tag: 'Antihypertensive', tagColor: 'blue', desc: 'Calcium channel blocker used to treat high blood pressure and chest pain (angina).', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Vitamin D3', generic: 'Cholecalciferol', image: 'https://images.unsplash.com/photo-1550572017-edb148c40fa9?w=400&q=80', tag: 'Vitamin', tagColor: 'blue', desc: 'Essential vitamin for bone health, immune function, and calcium absorption. Safe for most.', req: '✓ VERIFIED', reqColor: 'bg-[rgba(23,169,142,0.12)] text-teal' },
                { name: 'Azithromycin', generic: 'Azithromycin Dihydrate', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&q=80', tag: 'Antibiotic', tagColor: 'blue', desc: 'Macrolide antibiotic for respiratory, skin, and soft tissue infections. Short course treatment.', req: 'Prescription', reqColor: 'bg-[#FFF8E8] text-[#B87A00]' },
              ].map((med, i) => (
                <Link key={i} href={`/medicine/${med.name.toLowerCase()}`} className="no-underline text-current block h-full">
                  <div className="bg-white border border-light-gray/60 rounded-[20px] sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-row sm:flex-col h-full group">
                    
                    {/* Image Section */}
                    <div className="relative w-[120px] sm:w-full sm:h-[180px] shrink-0 bg-off-white overflow-hidden border-r sm:border-r-0 sm:border-b border-light-gray/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={med.image} alt={med.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 right-3 hidden sm:block">
                        <Badge variant={med.tagColor as any} className="shadow-sm">{med.tag}</Badge>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1 sm:mb-0 gap-2">
                        <div className="min-w-0">
                          <div className="font-plus-jakarta font-extrabold text-[16px] sm:text-[18px] text-near-black leading-tight group-hover:text-blue transition-colors truncate">{med.name}</div>
                          <div className="text-[12px] sm:text-[13px] text-mid-gray mt-0.5 sm:mt-1 truncate">{med.generic}</div>
                        </div>
                        <div className="sm:hidden shrink-0 mt-0.5">
                          <Badge variant={med.tagColor as any} className="text-[9px] px-1.5 py-0.5 rounded-sm">{med.tag}</Badge>
                        </div>
                      </div>
                      
                      <div className="text-[13px] sm:text-[14px] text-dark-gray leading-relaxed line-clamp-2 mt-2 sm:mt-3 mb-3 sm:mb-4 flex-1">
                        {med.desc}
                      </div>
                      
                      <div className="h-px bg-light-gray/50 mb-3 sm:mb-4 w-full" />
                      
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] sm:text-[11px] font-bold uppercase px-2 py-1 rounded tracking-wide ${med.reqColor}`}>
                          {med.req}
                        </span>
                        <span className="text-blue text-[13px] sm:text-[14px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">View</span> &rarr;
                        </span>
                      </div>
                    </div>
                    
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex gap-1.5 justify-center mt-10 flex-wrap">
              <button className="px-3.5 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">← Prev</button>
              <button className="w-10 h-10 border-[1.5px] border-blue bg-blue rounded-lg text-sm font-semibold font-sans text-white cursor-pointer">1</button>
              <button className="w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">2</button>
              <button className="hidden sm:inline-block w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">3</button>
              <button className="hidden sm:inline-block w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">...</button>
              <button className="w-10 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">8</button>
              <button className="px-3.5 h-10 border-[1.5px] border-light-gray bg-white rounded-lg text-sm font-semibold font-sans text-dark-gray cursor-pointer transition-colors hover:border-blue hover:text-blue">Next →</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
