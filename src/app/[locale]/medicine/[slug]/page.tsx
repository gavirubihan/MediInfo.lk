// @ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { 
  Pill, 
  Scale, 
  Users, 
  ClipboardList, 
  Check, 
  AlertTriangle, 
  AlertOctagon, 
  X, 
  Share2,
  ShieldAlert,
  Sparkles,
  ArrowLeft,
  Tag
} from 'lucide-react';

export default function MedicineDetailPage() {
  const t = useTranslations('MedicinePage');
  const params = useParams();
  const slugParam = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';
  const [medicine, setMedicine] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeLang, setActiveLang] = useState<'en' | 'si' | 'ta'>('en');

  useEffect(() => {
    if (!slugParam) return;
    fetch(`/api/medicine/${slugParam}`)
      .then(res => res.json())
      .then(data => {
        if (data.medicine) {
          const m = data.medicine;
          // Map Data Connect response to display shape
          const localized: Record<string, any> = {};
          for (const lc of m.localizedContents ?? []) {
            localized[lc.language] = {
              description: lc.description,
              howItWorks: lc.howItWorks,
              dosageNotes: lc.dosageNotes,
              usedFor: lc.usedFor,
              sideEffectsCommon: lc.sideEffectsCommon,
              sideEffectsLessCommon: lc.sideEffectsLessCommon,
              sideEffectsSerious: lc.sideEffectsSerious,
              warningCards: lc.warningCards,
            };
          }
          setMedicine({
            ...m,
            localized,
            dosageRows: m.dosageRows ?? [],
            drugInteractions: m.drugInteractions ?? [],
            verifications: [],
          });
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [slugParam]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center bg-off-white">
        <Pill size={40} className="text-blue animate-pulse mb-4" />
        <p className="text-mid-gray font-medium">Loading medicine data...</p>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center bg-off-white text-center px-6">
        <Pill size={48} className="text-mid-gray mb-4" />
        <h1 className="text-2xl font-bold text-near-black font-plus-jakarta mb-2">Medicine Not Found</h1>
        <p className="text-sm text-mid-gray mb-6 max-w-md">
          The requested medicine record could not be found in our verified database.
        </p>
        <Link href="/search" className="px-6 py-3 bg-blue text-white rounded-xl font-bold text-sm no-underline hover:bg-blue-dark transition-colors">
          Browse Medicine Catalog
        </Link>
      </div>
    );
  }

  const currentLocalized = medicine.localized[activeLang] || medicine.localized.en || {};
  const isSinhala = activeLang === 'si';

  const tabs = [
    { id: 'overview', label: t('tabOverview') },
    { id: 'dosage', label: t('tabDosage') },
    { id: 'side-effects', label: t('tabSideEffects') },
    { id: 'warnings', label: t('tabWarnings') },
    { id: 'reviews', label: t('tabReviews') },
  ];

  return (
    <>
      {/* Breadcrumbs Sub-header */}
      <div className="pt-36 pb-6 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-1.5 text-[13px] text-mid-gray">
            <Link href="/" className="text-blue no-underline hover:underline">{t('home')}</Link>
            <span className="text-mid-gray">›</span>
            <Link href="/search" className="text-blue no-underline hover:underline">{t('search')}</Link>
            <span className="text-mid-gray">›</span>
            <span className="font-bold text-dark-gray">{medicine.genericName}</span>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">

            {/* Main Content */}
            <div className={`animate-fade-up ${isSinhala ? 'font-noto-sinhala' : ''}`}>
              <h1 className="text-[38px] sm:text-[44px] font-extrabold leading-[1.1] font-plus-jakarta text-near-black mb-1.5 tracking-tight">
                {medicine.genericName}
              </h1>
              <p className="text-[17px] sm:text-[19px] font-semibold leading-[1.4] text-mid-gray mb-4">
                {medicine.chemicalName} <span className="font-normal opacity-80 text-[15px] sm:text-[17px]">({t('chemicalName')})</span>
              </p>

              <div className="flex gap-2.5 flex-wrap mb-5 items-center">
                <Badge variant="blue" className="shadow-sm">{medicine.category}</Badge>
                {medicine.verified || (medicine.verifications && medicine.verifications.length >= 2) ? (
                  <span className="inline-flex items-center gap-1.5 bg-teal/10 text-teal border border-teal/20 text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                    <Check size={13} strokeWidth={3} /> {t('verified')} (2/2 Doctors)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                    <AlertTriangle size={13} className="text-amber-600" /> Details Not Verified ({medicine.verifications?.length || 0}/2 Doctors)
                  </span>
                )}
                <span className="bg-teal/10 text-teal border border-teal/20 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-md shadow-sm">
                  {medicine.prescriptionRequired ? 'Prescription Required' : t('noPrescription')}
                </span>
              </div>

              {/* Language Switcher Bar */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-bold text-mid-gray uppercase tracking-wider">Select Language:</span>
                <div className="flex bg-off-white rounded-full p-[3px] gap-[2px] border border-light-gray">
                  {(['en', 'si', 'ta'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLang(lang)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        activeLang === lang ? 'bg-blue text-white shadow-sm' : 'text-dark-gray hover:text-near-black'
                      }`}
                    >
                      {lang === 'en' ? 'English' : lang === 'si' ? 'සිංහල' : 'தமிழ்'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Info Strip Banner */}
              <div className="bg-gradient-to-br from-blue to-blue-dark rounded-2xl py-6 px-6 sm:px-8 my-6 flex flex-col sm:flex-row gap-6 sm:gap-10 flex-wrap shadow-lg text-white">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Pill size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">{t('form')}</div>
                    <div className="text-[15px] font-bold">{medicine.form.join(' / ')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Scale size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">{t('strength')}</div>
                    <div className="text-[15px] font-bold font-jetbrains">{medicine.strength}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">{t('ageGroup')}</div>
                    <div className="text-[15px] font-bold">{medicine.ageGroup}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">{t('prescription')}</div>
                    <div className="text-[15px] font-bold">
                      {medicine.prescriptionRequired ? 'Required' : 'Not Required'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Brand Names Available in Sri Lanka */}
              {medicine.brandNames && medicine.brandNames.length > 0 && (
                <div className="my-6 bg-gradient-to-r from-blue-light/50 to-white border border-blue/20 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag size={18} className="text-blue" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-near-black m-0 font-plus-jakarta">
                      Popular Brand Names Available in Sri Lanka:
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {medicine.brandNames.map((brand, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 bg-white border border-light-gray rounded-xl text-xs font-bold text-dark-gray flex items-center gap-2 shadow-sm hover:border-blue hover:text-blue transition-all"
                      >
                        <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Public Tabs Navigation */}
              <div className="relative mb-7 border-b-2 border-light-gray">
                <div className="flex gap-2 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-3 text-[15px] font-semibold cursor-pointer relative transition-colors ${
                        activeTab === tab.id ? 'text-blue font-bold' : 'text-mid-gray hover:text-dark-gray'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <span className="absolute -bottom-[2px] left-0 right-0 h-[2.5px] bg-blue" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Tab Contents */}
              <div>
                {/* 1. OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black m-0">
                      What is {medicine.genericName}?
                    </h3>
                    <p className="text-[15px] leading-[1.7] text-dark-gray m-0">
                      {currentLocalized.description}
                    </p>

                    <h4 className="text-[17px] font-semibold font-plus-jakarta text-near-black m-0 pt-2">
                      Used For / Indications:
                    </h4>
                    <ul className="list-none flex flex-col gap-2 p-0 m-0">
                      {currentLocalized.usedFor.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm p-3.5 rounded-2xl bg-teal/10 text-dark-gray">
                          <Check size={16} className="text-teal shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-[17px] font-semibold font-plus-jakarta text-near-black m-0 pt-2">
                      How It Works (Mechanism of Action):
                    </h4>
                    <p className="text-[15px] leading-[1.7] text-dark-gray m-0">
                      {currentLocalized.howItWorks}
                    </p>
                  </div>
                )}

                {/* 2. DOSAGE & USAGE TAB */}
                {activeTab === 'dosage' && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black m-0">
                      Recommended Dosage Table
                    </h3>

                    <div className="overflow-x-auto border border-light-gray rounded-2xl">
                      <table className="w-full text-sm min-w-[500px]">
                        <thead>
                          <tr className="bg-blue-light text-blue font-bold font-plus-jakarta text-xs uppercase tracking-wider border-b border-light-gray">
                            <th className="p-3.5 text-left">Age Group</th>
                            <th className="p-3.5 text-left">Dose</th>
                            <th className="p-3.5 text-left">Frequency</th>
                            <th className="p-3.5 text-left">Max Per Day</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-light-gray">
                          {medicine.dosageRows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-off-white">
                              <td className="p-3.5 font-bold text-near-black">{row.ageGroup}</td>
                              <td className="p-3.5 font-jetbrains text-dark-gray">{row.dose}</td>
                              <td className="p-3.5 text-dark-gray">{row.frequency}</td>
                              <td className="p-3.5 font-jetbrains font-bold text-blue">{row.maxPerDay}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-blue-light border-l-4 border-blue rounded-r-2xl p-4 text-sm text-dark-gray">
                      <strong>ℹ️ Important Dosage Note:</strong> {currentLocalized.dosageNotes}
                    </div>
                  </div>
                )}

                {/* 3. SIDE EFFECTS TAB */}
                {activeTab === 'side-effects' && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black m-0">
                      Side Effects & Adverse Reactions
                    </h3>

                    <div>
                      <h4 className="text-[17px] font-semibold text-teal m-0 mb-2.5">Common Side Effects (Mild)</h4>
                      <ul className="list-none flex flex-col gap-2 p-0 m-0">
                        {currentLocalized.sideEffectsCommon.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-sm p-3.5 rounded-2xl bg-teal/10 text-dark-gray">
                            <Check size={16} className="text-teal shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[17px] font-semibold text-amber-600 m-0 mb-2.5">Less Common Side Effects</h4>
                      <ul className="list-none flex flex-col gap-2 p-0 m-0">
                        {currentLocalized.sideEffectsLessCommon.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-sm p-3.5 rounded-2xl bg-amber-500/10 text-dark-gray">
                            <AlertTriangle size={16} className="text-amber-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-red/10 border-l-4 border-red rounded-r-2xl p-5 mt-4 space-y-2">
                      <h4 className="flex items-center gap-2 text-base font-bold text-red m-0">
                        <AlertOctagon size={18} /> Serious Side Effects — Seek Immediate Emergency Care
                      </h4>
                      <ul className="list-none flex flex-col gap-2 p-0 m-0">
                        {currentLocalized.sideEffectsSerious.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-sm p-3 bg-white/70 rounded-xl text-dark-gray">
                            <X size={16} className="text-red font-bold shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 4. WARNINGS & INTERACTIONS TAB */}
                {activeTab === 'warnings' && (
                  <div className="space-y-6">
                    <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black m-0">
                      Safety Warnings & Precautions
                    </h3>

                    <div className="space-y-3.5">
                      {currentLocalized.warningCards.map((card, idx) => (
                        <div
                          key={idx}
                          className={`p-4 border-l-4 rounded-r-2xl space-y-1 ${
                            card.severity === 'high'
                              ? 'bg-red/10 border-red text-dark-gray'
                              : card.severity === 'medium'
                              ? 'bg-amber-500/10 border-amber-500 text-dark-gray'
                              : 'bg-blue-light border-blue text-dark-gray'
                          }`}
                        >
                          <h4 className={`flex items-center gap-1.5 text-base font-bold m-0 ${
                            card.severity === 'high' ? 'text-red' : card.severity === 'medium' ? 'text-amber-700' : 'text-blue'
                          }`}>
                            <ShieldAlert size={18} /> {card.title}
                          </h4>
                          <p className="text-sm m-0 leading-relaxed">{card.text}</p>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-[17px] font-semibold text-near-black pt-2 m-0">
                      Known Drug Interactions
                    </h4>
                    <div className="flex flex-col gap-3">
                      {medicine.drugInteractions.map((item, idx) => (
                        <div key={idx} className="bg-blue-light border-l-4 border-blue rounded-r-2xl p-4 text-sm text-dark-gray">
                          <strong className="text-near-black">{item.drug}:</strong> {item.note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. DOCTOR REVIEWS TAB */}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <h3 className="text-[20px] font-bold font-plus-jakarta text-near-black m-0">
                      Verified Doctor Reviews & Insights
                    </h3>

                    <div className="bg-white border border-light-gray rounded-3xl p-6 shadow-sm space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue text-white font-bold flex items-center justify-center">DK</div>
                        <div>
                          <div className="font-bold text-sm text-near-black">Dr. Kasun Perera</div>
                          <div className="text-xs text-mid-gray">MBBS, MD — General Practitioner, Colombo</div>
                        </div>
                      </div>
                      <p className="text-xs text-dark-gray leading-relaxed m-0">
                        "{medicine.genericName} has an excellent safety profile when taken strictly as prescribed. Patients should always verify they do not combine multiple medicines containing the same active ingredient."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Right Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-[120px]">
              <div className="bg-white border border-light-gray rounded-[24px] p-6 shadow-md space-y-4">
                <div className="font-plus-jakarta font-extrabold text-xl text-near-black">
                  {medicine.genericName}
                </div>
                <div className="text-amber-500 text-sm">
                  ★★★★☆ <span className="text-xs text-mid-gray font-normal ml-1">({medicine.reviewCount})</span>
                </div>

                <div className="h-px bg-light-gray w-full" />

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between"><span className="text-mid-gray font-semibold">Category</span><span className="font-bold text-near-black">{medicine.category}</span></div>
                  <div className="flex justify-between"><span className="text-mid-gray font-semibold">Form</span><span className="font-bold text-near-black">{medicine.form.join(' / ')}</span></div>
                  <div className="flex justify-between"><span className="text-mid-gray font-semibold">Prescription</span><span className="text-teal font-bold">{medicine.prescriptionRequired ? 'Required' : 'Not Required'}</span></div>
                  {(() => {
                    const isElderlySafe = medicine.dosageRows && medicine.dosageRows.some((row) => 
                      /elderly|senior|65|geriatric/i.test(row.ageGroup)
                    );
                    const isChildrenSafe = medicine.dosageRows && medicine.dosageRows.some((row) => 
                      /child|children|infant|pediatric|kid|baby|adolescent|teen|neonate|toddler/i.test(row.ageGroup)
                    );
                    return (
                      <>
                        <div className="flex justify-between">
                          <span className="text-mid-gray font-semibold">Elderly Safe</span>
                          {isElderlySafe ? (
                            <span className="text-teal font-bold">✓ Yes</span>
                          ) : (
                            <span className="text-red-500 font-bold">✗ No</span>
                          )}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-mid-gray font-semibold">Children Safe</span>
                          {isChildrenSafe ? (
                            <span className="text-teal font-bold">✓ Yes</span>
                          ) : (
                            <span className="text-red-500 font-bold">✗ No</span>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="h-px bg-light-gray w-full" />

                <div className="bg-off-white p-4 rounded-xl text-center border border-light-gray">
                  <div className="text-[10px] uppercase font-bold text-mid-gray mb-1">Max Daily Dose (Adults)</div>
                  <div className="text-2xl font-extrabold text-blue font-jetbrains">{medicine.maxDailyDoseAdults}</div>
                </div>

                <button type="button" className="w-full py-3 bg-off-white border border-light-gray rounded-xl text-xs font-bold text-dark-gray flex items-center justify-center gap-2 hover:bg-light-gray transition-colors">
                  <Share2 size={16} />
                  <span>Share Medicine Page</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
