'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/Badge';
import { Pill, Camera, Search, Filter, ChevronDown, ChevronUp, Check, ExternalLink } from 'lucide-react';
import { sampleMedicines } from '@/data/medicinesData';

export default function SearchPage() {
  const t = useTranslations('SearchPage');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRx, setSelectedRx] = useState<string>('All');

  const categories = ['All', 'Painkiller & Antipyretic', 'Antibiotic (Penicillin Derivative)', 'Antidiabetic (Biguanide)', 'Antihistamine (2nd Generation)'];

  // Filtering Logic
  const filteredMedicines = sampleMedicines.filter((med) => {
    const matchesSearch =
      searchQuery === '' ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.chemicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.brandNames.some((brand) => brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.localized.en.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;

    const matchesRx =
      selectedRx === 'All' ||
      (selectedRx === 'Required' && med.prescriptionRequired) ||
      (selectedRx === 'Not Required' && !med.prescriptionRequired);

    return matchesSearch && matchesCategory && matchesRx;
  });

  return (
    <>
      {/* Search Header */}
      <div className="bg-gradient-to-br from-near-black via-blue-dark to-blue pt-[120px] lg:pt-[150px] pb-12 lg:pb-20 text-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-12">
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-between">
            
            {/* Left side: Text Search */}
            <div className="flex-1 w-full pt-2 lg:pt-4 flex flex-col items-center lg:items-start">
              <p className="text-[12px] sm:text-[13px] text-teal uppercase tracking-[1.5px] mb-2 sm:mb-3 font-bold text-center lg:text-left">{t('dbTag')}</p>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('placeholder')}
                  />
                  <button
                    type="button"
                    className="absolute right-2 lg:right-2.5 top-1/2 -translate-y-1/2 px-5 lg:px-8 py-[10px] lg:py-[12px] bg-teal text-white border-none rounded-[10px] lg:rounded-[12px] text-[14px] lg:text-[15px] font-bold font-sans cursor-pointer transition-all duration-300 hover:bg-teal/90 shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
                  >
                    Search
                  </button>
                </div>
                
                <div className="flex gap-2 flex-wrap mt-6 items-center justify-center lg:justify-start">
                  <span className="text-[12px] lg:text-[13px] text-white/70 mr-1 font-medium">{t('popular')}</span>
                  {['Paracetamol', 'Amoxicillin', 'Metformin', 'Cetirizine'].map((med) => (
                    <button
                      key={med}
                      type="button"
                      onClick={() => setSearchQuery(med)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-semibold bg-white/10 text-white border border-white/20 cursor-pointer font-sans transition-all duration-200 hover:bg-white/20 shadow-sm"
                    >
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

            {/* Right side: Image / Prescription Upload */}
            <div className="w-full max-w-[440px] bg-white text-near-black rounded-[28px] p-6 sm:p-8 shadow-2xl shrink-0">
              <h3 className="text-center font-bold text-[18px] lg:text-[20px] text-near-black mb-6 font-plus-jakarta tracking-tight">{t('uploadTitle')}</h3>
              
              <div className="relative border-2 border-dashed border-light-gray/80 bg-off-white/50 rounded-[20px] h-[160px] lg:h-[180px] flex flex-col items-center justify-center mb-6 cursor-pointer hover:border-blue hover:bg-blue-light/20 transition-all duration-300 group overflow-hidden">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Camera size={26} className="text-blue" />
                </div>
                <p className="text-[14px] font-semibold text-dark-gray mb-1">{t('uploadDesc1')}</p>
                <p className="text-[12px] font-medium text-mid-gray">{t('uploadDesc2')}</p>
              </div>

              <div className="flex justify-center">
                <button type="button" className="w-full bg-blue hover:bg-blue-dark text-white py-3.5 sm:py-4 rounded-xl font-bold text-[15px] shadow-lg transition-all cursor-pointer">
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
              className="lg:hidden p-5 flex items-center justify-between cursor-pointer transition-colors hover:bg-off-white/50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center gap-2 font-plus-jakarta font-bold text-[16px] text-near-black">
                <Filter size={18} className="text-blue" />
                {t('filterResults')}
              </div>
              <div className="bg-off-white w-8 h-8 rounded-full flex items-center justify-center">
                {isFilterOpen ? <ChevronUp size={18} className="text-mid-gray" /> : <ChevronDown size={18} className="text-mid-gray" />}
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex p-6 pb-0 font-plus-jakarta font-bold text-[16px] text-near-black items-center gap-2">
              <Filter size={18} className="text-blue" />
              {t('filterResults')}
            </div>

            {/* Filter Content */}
            <div className={`p-6 pt-2 lg:pt-5 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="h-px bg-light-gray mb-6 lg:hidden" />
              
              <div className="mb-6">
                <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">Category Filter</div>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-blue w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-dark-gray group-hover:text-blue transition-colors">{cat}</span>
                  </label>
                ))}
              </div>

              <div className="h-px bg-light-gray mb-5" />

              <div className="mb-6">
                <div className="text-[13px] font-bold uppercase text-mid-gray tracking-[0.5px] mb-2.5">Prescription Requirement</div>
                {['All', 'Required', 'Not Required'].map((rx) => (
                  <label key={rx} className="flex items-center gap-2 mb-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="rx"
                      checked={selectedRx === rx}
                      onChange={() => setSelectedRx(rx)}
                      className="accent-blue w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-dark-gray group-hover:text-blue transition-colors">{rx}</span>
                  </label>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedRx('All');
                  setSearchQuery('');
                }}
                className="w-full text-red text-xs font-bold py-2 rounded-lg hover:underline transition-colors text-center"
              >
                Reset All Filters
              </button>
            </div>
          </aside>

          {/* Results Grid */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="text-sm text-mid-gray">
                Showing <strong className="text-near-black font-bold">{filteredMedicines.length} medicine records</strong>
              </div>
            </div>

            {filteredMedicines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMedicines.map((med) => (
                  <Link key={med.id} href={`/medicine/${med.slug}`} className="no-underline text-current block h-full">
                    <div className="bg-white border border-light-gray/60 rounded-[20px] sm:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-row sm:flex-col h-full group">
                      
                      {/* Image Section */}
                      <div className="relative w-[120px] sm:w-full sm:h-[180px] shrink-0 bg-off-white overflow-hidden border-r sm:border-r-0 sm:border-b border-light-gray/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={med.coverImage} alt={med.genericName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 hidden sm:block">
                          <Badge variant="blue" className="shadow-sm">{med.category}</Badge>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-1 sm:mb-0 gap-2">
                          <div className="min-w-0">
                            <div className="font-plus-jakarta font-extrabold text-[16px] sm:text-[18px] text-near-black leading-tight group-hover:text-blue transition-colors truncate">{med.genericName}</div>
                            <div className="text-[12px] sm:text-[13px] text-mid-gray mt-0.5 sm:mt-1 truncate">{med.chemicalName}</div>
                          </div>
                          <div className="sm:hidden shrink-0 mt-0.5">
                            <Badge variant="blue" className="text-[9px] px-1.5 py-0.5 rounded-sm">{med.category}</Badge>
                          </div>
                        </div>
                        
                        <div className="text-[13px] sm:text-[14px] text-dark-gray leading-relaxed line-clamp-2 mt-2 sm:mt-3 mb-3 sm:mb-4 flex-1">
                          {med.localized.en.description}
                        </div>
                        
                        <div className="h-px bg-light-gray/50 mb-3 sm:mb-4 w-full" />
                        
                        <div className="flex justify-between items-center">
                          <span className={`text-[10px] sm:text-[11px] font-bold uppercase px-2 py-1 rounded tracking-wide ${
                            med.prescriptionRequired
                              ? 'bg-[#FFF8E8] text-[#B87A00]'
                              : 'bg-[rgba(23,169,142,0.12)] text-teal'
                          }`}>
                            {med.prescriptionRequired ? 'Prescription' : '✓ VERIFIED'}
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
            ) : (
              <div className="bg-white border border-light-gray rounded-3xl p-12 text-center space-y-3">
                <Pill size={32} className="text-mid-gray mx-auto" />
                <h4 className="font-bold text-near-black text-base m-0">No medicines found matching search</h4>
                <p className="text-xs text-mid-gray m-0">Try clearing filters or searching for another medicine name.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
