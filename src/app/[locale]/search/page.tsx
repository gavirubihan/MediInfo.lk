'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import {
  Pill, Camera, Search, Filter, X, ChevronRight, ShieldCheck, Stethoscope,
  Sparkles, ArrowRight, ChevronDown
} from 'lucide-react';
import { sampleMedicines } from '@/data/medicinesData';
import { UploadPrescriptionButton } from '@/components/ui/UploadPrescriptionButton';

// ─── Types ────────────────────────────────────────────────────────────────────
type CategoryKey = string;

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES: CategoryKey[] = [
  'All',
  'Painkiller & Antipyretic',
  'Antibiotic (Penicillin Derivative)',
  'Antidiabetic (Biguanide)',
  'Antihistamine (2nd Generation)',
];
const POPULAR_SEARCHES = ['Paracetamol', 'Amoxicillin', 'Metformin', 'Cetirizine'];
const RX_OPTIONS = ['All', 'Required', 'Not Required'];

// ─── Category short labels for mobile chips ──────────────────────────────────
const CATEGORY_SHORT: Record<string, string> = {
  'All': 'All',
  'Painkiller & Antipyretic': 'Painkiller',
  'Antibiotic (Penicillin Derivative)': 'Antibiotic',
  'Antidiabetic (Biguanide)': 'Antidiabetic',
  'Antihistamine (2nd Generation)': 'Antihistamine',
};

// ─── Helper: active filter count ────────────────────────────────────────────
function activeFilterCount(cat: string, rx: string, q: string): number {
  let n = 0;
  if (cat !== 'All') n++;
  if (rx !== 'All') n++;
  if (q.trim()) n++;
  return n;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Pill-chip used in filter sidebar (desktop) and horizontal strip (mobile) */
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border text-[13px] font-semibold
        px-3.5 py-1.5 transition-all duration-200 cursor-pointer
        ${active
          ? 'bg-teal text-white border-teal shadow-[0_4px_12px_rgba(23,169,142,0.3)]'
          : 'bg-white text-mid-gray border-light-gray hover:border-teal/50 hover:text-dark-gray'
        }
      `}
    >
      {active && <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />}
      {label}
    </button>
  );
}

/** Premium medicine result card — vertical on ALL breakpoints */
function MedicineCard({ med, index }: { med: typeof sampleMedicines[0]; index: number }) {
  return (
    <Link
      href={`/medicine/${med.slug}`}
      className="no-underline text-current block h-full"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <article className="
        bg-white border border-light-gray/60 rounded-2xl overflow-hidden
        shadow-[0_2px_12px_rgba(0,0,0,0.04)]
        hover:shadow-[0_16px_40px_rgba(26,111,191,0.12)]
        hover:-translate-y-1.5 transition-all duration-300
        flex flex-col h-full group animate-slide-in-up
      ">

        {/* Image */}
        <div className="relative w-full h-[120px] sm:h-[190px] shrink-0 bg-off-white overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={med.coverImage}
            alt={med.genericName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* category badge — top left */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="
              inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full
              bg-blue text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wide
              shadow-[0_2px_8px_rgba(0,0,0,0.2)] backdrop-blur-sm
            ">
              {CATEGORY_SHORT[med.category] ?? med.category}
            </span>
          </div>

          {/* Rx / Verified — bottom right of image */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
            {med.prescriptionRequired ? (
              <span className="
                inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full
                bg-[#F5A623]/90 text-[#3D2000] text-[9px] sm:text-[10px] font-bold uppercase tracking-wide
                backdrop-blur-sm
              ">
                <Stethoscope size={10} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                Rx
              </span>
            ) : (
              <span className="
                inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full
                bg-teal/90 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wide
                backdrop-blur-sm
              ">
                <ShieldCheck size={10} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                OTC
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-5 flex flex-col flex-1">
          <div className="font-plus-jakarta font-extrabold text-[14px] sm:text-[17px] text-near-black leading-tight group-hover:text-blue transition-colors line-clamp-1 sm:line-clamp-none">
            {med.genericName}
          </div>
          <div className="text-[11px] sm:text-[12px] text-mid-gray mt-0.5 mb-2 sm:mb-3 font-medium truncate">
            {med.chemicalName}
          </div>

          <p className="text-[11px] sm:text-[13px] text-dark-gray leading-relaxed line-clamp-2 sm:line-clamp-2 flex-1">
            {med.localized.en.description}
          </p>

          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-light-gray/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
            <span className={`
              text-[9px] sm:text-[11px] font-bold uppercase px-2 sm:px-2.5 py-1 rounded-full tracking-wide w-fit
              ${med.prescriptionRequired
                ? 'bg-amber/10 text-[#B87A00] border border-amber/30'
                : 'bg-teal/10 text-teal border border-teal/20'
              }
            `}>
              {med.prescriptionRequired ? 'Prescription' : '✓ Verified'}
            </span>
            <span className="
              text-blue text-[11px] sm:text-[13px] font-bold flex items-center gap-1
              group-hover:gap-1.5 sm:group-hover:gap-2 transition-all duration-200 self-end sm:self-auto
            ">
              <span className="hidden min-[360px]:inline">View Details</span>
              <span className="min-[360px]:hidden">View</span>
              <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px]" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function SearchPage() {
  const t = useTranslations('SearchPage');
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('All');
  const [selectedRx, setSelectedRx] = useState<string>('All');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isUploadExpanded, setIsUploadExpanded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Prevent shaking from micro-scrolls or layout shifts during language change
      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  React.useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const filteredMedicines = sampleMedicines.filter((med) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === '' ||
      med.genericName.toLowerCase().includes(q) ||
      med.chemicalName.toLowerCase().includes(q) ||
      med.brandNames.some((b) => b.toLowerCase().includes(q)) ||
      med.category.toLowerCase().includes(q) ||
      med.localized.en.description.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    const matchesRx =
      selectedRx === 'All' ||
      (selectedRx === 'Required' && med.prescriptionRequired) ||
      (selectedRx === 'Not Required' && !med.prescriptionRequired);

    return matchesSearch && matchesCategory && matchesRx;
  });

  const numActiveFilters = activeFilterCount(selectedCategory, selectedRx, searchQuery);

  const handleReset = () => {
    setSelectedCategory('All');
    setSelectedRx('All');
    setSearchQuery('');
    searchRef.current?.focus();
  };

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO — Search Header
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0D3B6E] to-[#1A6FBF] pt-[108px] sm:pt-[120px] lg:pt-[150px] pb-14 lg:pb-24 text-white z-40">

        {/* Ambient decorative orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-blue/20 blur-[80px]" />
          <div className="absolute top-12 right-0 w-[320px] h-[320px] rounded-full bg-teal/15 blur-[60px]" />
          <div className="absolute bottom-0 left-1/3 w-[260px] h-[260px] rounded-full bg-blue-dark/30 blur-[50px]" />
          {/* subtle dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-between">

            {/* ── Left: Text + Search ──────────────────────────────────── */}
            <div className="flex-1 w-full pt-2 lg:pt-4 flex flex-col items-center lg:items-start">

              {/* Eyebrow tag */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-px bg-teal" />
                <p className="text-[11px] sm:text-[12px] text-teal uppercase tracking-[2px] font-bold">
                  {t('dbTag')}
                </p>
                <span className="w-5 h-px bg-teal" />
              </div>

              <h1 className="
                text-[30px] sm:text-[40px] lg:text-[50px] font-extrabold leading-[1.12]
                font-plus-jakarta text-white mb-4 text-center lg:text-left
                [text-shadow:0_2px_20px_rgba(0,0,0,0.2)]
              ">
                {t('title')}
              </h1>

              <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-white/80 mb-5 max-w-[480px] text-center lg:text-left leading-relaxed">
                {t('subtitle')}
              </p>

              {/* Stats strip */}
              <div className="flex items-center gap-4 sm:gap-6 mb-8 text-white/60 text-[12px] font-semibold flex-wrap justify-center lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <span className="text-teal font-bold text-[14px]">500+</span> Medicines
                </span>
                <span className="w-px h-3.5 bg-white/20" />
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-teal" /> Verified Data
                </span>
                <span className="w-px h-3.5 bg-white/20" />
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-teal" /> 3 Languages
                </span>
              </div>

              {/* ── Search bar ── */}
              <div className="w-full max-w-[620px]">
                <div className="relative group animate-pulse-glow rounded-2xl z-40">
                  {/* Glow ring — the signature element */}
                  <div className="
                    absolute -inset-[3px] rounded-[18px]
                    bg-gradient-to-r from-teal/60 via-blue/40 to-teal/60
                    opacity-0 group-focus-within:opacity-100
                    transition-opacity duration-500 blur-[6px]
                  " />
                  <div className="relative bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.2)] overflow-hidden">
                    <span className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-mid-gray pointer-events-none group-focus-within:text-blue transition-colors duration-200">
                      <Search size={20} />
                    </span>
                    <input
                      ref={searchRef}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      className="
                        w-full h-[56px] lg:h-[64px]
                        border-none pl-[44px] lg:pl-[52px] pr-[130px] lg:pr-[160px]
                        text-[15px] lg:text-[16px] font-sans text-dark-gray bg-transparent
                        outline-none placeholder:text-mid-gray/70
                      "
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('placeholder')}
                      id="medicine-search"
                      aria-label="Search medicines"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                        className="absolute right-[104px] sm:right-[110px] lg:right-[130px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-light-gray flex items-center justify-center text-mid-gray hover:bg-mid-gray hover:text-white transition-colors cursor-pointer"
                        aria-label="Clear search"
                      >
                        <X size={12} />
                      </button>
                    )}
                    <button
                      type="button"
                      className="
                        absolute right-2 lg:right-2.5 top-1/2 -translate-y-1/2
                        px-5 lg:px-7 py-2.5 lg:py-3
                        bg-gradient-to-br from-teal to-[#14927a] text-white
                        border-none rounded-[12px]
                        text-[14px] lg:text-[15px] font-bold font-sans cursor-pointer
                        transition-all duration-200 active:scale-95
                        shadow-[0_4px_14px_rgba(23,169,142,0.4)]
                        hover:shadow-[0_6px_20px_rgba(23,169,142,0.5)]
                      "
                    >
                      Search
                    </button>
                  </div>

                  {/* Autocomplete Dropdown */}
                  {searchQuery.trim().length > 0 && isSearchFocused && (
                    <div className="
                      absolute top-full left-0 right-0 mt-3
                      bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)]
                      border border-light-gray/60 overflow-hidden z-50
                      animate-fade-up
                    ">
                      {filteredMedicines.length > 0 ? (
                        <>
                          <div className="px-4 py-3 bg-off-white/80 border-b border-light-gray/50 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-mid-gray uppercase tracking-wider">Top Matches</span>
                            <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                              {filteredMedicines.length} found
                            </span>
                          </div>
                          <ul className="max-h-[300px] overflow-y-auto py-1 m-0 p-0 list-none">
                            {filteredMedicines.map((med) => (
                              <li key={med.id}>
                                <Link 
                                  href={`/medicine/${med.slug}`}
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-light/30 transition-colors group/item no-underline border-b border-light-gray/30 last:border-0"
                                >
                                  <div className="w-11 h-11 rounded-[10px] bg-white border border-light-gray/60 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                                    {med.coverImage ? (
                                      <img src={med.coverImage} alt={med.genericName} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300" />
                                    ) : (
                                      <Pill size={18} className="text-blue" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-plus-jakarta font-extrabold text-[14px] text-near-black truncate group-hover/item:text-blue transition-colors m-0 leading-tight">
                                      {med.genericName}
                                    </h4>
                                    <p className="text-[11px] font-medium text-mid-gray truncate mt-1 m-0">
                                      {med.chemicalName}
                                    </p>
                                  </div>
                                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                                    <span className={`
                                      text-[9px] font-bold uppercase px-2 py-0.5 rounded-full
                                      ${med.prescriptionRequired ? 'bg-amber/10 text-[#B87A00]' : 'bg-teal/10 text-teal'}
                                    `}>
                                      {med.prescriptionRequired ? 'Rx' : 'OTC'}
                                    </span>
                                    <ArrowRight size={14} className="text-light-gray group-hover/item:text-blue group-hover/item:-translate-x-0.5 transition-all" />
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <div className="p-8 text-center bg-off-white/40">
                          <div className="w-12 h-12 rounded-full bg-white border border-light-gray flex items-center justify-center mx-auto mb-3 shadow-sm">
                            <Search size={18} className="text-mid-gray" />
                          </div>
                          <p className="text-[14px] font-bold text-near-black m-0 font-plus-jakarta">No medicines found</p>
                          <p className="text-[12px] font-medium text-mid-gray mt-1 m-0">Try a different search term</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Popular searches */}
                <div className="flex gap-2 flex-wrap mt-5 items-center justify-center lg:justify-start">
                  <span className="text-[12px] text-white/50 font-medium mr-1">{t('popular')}</span>
                  {POPULAR_SEARCHES.map((med) => (
                    <button
                      key={med}
                      type="button"
                      onClick={() => setSearchQuery(med)}
                      className="
                        px-3 py-1.5 rounded-full text-[12px] font-semibold
                        bg-white/[0.08] text-white/80 border border-white/[0.15]
                        cursor-pointer font-sans transition-all duration-200
                        hover:bg-white/[0.16] hover:text-white hover:border-white/30
                        active:scale-95
                      "
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Mobile: OR divider ───────────────────────────────────── */}
            <div className="w-full flex items-center justify-center gap-4 lg:hidden opacity-50 my-2">
              <div className="h-px bg-white/30 w-full max-w-[100px]" />
              <span className="text-white text-[11px] font-bold tracking-[2px] uppercase shrink-0">Or</span>
              <div className="h-px bg-white/30 w-full max-w-[100px]" />
            </div>

            {/* ── Right: Upload Card ───────────────────────────────────── */}
            <div className="w-full max-w-[400px] shrink-0">
              {/* Teal accent top border */}
              <div className="h-1 w-full bg-gradient-to-r from-teal via-[#14927a] to-blue rounded-t-[24px]" />
              <div className="bg-white text-near-black rounded-b-[24px] p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">

                <div 
                  className="flex items-center justify-between cursor-pointer lg:cursor-default group"
                  onClick={() => setIsUploadExpanded(!isUploadExpanded)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-light flex items-center justify-center">
                      <Camera size={15} className="text-blue" />
                    </div>
                    <h3 className="font-plus-jakarta font-extrabold text-[16px] sm:text-[17px] text-near-black tracking-tight">
                      {t('uploadTitle')}
                    </h3>
                  </div>
                  <div className="lg:hidden w-7 h-7 rounded-full bg-off-white flex items-center justify-center text-mid-gray group-hover:bg-light-gray/50 transition-colors">
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isUploadExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                
                <p className="text-[12px] text-mid-gray mt-1 ml-9">
                  Scan your prescription — we&apos;ll find every medicine automatically.
                </p>

                <div className={`
                  grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${isUploadExpanded ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 lg:mt-5 lg:grid-rows-[1fr] lg:opacity-100'}
                `}>
                  <div className="overflow-hidden flex flex-col gap-4">
                    <UploadPrescriptionButton className="w-full">
                      <div className="
                        relative w-full border-2 border-dashed border-light-gray
                        bg-off-white rounded-[16px] h-[130px] sm:h-[148px]
                        flex flex-col items-center justify-center
                        cursor-pointer hover:border-blue hover:bg-blue-light/20
                        transition-all duration-300 group/drop overflow-hidden
                      ">
                        {/* hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue/0 to-teal/0 group-hover/drop:from-blue/5 group-hover/drop:to-teal/5 transition-all duration-500" />
                        <div className="
                          bg-white p-2.5 sm:p-3 rounded-xl shadow-sm mb-2 sm:mb-2.5
                          group-hover/drop:scale-110 group-hover/drop:shadow-[0_4px_16px_rgba(26,111,191,0.15)]
                          transition-all duration-300
                        ">
                          <Camera size={20} className="sm:w-6 sm:h-6 text-blue" />
                        </div>
                        <p className="text-[12px] sm:text-[13px] font-semibold text-dark-gray mb-0.5">{t('uploadDesc1')}</p>
                        <p className="text-[10px] sm:text-[11px] font-medium text-mid-gray">{t('uploadDesc2')}</p>
                      </div>
                    </UploadPrescriptionButton>

                    <UploadPrescriptionButton className="w-full">
                      <button
                        type="button"
                        className="
                          w-full bg-gradient-to-br from-blue to-blue-dark
                          hover:from-[#1d7dd6] hover:to-[#0f5aa8]
                          text-white py-3 sm:py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px]
                          shadow-[0_6px_20px_rgba(26,111,191,0.35)]
                          hover:shadow-[0_8px_28px_rgba(26,111,191,0.45)]
                          transition-all duration-200 cursor-pointer active:scale-[0.98]
                          flex items-center justify-center gap-2
                        "
                      >
                        <Camera size={16} className="sm:w-[17px] sm:h-[17px]" />
                        Upload Prescription
                      </button>
                    </UploadPrescriptionButton>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE FILTER CHIPS — horizontal scroll strip
      ════════════════════════════════════════════════════════════════════ */}
      <div className={`lg:hidden bg-white border-b border-light-gray/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sticky z-30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isNavVisible ? 'top-[62px] sm:top-[74px]' : 'top-0'}`}>
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
          {/* Filter icon + label */}
          <span className="flex items-center gap-1.5 text-[12px] font-bold text-mid-gray uppercase tracking-wide shrink-0 mr-1">
            <Filter size={13} />
            Filter
            {numActiveFilters > 0 && (
              <span className="w-4 h-4 rounded-full bg-teal text-white text-[9px] font-bold flex items-center justify-center">
                {numActiveFilters}
              </span>
            )}
          </span>
          <div className="w-px h-5 bg-light-gray shrink-0" />
          {/* Category chips */}
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              label={CATEGORY_SHORT[cat] ?? cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
          <div className="w-px h-5 bg-light-gray shrink-0" />
          {/* Rx chips */}
          {RX_OPTIONS.map((rx) => (
            <FilterChip
              key={rx}
              label={rx === 'Not Required' ? 'OTC Only' : rx === 'Required' ? 'Rx Only' : rx}
              active={selectedRx === rx}
              onClick={() => setSelectedRx(rx)}
            />
          ))}
          {numActiveFilters > 0 && (
            <>
              <div className="w-px h-5 bg-light-gray shrink-0" />
              <button
                type="button"
                onClick={handleReset}
                className="
                  shrink-0 flex items-center gap-1 text-[12px] font-bold text-red
                  border border-red/30 rounded-full px-3 py-1.5
                  hover:bg-red/5 transition-colors cursor-pointer
                "
              >
                <X size={11} /> Reset
              </button>
            </>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          RESULTS SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <div className="bg-off-white min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

            {/* ── Desktop Sidebar Filter ─────────────────────────────── */}
            <aside className="hidden lg:block h-fit sticky top-[100px]">
              <div className="bg-white border border-light-gray/60 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">

                {/* Sidebar header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-light-gray/50">
                  <div className="flex items-center gap-2 font-plus-jakarta font-bold text-[15px] text-near-black">
                    <div className="w-7 h-7 rounded-lg bg-blue-light flex items-center justify-center">
                      <Filter size={14} className="text-blue" />
                    </div>
                    Filter Results
                  </div>
                  {numActiveFilters > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/20">
                      {numActiveFilters} active
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col gap-6">

                  {/* Category */}
                  <div>
                    <div className="text-[11px] font-bold uppercase text-mid-gray tracking-[0.8px] mb-3">
                      Category
                    </div>
                    <div className="flex flex-col gap-2">
                      {CATEGORIES.map((cat) => (
                        <FilterChip
                          key={cat}
                          label={cat}
                          active={selectedCategory === cat}
                          onClick={() => setSelectedCategory(cat)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-light-gray/70" />

                  {/* Prescription */}
                  <div>
                    <div className="text-[11px] font-bold uppercase text-mid-gray tracking-[0.8px] mb-3">
                      Prescription
                    </div>
                    <div className="flex flex-col gap-2">
                      {RX_OPTIONS.map((rx) => (
                        <FilterChip
                          key={rx}
                          label={rx}
                          active={selectedRx === rx}
                          onClick={() => setSelectedRx(rx)}
                        />
                      ))}
                    </div>
                  </div>

                  {numActiveFilters > 0 && (
                    <>
                      <div className="h-px bg-light-gray/70" />
                      <button
                        type="button"
                        onClick={handleReset}
                        className="
                          w-full flex items-center justify-center gap-1.5
                          text-[12px] font-bold text-red py-2 rounded-xl
                          border border-red/25 hover:bg-red/5
                          transition-colors cursor-pointer
                        "
                      >
                        <X size={12} /> Reset All Filters
                      </button>
                    </>
                  )}
                </div>
              </div>
            </aside>

            {/* ── Results ──────────────────────────────────────────────── */}
            <div>

              {/* Results bar */}
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-[13px] text-mid-gray">
                    Showing{' '}
                    <strong className="text-near-black font-bold">
                      {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''}
                    </strong>
                  </p>
                  {/* Active filter pills */}
                  {selectedCategory !== 'All' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal/10 text-teal border border-teal/20">
                      {CATEGORY_SHORT[selectedCategory]}
                      <button onClick={() => setSelectedCategory('All')} className="cursor-pointer hover:text-red transition-colors" aria-label="Remove category filter"><X size={10} /></button>
                    </span>
                  )}
                  {selectedRx !== 'All' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber/10 text-[#B87A00] border border-amber/20">
                      {selectedRx}
                      <button onClick={() => setSelectedRx('All')} className="cursor-pointer hover:text-red transition-colors" aria-label="Remove Rx filter"><X size={10} /></button>
                    </span>
                  )}
                </div>
                {numActiveFilters > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[12px] font-bold text-mid-gray hover:text-red transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <X size={12} /> Clear all
                  </button>
                )}
              </div>

              {/* Cards Grid */}
              {filteredMedicines.length > 0 ? (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                  {filteredMedicines.map((med, i) => (
                    <MedicineCard key={med.id} med={med} index={i} />
                  ))}
                </div>
              ) : (
                /* ── Empty State ──────────────────────────────────────── */
                <div className="bg-white border border-light-gray/60 rounded-3xl p-12 sm:p-16 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <div className="w-16 h-16 rounded-2xl bg-blue-light flex items-center justify-center mx-auto mb-4">
                    <Pill size={28} className="text-blue" />
                  </div>
                  <h4 className="font-plus-jakarta font-extrabold text-near-black text-[18px] mb-2">
                    No medicines found
                  </h4>
                  <p className="text-[14px] text-mid-gray mb-6 max-w-[280px] mx-auto leading-relaxed">
                    Try adjusting your search or clearing the active filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="
                      inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                      bg-blue text-white text-[13px] font-bold
                      shadow-[0_4px_14px_rgba(26,111,191,0.3)]
                      hover:bg-blue-dark transition-colors cursor-pointer
                    "
                  >
                    <X size={13} /> Clear All Filters
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
