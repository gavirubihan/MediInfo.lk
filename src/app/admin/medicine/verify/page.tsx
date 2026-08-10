// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Stethoscope, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Languages, 
  FileText, 
  UserCheck, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  Check,
  Building2,
  Clock,
  Pill,
  AlertOctagon,
  Activity,
  Info,
  ShieldAlert
} from 'lucide-react';
interface RegisteredDoctor {
  id: string;
  name: string;
  email: string;
  slmcRegNo: string;
  specialization: string;
  hospital: string;
}

const registeredDoctors: RegisteredDoctor[] = [
  { id: 'doc-01', name: 'Dr. Saman Perera', email: 'dr.saman@mediinfo.lk', slmcRegNo: 'SLMC-45291', specialization: 'Senior Clinical Pharmacologist', hospital: 'National Hospital of Sri Lanka' },
  { id: 'doc-02', name: 'Dr. Nimali Silva', email: 'nimali.silva@mediinfo.lk', slmcRegNo: 'SLMC-51820', specialization: 'Consultant Physician', hospital: 'Asiri Surgical Hospital' },
];
import { useAdminRole } from '@/components/admin/AdminRoleContext';

export default function DoctorVerifyPage() {
  const { user } = useAdminRole();
  const searchParams = useSearchParams();
  const highlightId = searchParams.get('id');

  const [medicines, setMedicines] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'partially' | 'verified'>('pending');
  const [expandedId, setExpandedId] = useState<string | null>(highlightId || null);

  // Per-medicine active language tab for reviewing 3-language content
  const [langTabMap, setLangTabMap] = useState<Record<string, 'en' | 'si' | 'ta'>>({});

  // Active reviewing doctor selection
  const [selectedDoctor, setSelectedDoctor] = useState<RegisteredDoctor>(
    registeredDoctors.find((d) => d.email === user?.email || d.id === user?.doctorId) || registeredDoctors[0]
  );
  const [doctorNotes, setDoctorNotes] = useState('');
  const [successToast, setSuccessToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });

  const loadData = () => {
    fetch('/api/medicine')
      .then(res => res.json())
      .then(data => {
        setMedicines(data.medicines ?? []);
        if (highlightId && !expandedId) {
          setExpandedId(highlightId);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, [highlightId]);

  useEffect(() => {
    if (user?.doctorId) {
      const match = registeredDoctors.find((d) => d.id === user.doctorId);
      if (match) setSelectedDoctor(match);
    }
  }, [user]);

  const handleApprove = async (medicineId: string) => {
    if (user?.role !== 'doctor') {
      alert("Only doctors can verify medicines.");
      return;
    }
    try {
      const res = await fetch('/api/medicine/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medicineId,
          doctorId: selectedDoctor.id,
          slmcRegNo: selectedDoctor.slmcRegNo
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccessToast({ show: true, msg: 'Medicine verified successfully!' });
      setTimeout(() => setSuccessToast({ show: false, msg: '' }), 3000);
      loadData();
    } catch (e: any) {
      alert(e.message || "Failed to verify medicine");
    }
  };

  const setMedicineLang = (id: string, lang: 'en' | 'si' | 'ta') => {
    setLangTabMap((prev) => ({ ...prev, [id]: lang }));
  };

  // Filter lists
  const filtered = medicines.filter((m) => {
    const matchesSearch =
      m.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.chemicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.brandNames.some((b: string) => b.toLowerCase().includes(searchTerm.toLowerCase()));

    const count = m.verifications?.length || (m.verified ? 2 : 0);
    if (activeTab === 'pending') return matchesSearch && count === 0;
    if (activeTab === 'partially') return matchesSearch && count === 1;
    if (activeTab === 'verified') return matchesSearch && count >= 2;
    return matchesSearch;
  });

  const pendingCount = medicines.filter((m) => (m.verifications?.length || (m.verified ? 2 : 0)) === 0).length;
  const partialCount = medicines.filter((m) => (m.verifications?.length || (m.verified ? 2 : 0)) === 1).length;
  const verifiedCount = medicines.filter((m) => (m.verifications?.length || (m.verified ? 2 : 0)) >= 2).length;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Toast Notification */}
      {successToast.show && (
        <div className="fixed top-20 right-6 z-50 bg-near-black text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-teal/40 animate-fade-up max-w-md">
          <div className="w-8 h-8 rounded-full bg-teal text-near-black flex items-center justify-center shrink-0 font-bold">
            <Check size={18} />
          </div>
          <div className="text-xs font-bold leading-relaxed">{successToast.msg}</div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold font-plus-jakarta text-near-black tracking-tight m-0 flex items-center gap-2">
            <ShieldCheck className="text-teal" size={20} />
            <span>Medicine Verification</span>
          </h1>
          <p className="text-xs text-mid-gray m-0 mt-0.5">
            Minimum 2 doctor approvals required for verified status
          </p>
        </div>
        {/* Reviewer Badge */}
        <div className="flex items-center gap-2.5 bg-white border border-light-gray/60 px-3.5 py-2.5 rounded-xl text-xs">
          <div className="w-7 h-7 rounded-lg bg-teal text-near-black font-extrabold flex items-center justify-center text-[10px] shrink-0">
            {user?.role === 'doctor' ? 'DR' : 'SA'}
          </div>
          <div>
            <div className="font-bold text-near-black">{user?.name || selectedDoctor.name}</div>
            <div className="text-[10px] text-mid-gray">
              {user?.role === 'doctor' ? selectedDoctor.slmcRegNo : user?.role === 'super_admin' ? 'Inspection Mode' : 'Medical Staff'}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Filter Tabs */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('pending')}
          className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex items-center justify-between ${
            activeTab === 'pending'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-white border-light-gray/60 hover:border-amber-200'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-mid-gray block uppercase tracking-wide">Not Verified</span>
            <span className="text-xl font-extrabold text-amber-600 font-plus-jakarta">{pendingCount}</span>
          </div>
          <AlertTriangle size={18} className="text-amber-500 opacity-70" />
        </button>

        <button
          onClick={() => setActiveTab('partially')}
          className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex items-center justify-between ${
            activeTab === 'partially'
              ? 'bg-blue-light border-blue/30'
              : 'bg-white border-light-gray/60 hover:border-blue/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-mid-gray block uppercase tracking-wide">Partial (1/2)</span>
            <span className="text-xl font-extrabold text-blue font-plus-jakarta">{partialCount}</span>
          </div>
          <Clock size={18} className="text-blue opacity-70" />
        </button>

        <button
          onClick={() => setActiveTab('verified')}
          className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex items-center justify-between ${
            activeTab === 'verified'
              ? 'bg-teal/10 border-teal/30'
              : 'bg-white border-light-gray/60 hover:border-teal/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-mid-gray block uppercase tracking-wide">Verified (2/2)</span>
            <span className="text-xl font-extrabold text-teal font-plus-jakarta">{verifiedCount}</span>
          </div>
          <CheckCircle2 size={18} className="text-teal opacity-70" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-light-gray/60 rounded-xl p-3 px-4 flex items-center gap-3">
        <Search size={16} className="text-mid-gray shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter medicines by generic name, chemical ingredient, or brands..."
          className="w-full text-xs text-near-black outline-none bg-transparent"
        />
      </div>

      {/* Medicines List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 text-center border border-light-gray/50 text-mid-gray space-y-3 shadow-sm">
            <ShieldCheck size={40} className="mx-auto text-teal/50" />
            <h3 className="text-base font-bold text-near-black m-0">No medicines match this view</h3>
            <p className="text-xs m-0">Try switching tabs above or clear your search term.</p>
          </div>
        ) : (
          filtered.map((med) => {
            const count = med.verifications?.length || (med.verified ? 2 : 0);
            const isExpanded = expandedId === med.id;
            const currentLang = langTabMap[med.id] || 'en';
            const localized = med.localized[currentLang] || med.localized.en;
            const alreadyVerifiedByMe = med.verifications?.some(
              (v) => v.doctorId === selectedDoctor.id || v.slmcRegNo === selectedDoctor.slmcRegNo
            );

            return (
              <div
                key={med.id}
                className={`bg-white rounded-[24px] border border-light-gray/50 transition-all shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden ${
                  isExpanded ? 'border-blue shadow-md ring-2 ring-blue/10' : 'border-light-gray hover:border-blue/30'
                }`}
              >
                {/* Medicine Header Row */}
                <div className="p-4 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-light/60 border border-blue/20 flex items-center justify-center text-blue font-bold shrink-0">
                      <Pill size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[15px] font-extrabold text-near-black font-plus-jakarta m-0">
                          {med.genericName}
                        </h3>
                        <span className="text-[11px] font-semibold text-mid-gray">({med.chemicalName})</span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] font-bold text-dark-gray bg-off-white px-2 py-0.5 rounded border border-light-gray">
                          {med.category}
                        </span>
                        <span className="text-[10px] font-mono text-mid-gray">
                          {med.strength}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Status Badge */}
                    {count >= 2 ? (
                      <span className="inline-flex items-center gap-1 bg-teal/10 text-teal border border-teal/30 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                        <CheckCircle2 size={14} /> Doctor Verified (2/2)
                      </span>
                    ) : count === 1 ? (
                      <span className="inline-flex items-center gap-1 bg-blue-light text-blue border border-blue/30 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                        <Clock size={14} /> Partially Verified (1/2)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-800 border border-amber-500/30 text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                        <AlertTriangle size={14} className="text-amber-600" /> Details Not Verified (0/2)
                      </span>
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : med.id)}
                      className="px-3 py-1.5 bg-off-white hover:bg-light-gray text-dark-gray text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-light-gray/50"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'Review Full Details'}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Full Detail Workspace */}
                {isExpanded && (
                  <div className="p-6 bg-[#FAFBFD] border-t border-light-gray space-y-6 animate-fade-up">
                    
                    {/* Key Parameters Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-white p-4 rounded-xl border border-light-gray space-y-1.5">
                        <span className="font-extrabold text-mid-gray uppercase tracking-wider block">Commercial Brands (LK):</span>
                        <div className="flex flex-wrap gap-1">
                          {med.brandNames.map((brand, i) => (
                            <span key={i} className="bg-blue-light/50 text-blue font-bold px-2 py-0.5 rounded text-[11px] border border-blue/15">
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-light-gray space-y-1.5">
                        <span className="font-extrabold text-mid-gray uppercase tracking-wider block">Form & Dosage Rules:</span>
                        <div className="font-bold text-near-black">
                          {med.form.join(' / ')} • {med.strength}
                        </div>
                        <div className="text-[11px] text-mid-gray">
                          Max Adult Daily: <strong className="text-dark-gray">{med.maxDailyDoseAdults}</strong>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-light-gray space-y-1.5">
                        <span className="font-extrabold text-mid-gray uppercase tracking-wider block">Target Age & Prescription:</span>
                        <div className="font-bold text-near-black">{med.ageGroup}</div>
                        <div className="text-[11px]">
                          {med.prescriptionRequired ? (
                            <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Prescription Required (Rx)
                            </span>
                          ) : (
                            <span className="text-teal font-bold bg-teal/10 px-2 py-0.5 rounded border border-teal/20">
                              Over The Counter (OTC)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Clinical Dosage Table */}
                    {med.dosageRows && med.dosageRows.length > 0 && (
                      <div className="bg-white rounded-2xl border border-light-gray p-5 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 font-bold text-xs text-near-black uppercase tracking-wider">
                          <Activity size={16} className="text-blue" />
                          <span>1. Recommended Clinical Dosage Rules</span>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border border-light-gray rounded-xl overflow-hidden">
                            <thead>
                              <tr className="bg-off-white text-mid-gray font-bold uppercase tracking-wider border-b border-light-gray">
                                <th className="py-2.5 px-4">Age Group</th>
                                <th className="py-2.5 px-4">Recommended Dose</th>
                                <th className="py-2.5 px-4">Frequency</th>
                                <th className="py-2.5 px-4">Max Daily Limit</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-light-gray/60 font-semibold text-dark-gray">
                              {med.dosageRows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-off-white/50">
                                  <td className="py-2.5 px-4 font-bold text-near-black">{row.ageGroup}</td>
                                  <td className="py-2.5 px-4 text-blue">{row.dose}</td>
                                  <td className="py-2.5 px-4">{row.frequency}</td>
                                  <td className="py-2.5 px-4 font-mono text-mid-gray">{row.maxPerDay}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Section 2: Full 3-Language Content Inspector */}
                    <div className="bg-white rounded-2xl border border-light-gray p-5 shadow-sm space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-light-gray">
                        <div className="flex items-center gap-2 font-bold text-xs text-near-black uppercase tracking-wider">
                          <Languages size={16} className="text-teal" />
                          <span>2. Multi-Language Medical Descriptions & Safety Editor</span>
                        </div>

                        {/* Language Switcher Tabs */}
                        <div className="flex bg-off-white rounded-full p-1 border border-light-gray gap-1">
                          {(['en', 'si', 'ta'] as const).map((lang) => (
                            <button
                              key={lang}
                              onClick={() => setMedicineLang(med.id, lang)}
                              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                currentLang === lang
                                  ? 'bg-blue text-white shadow-sm'
                                  : 'text-dark-gray hover:text-near-black'
                              }`}
                            >
                              {lang === 'en' ? 'English (EN)' : lang === 'si' ? 'සිංහල (SI)' : 'தமிழ் (TA)'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Localized Content Display */}
                      <div className={`space-y-5 text-xs ${currentLang === 'si' ? 'font-noto-sinhala' : ''}`}>
                        
                        {/* Description */}
                        <div>
                          <span className="font-extrabold text-mid-gray uppercase tracking-wider block mb-1">
                            Full Medical Overview ({currentLang.toUpperCase()}):
                          </span>
                          <p className="p-3.5 bg-off-white rounded-xl border border-light-gray text-dark-gray leading-relaxed font-semibold m-0">
                            {localized.description || 'No description entered.'}
                          </p>
                        </div>

                        {/* Used For & How It Works */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-off-white p-3.5 rounded-xl border border-light-gray space-y-2">
                            <span className="font-extrabold text-blue uppercase tracking-wider block">
                              Primary Indications (Used For):
                            </span>
                            <ul className="space-y-1 pl-4 m-0 list-disc font-medium text-near-black">
                              {localized.usedFor && localized.usedFor.length > 0 ? (
                                localized.usedFor.map((item, i) => <li key={i}>{item}</li>)
                              ) : (
                                <li>General medical use</li>
                              )}
                            </ul>
                          </div>

                          <div className="bg-off-white p-3.5 rounded-xl border border-light-gray space-y-2">
                            <span className="font-extrabold text-teal uppercase tracking-wider block">
                              Mechanism of Action (How It Works):
                            </span>
                            <p className="font-medium text-near-black m-0 leading-relaxed">
                              {localized.howItWorks || 'Acts according to standard pharmacodynamic mechanisms.'}
                            </p>
                          </div>
                        </div>

                        {/* Dosage Notes */}
                        {localized.dosageNotes && (
                          <div className="p-3.5 bg-blue-light/40 border border-blue/20 rounded-xl space-y-1">
                            <span className="font-extrabold text-blue uppercase tracking-wider block">
                              Dosage Instructions & Warnings:
                            </span>
                            <p className="font-medium text-dark-gray m-0 leading-relaxed">
                              {localized.dosageNotes}
                            </p>
                          </div>
                        )}

                        {/* Side Effects Classifications */}
                        <div className="space-y-2 pt-2 border-t border-light-gray/60">
                          <span className="font-extrabold text-near-black uppercase tracking-wider block">
                            Side Effects Classifications:
                          </span>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                              <span className="font-bold text-amber-800 block text-[11px]">Common Side Effects</span>
                              <ul className="pl-4 m-0 list-disc text-mid-gray text-[11px]">
                                {localized.sideEffectsCommon && localized.sideEffectsCommon.length > 0 ? (
                                  localized.sideEffectsCommon.map((s, i) => <li key={i}>{s}</li>)
                                ) : (
                                  <li>Mild stomach discomfort</li>
                                )}
                              </ul>
                            </div>

                            <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-1">
                              <span className="font-bold text-orange-800 block text-[11px]">Less Common Side Effects</span>
                              <ul className="pl-4 m-0 list-disc text-mid-gray text-[11px]">
                                {localized.sideEffectsLessCommon && localized.sideEffectsLessCommon.length > 0 ? (
                                  localized.sideEffectsLessCommon.map((s, i) => <li key={i}>{s}</li>)
                                ) : (
                                  <li>Mild skin rash</li>
                                )}
                              </ul>
                            </div>

                            <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                              <span className="font-bold text-rose-800 block text-[11px]">Serious Adverse Effects</span>
                              <ul className="pl-4 m-0 list-disc text-rose-900 text-[11px] font-semibold">
                                {localized.sideEffectsSerious && localized.sideEffectsSerious.length > 0 ? (
                                  localized.sideEffectsSerious.map((s, i) => <li key={i}>{s}</li>)
                                ) : (
                                  <li>Severe allergic reaction (Angioedema)</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Warning Cards */}
                        {localized.warningCards && localized.warningCards.length > 0 && (
                          <div className="space-y-2">
                            <span className="font-extrabold text-near-black uppercase tracking-wider block">
                              Clinical Warning Cards:
                            </span>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {localized.warningCards.map((card, i) => (
                                <div
                                  key={i}
                                  className={`p-3.5 rounded-xl border space-y-1 ${
                                    card.severity === 'high'
                                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                                      : card.severity === 'medium'
                                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                                      : 'bg-blue-light/40 border-blue/20 text-dark-gray'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 font-bold">
                                    <AlertOctagon size={15} />
                                    <span>{card.title}</span>
                                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-extrabold ml-auto border border-current">
                                      {card.severity}
                                    </span>
                                  </div>
                                  <p className="text-[11px] m-0 leading-relaxed font-medium">{card.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 3: Drug Interactions */}
                    {med.drugInteractions && med.drugInteractions.length > 0 && (
                      <div className="bg-white rounded-2xl border border-light-gray p-5 shadow-sm space-y-3 text-xs">
                        <div className="flex items-center gap-2 font-bold text-near-black uppercase tracking-wider">
                          <ShieldAlert size={16} className="text-amber-600" />
                          <span>3. Drug Interactions & Contraindications</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {med.drugInteractions.map((inter, i) => (
                            <div key={i} className="p-3 bg-off-white border border-light-gray rounded-xl space-y-1">
                              <span className="font-extrabold text-near-black block">{inter.drug}</span>
                              <p className="text-mid-gray m-0 text-[11px] leading-relaxed font-medium">{inter.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 4: Existing Verifications Log */}
                    <div className="bg-white rounded-2xl border border-light-gray p-5 shadow-sm space-y-3">
                      <span className="font-extrabold text-xs text-near-black uppercase tracking-wider block">
                        4. Recorded Doctor Approvals ({count}/2):
                      </span>

                      {!med.verifications || med.verifications.length === 0 ? (
                        <div className="text-xs text-amber-800 bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20 font-medium">
                          ⚠️ No doctor approvals recorded yet. At least 2 approvals required for official Doctor Verified seal.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {med.verifications.map((v, i) => (
                            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-teal/5 border border-teal/20 text-xs">
                              <UserCheck size={18} className="text-teal shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-extrabold text-near-black">{v.doctorName}</span>
                                  <span className="text-[10px] text-mid-gray font-mono">{v.verifiedAt}</span>
                                </div>
                                <div className="text-[11px] text-teal font-semibold">{v.slmcRegNo} • {v.specialization}</div>
                                {v.notes && <p className="text-[11px] text-mid-gray m-0 mt-1 italic">"{v.notes}"</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 5: Action Form - Approve Medicine */}
                    {user?.role === 'doctor' ? (
                      <div className="bg-gradient-to-r from-blue-light/60 to-teal/10 p-6 rounded-2xl border border-blue/20 space-y-4">
                        <div className="flex items-center gap-2">
                          <Award size={20} className="text-teal" />
                          <h4 className="text-xs font-extrabold text-near-black uppercase tracking-wider m-0">
                            Grant Clinical Verification — Logged as {selectedDoctor.name} ({selectedDoctor.slmcRegNo})
                          </h4>
                        </div>

                        <textarea
                          value={doctorNotes}
                          onChange={(e) => setDoctorNotes(e.target.value)}
                          placeholder="Add clinical review notes, SLMC verification remarks, or approval comments..."
                          rows={2}
                          className="w-full p-3.5 bg-white border border-light-gray rounded-xl text-xs font-semibold text-near-black outline-none focus:border-teal mb-3"
                        />

                        {med.verifications && med.verifications.length > 0 && (
                          <div className="bg-white/50 border border-teal/20 p-3 rounded-xl mb-3">
                            <span className="text-[10px] font-bold text-teal uppercase tracking-wider block mb-1">
                              Current Approvals ({med.verifications.length}/2 Required):
                            </span>
                            <ul className="text-xs text-near-black m-0 pl-4 list-disc font-medium">
                              {med.verifications.map((v: any, idx: number) => (
                                <li key={idx}>Verified by Doctor SLMC: {v.slmcRegNo} on {new Date(v.verifiedAt).toLocaleDateString()}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <span className="text-[11px] text-mid-gray">
                            {alreadyVerifiedByMe
                              ? '⚠️ You have already approved this record. Another registered doctor can provide the 2nd approval.'
                              : 'Clicking approve will sign your SLMC credentials to this record. (2 independent doctor approvals are required to fully verify)'}
                          </span>

                          <button
                            onClick={() => handleApprove(med.id)}
                            disabled={alreadyVerifiedByMe}
                            className={`px-6 py-3 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-2 shrink-0 ${
                              alreadyVerifiedByMe
                                ? 'bg-light-gray text-mid-gray cursor-not-allowed'
                                : 'bg-teal hover:bg-teal/90 text-white shadow-teal/20 cursor-pointer active:scale-98'
                            }`}
                          >
                            <CheckCircle2 size={16} />
                            <span>{alreadyVerifiedByMe ? 'Approved by You' : 'Approve & Verify Medicine Details'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div className="flex items-start gap-3">
                          <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold block text-near-black">Clinical Verification Restricted (Doctors Only)</span>
                            <span className="text-amber-800/90 leading-relaxed">
                              As <strong>{user?.role === 'super_admin' ? 'Super Administrator' : 'Medical Staff'}</strong>, you can inspect pending medicine records and full clinical details, but only registered medical doctors (SLMC verified) can sign clinical verification approvals.
                            </span>
                          </div>
                        </div>
                        <button
                          disabled
                          className="px-5 py-2.5 bg-light-gray text-mid-gray text-xs font-bold rounded-xl cursor-not-allowed shrink-0 border border-light-gray"
                        >
                          Approval Restricted
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
