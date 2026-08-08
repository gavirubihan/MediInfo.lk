'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Pill, 
  PlusCircle, 
  Languages, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Search
} from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Medicines', value: '148', change: '+12 this month', icon: Pill, color: 'bg-blue/10 text-blue', highlight: false },
    { label: '3-Lang Complete', value: '136', change: '92% coverage', icon: Languages, color: 'bg-teal/10 text-teal', highlight: false },
    { label: 'Verified by Doctors', value: '112', change: '75% verified', icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-600', highlight: false },
    { label: 'Pending Review', value: '12', change: 'Needs approval', icon: Clock, color: 'bg-amber-500/10 text-amber-600', highlight: true },
  ];

  const recentMedicines = [
    { id: '1', name: 'Paracetamol', generic: 'Acetaminophen', category: 'Painkiller', langs: ['EN', 'SI', 'TA'], status: 'Published' },
    { id: '2', name: 'Amoxicillin', generic: 'Amoxicillin Trihydrate', category: 'Antibiotic', langs: ['EN', 'SI', 'TA'], status: 'Published' },
    { id: '3', name: 'Cetirizine', generic: 'Cetirizine Hydrochloride', category: 'Antihistamine', langs: ['EN', 'SI'], status: 'Draft' },
    { id: '4', name: 'Omeprazole', generic: 'Omeprazole Magnesium', category: 'Antacid', langs: ['EN', 'SI', 'TA'], status: 'Published' },
    { id: '5', name: 'Metformin', generic: 'Metformin Hydrochloride', category: 'Antidiabetic', langs: ['EN', 'SI', 'TA'], status: 'Published' },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold font-plus-jakarta text-near-black tracking-tight m-0">Dashboard</h1>
          <p className="text-xs text-mid-gray m-0 mt-0.5">Medicine catalog overview & quick access</p>
        </div>
        <Link
          href="/admin/medicine/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue hover:bg-blue-dark text-white font-bold rounded-xl text-xs shadow-md shadow-blue/20 transition-all no-underline"
        >
          <PlusCircle size={15} />
          <span>Add Medicine</span>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`bg-white border rounded-2xl p-4 transition-all ${stat.highlight ? 'border-amber-200 bg-amber-50/50' : 'border-light-gray/60'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={18} />
                </div>
                <span className={`text-2xl font-extrabold font-plus-jakarta tracking-tight ${stat.highlight ? 'text-amber-600' : 'text-near-black'}`}>
                  {stat.value}
                </span>
              </div>
              <div className="text-xs font-bold text-dark-gray">{stat.label}</div>
              <div className="text-[11px] text-mid-gray mt-0.5">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Medicines Table */}
        <div className="lg:col-span-2 bg-white border border-light-gray/60 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-light-gray/60">
            <h2 className="text-sm font-bold text-near-black font-plus-jakarta m-0">Recent Medicines</h2>
            <Link href="/admin/medicine/list" className="text-xs font-bold text-blue hover:underline flex items-center gap-1 no-underline">
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[520px]">
              <thead>
                <tr className="bg-off-white border-b border-light-gray/60 text-mid-gray font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-5">Medicine</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Languages</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray/40">
                {recentMedicines.map((med) => (
                  <tr key={med.id} className="hover:bg-off-white/60 transition-colors">
                    <td className="py-3 px-5">
                      <div className="font-bold text-near-black text-xs">{med.name}</div>
                      <div className="text-[10px] text-mid-gray">{med.generic}</div>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-dark-gray">{med.category}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {med.langs.map((lang) => (
                          <span key={lang} className="bg-blue-light text-blue text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue/15">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        med.status === 'Published'
                          ? 'bg-teal/10 text-teal border border-teal/20'
                          : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                      }`}>
                        {med.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Link href="/admin/medicine/add" className="text-xs font-bold text-blue hover:underline no-underline">Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tools Panel */}
        <div className="space-y-4">
          <div className="bg-white border border-light-gray/60 rounded-2xl p-5">
            <div className="flex items-center gap-2 font-bold text-near-black text-xs mb-3">
              <Sparkles size={15} className="text-amber-500" />
              <span>AI Auto-Translator</span>
            </div>
            <p className="text-[11px] text-dark-gray leading-relaxed mb-4 m-0">
              Enter content in English once and auto-generate accurate medical translations in <strong>Sinhala & Tamil</strong>.
            </p>
            <Link
              href="/admin/medicine/add"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue hover:bg-blue-dark text-white text-xs font-bold rounded-xl transition-all no-underline"
            >
              <PlusCircle size={14} />
              <span>Create & Auto-Translate</span>
            </Link>
          </div>

          <div className="bg-white border border-light-gray/60 rounded-2xl p-5 space-y-2">
            <h3 className="text-xs font-bold text-near-black font-plus-jakarta m-0 mb-3">Quick Links</h3>
            <Link href="/admin/medicine/add" className="flex items-center justify-between p-2.5 rounded-xl bg-off-white hover:bg-light-gray/60 transition-colors text-dark-gray text-xs font-bold no-underline group">
              <div className="flex items-center gap-2">
                <Pill size={14} className="text-blue" />
                <span>Add New Medicine</span>
              </div>
              <ArrowRight size={13} className="text-mid-gray group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/" target="_blank" className="flex items-center justify-between p-2.5 rounded-xl bg-off-white hover:bg-light-gray/60 transition-colors text-dark-gray text-xs font-bold no-underline group">
              <div className="flex items-center gap-2">
                <Search size={14} className="text-teal" />
                <span>Test Search</span>
              </div>
              <ArrowRight size={13} className="text-mid-gray group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
