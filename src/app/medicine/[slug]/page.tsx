'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Pill, Scale, Users, ClipboardList, Check, AlertTriangle, AlertOctagon, X, Download, Share2, Camera } from 'lucide-react';

export default function MedicineDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeLang, setActiveLang] = useState('EN');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'dosage', label: 'Dosage' },
    { id: 'side-effects', label: 'Side Effects' },
    { id: 'warnings', label: 'Warnings' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <>
      <div className="pt-36 pb-6 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-1.5 text-[13px] text-mid-gray">
            <Link href="/" className="text-blue no-underline hover:underline">Home</Link>
            <span className="text-mid-gray">›</span>
            <Link href="/search" className="text-blue no-underline hover:underline">Search</Link>
            <span className="text-mid-gray">›</span>
            <span>Paracetamol</span>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-[1fr_320px] gap-10">
            
            {/* Main Content */}
            <div>
              <h1 className="text-[36px] font-bold leading-[1.2] font-plus-jakarta text-near-black mb-1">Paracetamol</h1>
              <p className="text-[17px] font-semibold leading-[1.4] text-mid-gray mb-3">Acetaminophen (Generic Name)</p>
              
              <div className="flex gap-2 flex-wrap my-3">
                <Badge variant="blue">Painkiller</Badge>
                <Badge variant="blue">Antipyretic</Badge>
                <Badge variant="teal" className="flex items-center gap-1"><Check size={12} /> VERIFIED</Badge>
                <span className="bg-[#F0FFF8] text-teal border border-teal text-[11px] font-semibold uppercase tracking-[0.5px] px-2.5 py-1 rounded-md">No Prescription Needed</span>
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
              <div className="bg-gradient-to-br from-blue to-blue-dark rounded-2xl py-5 px-5 sm:px-7 my-6 flex flex-col sm:flex-row gap-5 sm:gap-8 flex-wrap">
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center justify-center shrink-0 w-8"><Pill size={24} /></div>
                  <div><div className="text-xs opacity-75">Form</div><div className="text-[15px] font-bold">Tablet / Syrup</div></div>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center justify-center shrink-0 w-8"><Scale size={24} /></div>
                  <div><div className="text-xs opacity-75">Strength</div><div className="text-[15px] font-bold font-jetbrains">500mg / 1000mg</div></div>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center justify-center shrink-0 w-8"><Users size={24} /></div>
                  <div><div className="text-xs opacity-75">Age Group</div><div className="text-[15px] font-bold">Adults & Children</div></div>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center justify-center shrink-0 w-8"><ClipboardList size={24} /></div>
                  <div><div className="text-xs opacity-75">Prescription</div><div className="text-[15px] font-bold">Not Required</div></div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b-2 border-light-gray mb-7 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 border-none bg-transparent text-[15px] font-semibold font-sans cursor-pointer relative transition-colors duration-200 ${activeTab === tab.id ? 'text-blue' : 'text-mid-gray'}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-blue" />
                    )}
                  </button>
                ))}
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
            <div>
              <div className="bg-white border border-light-gray rounded-2xl p-6 shadow-md sticky top-[88px] h-fit">
                <div className="font-plus-jakarta font-bold text-lg text-near-black mb-1">Paracetamol</div>
                <div className="text-amber text-base mb-3.5">★★★★☆ <span className="text-[13px] text-mid-gray font-sans">(12 Dr Reviews)</span></div>
                <div className="h-px bg-light-gray my-3.5" />
                <div className="flex justify-between items-center py-1.5 text-sm"><span className="text-mid-gray">Category</span><span className="font-semibold text-near-black">Painkiller</span></div>
                <div className="flex justify-between items-center py-1.5 text-sm"><span className="text-mid-gray">Form</span><span className="font-semibold text-near-black">Tablet / Syrup</span></div>
                <div className="flex justify-between items-center py-1.5 text-sm"><span className="text-mid-gray">Prescription</span><span className="text-teal font-bold">Not Required</span></div>
                <div className="flex justify-between items-center py-1.5 text-sm"><span className="text-mid-gray">Safe for Elderly</span><span className="text-teal font-bold flex items-center gap-1.5"><Check size={14} /> Yes (low dose)</span></div>
                <div className="flex justify-between items-center py-1.5 text-sm"><span className="text-mid-gray">Safe for Children</span><span className="text-teal font-bold flex items-center gap-1.5"><Check size={14} /> Yes</span></div>
                <div className="flex justify-between items-center py-1.5 text-sm"><span className="text-mid-gray">Pregnancy</span><span className="text-amber-500 font-semibold flex items-center gap-1.5"><AlertTriangle size={14} /> Consult Doctor</span></div>
                <div className="h-px bg-light-gray my-3.5" />
                <div className="mb-3">
                  <div className="text-[13px] text-mid-gray mb-1">Max Daily Dose (Adults)</div>
                  <div className="text-[22px] font-extrabold text-blue font-jetbrains">4000mg</div>
                </div>
                <div className="flex flex-col gap-2.5 mt-5">
                  <Button variant="primary" className="w-full justify-center gap-2"><Download size={16} /> Download Info PDF</Button>
                  <Button variant="secondary" className="w-full justify-center gap-2"><Share2 size={16} /> Share</Button>
                </div>
              </div>

              {/* Upload Zone */}
              <div className="border-2 border-dashed border-blue bg-blue-light rounded-2xl py-10 px-5 text-center cursor-pointer transition-all duration-200 mt-6 hover:bg-[#D9ECFA] hover:border-solid">
                <div className="flex items-center justify-center mb-3"><Camera size={40} className="text-blue" /></div>
                <div className="font-plus-jakarta font-semibold text-[17px] text-near-black mb-1">Upload Prescription</div>
                <div className="text-[13px] text-dark-gray mb-2">Drag & drop or tap to select</div>
                <div className="text-[13px] text-mid-gray">Supports: JPG, PNG, PDF</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
