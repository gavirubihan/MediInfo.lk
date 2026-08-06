'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { Pill, Scale, Users, ClipboardList, Check, AlertTriangle, AlertOctagon, X, Download, Share2, Camera } from 'lucide-react';

export default function MedicineDetailPage() {
  const t = useTranslations('MedicinePage');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeLang, setActiveLang] = useState('EN');
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Show disclaimer shortly after page load
    const timer = setTimeout(() => setShowDisclaimer(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: t('tabOverview') },
    { id: 'dosage', label: t('tabDosage') },
    { id: 'side-effects', label: t('tabSideEffects') },
    { id: 'warnings', label: t('tabWarnings') },
    { id: 'reviews', label: t('tabReviews') },
  ];

  return (
    <>
      <div className="pt-36 pb-6 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-1.5 text-[13px] text-mid-gray">
            <Link href="/" className="text-blue no-underline hover:underline">{t('home')}</Link>
            <span className="text-mid-gray">›</span>
            <Link href="/search" className="text-blue no-underline hover:underline">{t('search')}</Link>
            <span className="text-mid-gray">›</span>
            <span>Paracetamol</span>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">

            {/* Main Content */}
            <div className="animate-fade-up">
              <h1 className="text-[38px] sm:text-[44px] font-extrabold leading-[1.1] font-plus-jakarta text-near-black mb-1.5 tracking-tight">Paracetamol</h1>
              <p className="text-[17px] sm:text-[19px] font-semibold leading-[1.4] text-mid-gray mb-4">Acetaminophen <span className="font-normal opacity-80 text-[15px] sm:text-[17px]">{t('genericName')}</span></p>

              <div className="flex gap-2.5 flex-wrap mb-5 items-center">
                <Badge variant="blue" className="shadow-[0_2px_8px_rgba(26,111,191,0.15)]">Painkiller</Badge>
                <Badge variant="blue" className="shadow-[0_2px_8px_rgba(26,111,191,0.15)]">Antipyretic</Badge>
                <Badge variant="teal" className="flex items-center gap-1 shadow-[0_2px_8px_rgba(23,169,142,0.15)]"><Check size={12} strokeWidth={3} /> {t('verified')}</Badge>
                <span className="bg-teal/10 text-teal border border-teal/20 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-md shadow-[0_2px_8px_rgba(23,169,142,0.1)] flex items-center h-[26px]">{t('noPrescription')}</span>
              </div>

              <div className="mb-5">
                <div className="flex bg-off-white rounded-full p-[3px] gap-[2px] w-fit">
                  {['EN', 'සි', 'த'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-3 py-1.5 border-none cursor-pointer rounded-[17px] text-[13px] font-semibold transition-all duration-200 ${activeLang === lang ? 'bg-blue text-white' : 'bg-transparent text-dark-gray'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Strip */}
              <div className="bg-gradient-to-br from-blue to-blue-dark rounded-2xl py-6 px-6 sm:px-8 my-6 flex flex-col sm:flex-row gap-6 sm:gap-10 flex-wrap shadow-[0_12px_24px_rgba(26,111,191,0.25)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-[0.04] rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex items-center gap-3.5 text-white relative z-10 group-hover:translate-x-0.5 transition-transform">
                  <div className="flex items-center justify-center shrink-0 w-11 h-11 bg-white/10 rounded-full shadow-inner"><Pill size={20} /></div>
                  <div><div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">{t('form')}</div><div className="text-[15px] font-bold tracking-tight">Tablet / Syrup</div></div>
                </div>
                <div className="flex items-center gap-3.5 text-white relative z-10 group-hover:translate-x-0.5 transition-transform delay-75">
                  <div className="flex items-center justify-center shrink-0 w-11 h-11 bg-white/10 rounded-full shadow-inner"><Scale size={20} /></div>
                  <div><div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">{t('strength')}</div><div className="text-[15px] font-bold font-jetbrains tracking-tight">500mg / 1000mg</div></div>
                </div>
                <div className="flex items-center gap-3.5 text-white relative z-10 group-hover:translate-x-0.5 transition-transform delay-100">
                  <div className="flex items-center justify-center shrink-0 w-11 h-11 bg-white/10 rounded-full shadow-inner"><Users size={20} /></div>
                  <div><div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">{t('ageGroup')}</div><div className="text-[15px] font-bold tracking-tight">Adults & Children</div></div>
                </div>
                <div className="flex items-center gap-3.5 text-white relative z-10 group-hover:translate-x-0.5 transition-transform delay-150">
                  <div className="flex items-center justify-center shrink-0 w-11 h-11 bg-white/10 rounded-full shadow-inner"><ClipboardList size={20} /></div>
                  <div><div className="text-[11px] uppercase tracking-wider opacity-80 font-bold mb-0.5">{t('prescription')}</div><div className="text-[15px] font-bold tracking-tight">Not Required</div></div>
                </div>
              </div>

              {/* Tabs */}
              <div className="relative mb-7 border-b-2 border-light-gray">
                <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollbar relative z-0">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-3 border-none bg-transparent text-[15px] font-semibold font-sans cursor-pointer relative transition-colors duration-200 shrink-0 ${activeTab === tab.id ? 'text-blue' : 'text-mid-gray hover:text-dark-gray'}`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-blue" />
                      )}
                    </button>
                  ))}
                  {/* Extra padding at the end so the last tab isn't obscured by the fade gradient */}
                  <div className="w-6 shrink-0 md:hidden" />
                </div>
                {/* Scroll Indicator Edge Fade (Mobile Only) */}
                <div className="absolute right-0 top-0 bottom-[2px] w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden" />
              </div>

              {/* Tab Contents */}
              <div className="animate-fade-up">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-[20px] font-bold leading-[1.3] font-plus-jakarta text-near-black mb-3">What is Paracetamol?</h3>
                    <p className="text-[15px] leading-[1.65] mb-4 text-dark-gray">Paracetamol (also known as acetaminophen) is one of the most widely used medicines in the world. It belongs to the analgesic (pain reliever) and antipyretic (fever reducer) class of medications. It is available over the counter in most countries without a prescription.</p>
                    <h4 className="text-[17px] font-semibold leading-[1.4] font-plus-jakarta text-near-black mb-2">Used For:</h4>
                    <ul className="list-none flex flex-col gap-1.5 mb-5 p-0">
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[rgba(23,169,142,0.08)] text-dark-gray"><Check size={16} className="text-teal shrink-0" /> Mild to moderate pain (headache, toothache, back pain)</li>
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[rgba(23,169,142,0.08)] text-dark-gray"><Check size={16} className="text-teal shrink-0" /> Fever reduction in adults and children</li>
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[rgba(23,169,142,0.08)] text-dark-gray"><Check size={16} className="text-teal shrink-0" /> Post-vaccination fever and discomfort</li>
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[rgba(23,169,142,0.08)] text-dark-gray"><Check size={16} className="text-teal shrink-0" /> Muscle aches and cold/flu symptoms</li>
                    </ul>
                    <h4 className="text-[17px] font-semibold leading-[1.4] font-plus-jakarta text-near-black mb-2">How It Works:</h4>
                    <p className="text-[15px] leading-[1.65] text-dark-gray">Paracetamol works by blocking pain signals in the brain and reducing fever by acting on the hypothalamus — the part of the brain that regulates body temperature. Unlike NSAIDs such as ibuprofen, paracetamol does not reduce inflammation.</p>
                  </div>
                )}

                {activeTab === 'dosage' && (
                  <div>
                    <h3 className="text-[20px] font-bold leading-[1.3] font-plus-jakarta text-near-black mb-4">Recommended Dosage</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse my-4 text-sm min-w-[500px]">
                        <thead>
                          <tr>
                            <th className="bg-blue-light px-3.5 py-2.5 text-left font-bold text-blue font-plus-jakarta text-xs uppercase tracking-[0.3px] rounded-tl-lg">Age Group</th>
                            <th className="bg-blue-light px-3.5 py-2.5 text-left font-bold text-blue font-plus-jakarta text-xs uppercase tracking-[0.3px]">Dose</th>
                            <th className="bg-blue-light px-3.5 py-2.5 text-left font-bold text-blue font-plus-jakarta text-xs uppercase tracking-[0.3px]">Frequency</th>
                            <th className="bg-blue-light px-3.5 py-2.5 text-left font-bold text-blue font-plus-jakarta text-xs uppercase tracking-[0.3px] rounded-tr-lg">Max Per Day</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-off-white border-b border-light-gray">
                            <td className="px-3.5 py-2.5"><strong>Adults (≥18 yrs)</strong></td>
                            <td className="px-3.5 py-2.5 font-jetbrains">500–1000mg</td>
                            <td className="px-3.5 py-2.5">Every 4–6 hours</td>
                            <td className="px-3.5 py-2.5 font-jetbrains"><strong>4000mg</strong></td>
                          </tr>
                          <tr className="hover:bg-off-white border-b border-light-gray">
                            <td className="px-3.5 py-2.5"><strong>Elderly (≥65 yrs)</strong></td>
                            <td className="px-3.5 py-2.5 font-jetbrains">500mg</td>
                            <td className="px-3.5 py-2.5">Every 6–8 hours</td>
                            <td className="px-3.5 py-2.5 font-jetbrains"><strong>2000mg</strong></td>
                          </tr>
                          <tr className="hover:bg-off-white border-b border-light-gray">
                            <td className="px-3.5 py-2.5"><strong>Children (6–12 yrs)</strong></td>
                            <td className="px-3.5 py-2.5 font-jetbrains">250–500mg</td>
                            <td className="px-3.5 py-2.5">Every 4–6 hours</td>
                            <td className="px-3.5 py-2.5 font-jetbrains"><strong>2000mg</strong></td>
                          </tr>
                          <tr className="hover:bg-off-white border-b-0">
                            <td className="px-3.5 py-2.5"><strong>Children (1–5 yrs)</strong></td>
                            <td className="px-3.5 py-2.5 font-jetbrains">120–250mg</td>
                            <td className="px-3.5 py-2.5">Every 4–6 hours</td>
                            <td className="px-3.5 py-2.5 font-jetbrains"><strong>1000mg</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-blue-light border-l-4 border-blue rounded-r-xl px-5 py-4 border-t border-r border-b border-blue/20 mt-4 text-[15px] text-dark-gray">
                      <strong>ℹ️ Important Note:</strong> Always follow your doctor's prescription. Do not exceed the maximum daily dose. Leave at least 4 hours between doses.
                    </div>
                  </div>
                )}

                {activeTab === 'side-effects' && (
                  <div>
                    <h3 className="text-[20px] font-bold leading-[1.3] font-plus-jakarta text-near-black mb-4">Side Effects</h3>
                    <h4 className="text-[17px] font-semibold font-plus-jakarta text-teal mb-2.5">Common (usually mild)</h4>
                    <ul className="list-none flex flex-col gap-2 mb-6 p-0">
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[rgba(23,169,142,0.08)] text-dark-gray"><Check size={16} className="text-teal shrink-0" /> Generally very well tolerated at recommended doses</li>
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[rgba(23,169,142,0.08)] text-dark-gray"><Check size={16} className="text-teal shrink-0" /> Mild nausea in some patients (rare)</li>
                    </ul>
                    <h4 className="text-[17px] font-semibold font-plus-jakarta text-amber mb-2.5">Less Common</h4>
                    <ul className="list-none flex flex-col gap-2 mb-6 p-0">
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[#FFFBF0] text-dark-gray"><AlertTriangle size={16} className="text-amber-500 shrink-0" /> Skin rash or itching</li>
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[#FFFBF0] text-dark-gray"><AlertTriangle size={16} className="text-amber-500 shrink-0" /> Stomach upset or discomfort</li>
                      <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[#FFFBF0] text-dark-gray"><AlertTriangle size={16} className="text-amber-500 shrink-0" /> Mild increase in liver enzymes (with long-term use)</li>
                    </ul>
                    <div className="bg-[#FFF5F5] border-l-4 border-red rounded-r-xl px-5 py-4 border-t border-r border-b border-[#FFD5D5]">
                      <h4 className="flex items-center gap-2 text-[17px] font-semibold font-plus-jakarta text-red mb-2"><AlertOctagon size={18} /> Serious — Seek Medical Help Immediately</h4>
                      <ul className="list-none flex flex-col gap-2 p-0">
                        <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[#FFF5F5] text-dark-gray"><X size={16} className="text-red font-bold shrink-0" /> Signs of liver damage (jaundice, dark urine, severe nausea)</li>
                        <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[#FFF5F5] text-dark-gray"><X size={16} className="text-red font-bold shrink-0" /> Severe allergic reaction (rash, swelling, difficulty breathing)</li>
                        <li className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-[#FFF5F5] text-dark-gray"><X size={16} className="text-red font-bold shrink-0" /> Blood in urine or unusual bruising</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'warnings' && (
                  <div>
                    <h3 className="text-[20px] font-bold leading-[1.3] font-plus-jakarta text-near-black mb-4">Warnings & Precautions</h3>
                    <div className="bg-[#FFF5F5] border-l-4 border-red rounded-r-xl px-5 py-4 border-t border-r border-b border-[#FFD5D5] mb-4">
                      <h4 className="flex items-center gap-1.5 text-[17px] font-semibold font-plus-jakarta text-red mb-1.5"><AlertTriangle size={18} /> Alcohol Warning</h4>
                      <p className="text-[15px] leading-[1.65] text-dark-gray m-0">Do not take paracetamol if you regularly consume alcohol. Combining alcohol with paracetamol significantly increases the risk of severe liver damage.</p>
                    </div>
                    <div className="bg-[#FFF5F5] border-l-4 border-red rounded-r-xl px-5 py-4 border-t border-r border-b border-[#FFD5D5] mb-4">
                      <h4 className="flex items-center gap-1.5 text-[17px] font-semibold font-plus-jakarta text-red mb-1.5"><AlertTriangle size={18} /> Liver Disease</h4>
                      <p className="text-[15px] leading-[1.65] text-dark-gray m-0">Patients with liver disease or hepatitis should use paracetamol only under medical supervision. Reduce dose or avoid entirely if liver function is impaired.</p>
                    </div>
                    <div className="bg-[#FFF5F5] border-l-4 border-red rounded-r-xl px-5 py-4 border-t border-r border-b border-[#FFD5D5] mb-6">
                      <h4 className="flex items-center gap-1.5 text-[17px] font-semibold font-plus-jakarta text-red mb-1.5"><AlertTriangle size={18} /> Overdose Risk</h4>
                      <p className="text-[15px] leading-[1.65] text-dark-gray m-0">Paracetamol overdose is one of the most common causes of acute liver failure. Never exceed 4g/day in adults. Seek emergency care immediately if overdose is suspected.</p>
                    </div>
                    <h4 className="text-[17px] font-semibold font-plus-jakarta text-near-black mb-3">Drug Interactions</h4>
                    <div className="flex flex-col gap-2.5">
                      <div className="bg-blue-light border-l-4 border-blue rounded-r-xl px-5 py-4 border border-blue/20 text-[15px] text-dark-gray"><strong>Warfarin</strong> — Paracetamol may enhance the anticoagulant effect. Monitor INR closely.</div>
                      <div className="bg-blue-light border-l-4 border-blue rounded-r-xl px-5 py-4 border border-blue/20 text-[15px] text-dark-gray"><strong>Carbamazepine / Phenytoin</strong> — These drugs may increase liver toxicity of paracetamol.</div>
                      <div className="bg-blue-light border-l-4 border-blue rounded-r-xl px-5 py-4 border border-blue/20 text-[15px] text-dark-gray"><strong>Other Paracetamol-containing products</strong> — Avoid combining (risk of overdose). Check all cold/flu medicines.</div>
                    </div>
                    <div className="flex gap-2.5 flex-wrap mt-5">
                      <Badge variant="blue">Safe in Pregnancy (1st Trimester)</Badge>
                      <Badge variant="teal">Safe for Breastfeeding</Badge>
                      <Badge variant="blue">Safe for Elderly (reduced dose)</Badge>
                      <Badge variant="blue">Safe for Children</Badge>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-[20px] font-bold leading-[1.3] font-plus-jakarta text-near-black mb-5">Doctor Reviews <span className="text-[13px] text-mid-gray font-normal">(12 verified reviews)</span></h3>

                    <div className="bg-white border border-light-gray rounded-2xl p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-full bg-blue text-white font-bold text-base flex items-center justify-center shrink-0">DK</div>
                        <div>
                          <div className="font-bold text-[15px] text-near-black">Dr. Kasun Perera</div>
                          <div className="text-[13px] text-mid-gray">MBBS — General Practitioner, Colombo</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="text-amber-500 text-sm">★★★★★</div>
                            <span className="bg-teal text-white text-[9px] font-bold uppercase px-1.5 py-[2px] rounded flex items-center gap-0.5"><Check size={10} /> VERIFIED DR.</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] text-dark-gray leading-[1.6]">Paracetamol remains my first-line recommendation for fever and mild pain management. It has an excellent safety profile when used correctly. I always advise patients to never combine it with alcohol and to check other medications for hidden paracetamol content.</p>
                    </div>

                    <div className="bg-white border border-light-gray rounded-2xl p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-full bg-teal text-white font-bold text-base flex items-center justify-center shrink-0">DF</div>
                        <div>
                          <div className="font-bold text-[15px] text-near-black">Dr. Fatima Aslam</div>
                          <div className="text-[13px] text-mid-gray">MD — Geriatric Medicine, Kandy Teaching Hospital</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="text-amber-500 text-sm">★★★★☆</div>
                            <span className="bg-teal text-white text-[9px] font-bold uppercase px-1.5 py-[2px] rounded flex items-center gap-0.5"><Check size={10} /> VERIFIED DR.</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] text-dark-gray leading-[1.6]">For elderly patients, I recommend using a lower dose of 500mg every 6–8 hours. The liver's metabolic capacity decreases with age, and paracetamol is still safer than NSAIDs for older adults in terms of gastrointestinal and cardiovascular risk.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="bg-white border border-light-gray rounded-[24px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] lg:sticky lg:top-[120px] self-start w-full transition-all duration-300">
              <div className="font-plus-jakarta font-extrabold text-xl text-near-black mb-1.5 tracking-tight">Paracetamol</div>
              <div className="flex items-center gap-1 text-amber-500 text-[15px] mb-5">
                ★★★★☆ <span className="text-[13px] text-mid-gray font-sans ml-1 font-medium hover:underline cursor-pointer transition-colors">(12 Verified Dr Reviews)</span>
              </div>
              
              <div className="h-px bg-light-gray/60 mb-5 w-full" />
              
              <div className="flex flex-col gap-3.5">
                <div className="flex justify-between items-center text-[14px] group"><span className="text-mid-gray font-medium group-hover:text-dark-gray transition-colors">Category</span><span className="font-bold text-near-black">Painkiller</span></div>
                <div className="flex justify-between items-center text-[14px] group"><span className="text-mid-gray font-medium group-hover:text-dark-gray transition-colors">Form</span><span className="font-bold text-near-black">Tablet / Syrup</span></div>
                <div className="flex justify-between items-center text-[14px] group"><span className="text-mid-gray font-medium group-hover:text-dark-gray transition-colors">Prescription</span><span className="text-teal font-bold bg-teal/10 px-2 py-0.5 rounded text-[12px] uppercase tracking-wide border border-teal/20">Not Required</span></div>
                <div className="flex justify-between items-center text-[14px] group"><span className="text-mid-gray font-medium group-hover:text-dark-gray transition-colors">Elderly Safe</span><span className="text-teal font-bold flex items-center gap-1.5"><Check size={16} strokeWidth={2.5} /> Yes (low dose)</span></div>
                <div className="flex justify-between items-center text-[14px] group"><span className="text-mid-gray font-medium group-hover:text-dark-gray transition-colors">Children Safe</span><span className="text-teal font-bold flex items-center gap-1.5"><Check size={16} strokeWidth={2.5} /> Yes</span></div>
                <div className="flex justify-between items-center text-[14px] group"><span className="text-mid-gray font-medium group-hover:text-dark-gray transition-colors">Pregnancy</span><span className="text-amber-600 font-bold flex items-center gap-1.5 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"><AlertTriangle size={14} /> Consult Doctor</span></div>
              </div>
              
              <div className="h-px bg-light-gray/60 mt-5 mb-5 w-full" />
              
              <div className="mb-6 bg-off-white/50 p-4 rounded-xl border border-light-gray/40 text-center">
                <div className="text-[12px] uppercase tracking-widest font-bold text-mid-gray mb-1">Max Daily Dose (Adults)</div>
                <div className="text-[28px] font-extrabold text-blue font-jetbrains tracking-tight">4000mg</div>
              </div>
              
              <div className="flex flex-col gap-3 mt-2">
                <Button variant="secondary" className="w-full justify-center gap-2 py-3.5 rounded-xl hover:bg-light-gray/50 transition-colors active:scale-95 border-light-gray/80"><Share2 size={18} className="text-dark-gray" /> <span className="text-dark-gray">Share Page</span></Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-near-black/60 backdrop-blur-md">
          <div className="bg-white rounded-[24px] w-full max-w-md shadow-2xl overflow-hidden animate-fade-up">
            <div className="p-6 sm:p-8">
              <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center mb-5">
                <AlertTriangle className="text-amber-500" size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-[22px] sm:text-[24px] font-extrabold font-plus-jakarta text-near-black mb-3 leading-tight tracking-tight">Medical Disclaimer</h2>
              <p className="text-[14px] sm:text-[15px] text-dark-gray leading-relaxed mb-6">
                The information provided on this platform is for educational and informational purposes only. It should <strong>not</strong> be used as a substitute for professional medical advice, diagnosis, or treatment.
                <br/><br/>
                Always consult your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
              <div className="flex gap-3">
                <Button variant="primary" onClick={() => setShowDisclaimer(false)} className="w-full py-3.5 justify-center rounded-xl font-bold text-[15px] shadow-[0_4px_12px_rgba(26,111,191,0.2)] hover:shadow-[0_6px_16px_rgba(26,111,191,0.3)] hover:-translate-y-0.5 transition-all active:scale-95">
                  I Understand
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
