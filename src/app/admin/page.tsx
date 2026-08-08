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
    { label: 'Total Medicines', value: '148', change: '+12 this month', icon: Pill, color: 'bg-blue/10 text-blue' },
    { label: '3-Lang Complete', value: '136', change: '92% coverage', icon: Languages, color: 'bg-teal/10 text-teal' },
    { label: 'Verified by Doctors', value: '112', change: '75% verified', icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-600' },
    { label: 'Pending AI Review', value: '12', change: 'Needs approval', icon: Clock, color: 'bg-amber-500/10 text-amber-600' },
  ];

  const recentMedicines = [
    { id: '1', name: 'Paracetamol', generic: 'Acetaminophen', category: 'Painkiller', langs: ['EN', 'SI', 'TA'], status: 'Published' },
    { id: '2', name: 'Amoxicillin', generic: 'Amoxicillin Trihydrate', category: 'Antibiotic', langs: ['EN', 'SI', 'TA'], status: 'Published' },
    { id: '3', name: 'Cetirizine', generic: 'Cetirizine Hydrochloride', category: 'Antihistamine', langs: ['EN', 'SI'], status: 'Draft' },
    { id: '4', name: 'Omeprazole', generic: 'Omeprazole Magnesium', category: 'Antacid', langs: ['EN', 'SI', 'TA'], status: 'Published' },
    { id: '5', name: 'Metformin', generic: 'Metformin Hydrochloride', category: 'Antidiabetic', langs: ['EN', 'SI', 'TA'], status: 'Published' },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-near-black via-blue-dark to-blue rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-teal mb-3 border border-white/10">
              <Sparkles size={14} className="text-amber-400" />
              <span>Smart Medical Content Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-plus-jakarta tracking-tight mb-2">
              Medicine Catalog Management
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed m-0">
              Manage medical records, enter or auto-translate details in English, Sinhala & Tamil using AI.
            </p>
          </div>

          <Link
            href="/admin/medicine/add"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal hover:bg-teal/90 text-white font-bold rounded-2xl text-sm shadow-lg shadow-teal/30 hover:scale-105 active:scale-95 transition-all no-underline shrink-0"
          >
            <PlusCircle size={18} />
            <span>Add New Medicine</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white border border-light-gray/50 rounded-3xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-mid-gray uppercase tracking-wider">{stat.label}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-near-black font-plus-jakarta tracking-tight">
                {stat.value}
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-teal">
                <TrendingUp size={12} />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Catalog Table & Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Panel (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-light-gray/50 rounded-[24px] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-near-black font-plus-jakarta m-0">Recent Medicines</h2>
              <p className="text-xs text-mid-gray m-0">Latest additions to the localized database</p>
            </div>
            <Link
              href="/admin/medicine/list"
              className="text-xs font-bold text-blue hover:underline flex items-center gap-1 no-underline"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left text-xs min-w-[550px]">
              <thead>
                <tr className="bg-off-white border-y border-light-gray text-mid-gray font-bold uppercase tracking-wider">
                  <th className="py-3 px-6">Medicine Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Languages</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray/60">
                {recentMedicines.map((med) => (
                  <tr key={med.id} className="hover:bg-off-white/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-near-black text-sm">{med.name}</div>
                      <div className="text-[11px] text-mid-gray">{med.generic}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-dark-gray">{med.category}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex gap-1">
                        {med.langs.map((lang) => (
                          <span
                            key={lang}
                            className="bg-blue-light text-blue text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue/15"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          med.status === 'Published'
                            ? 'bg-teal/10 text-teal border border-teal/20'
                            : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                        }`}
                      >
                        {med.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href="/admin/medicine/add"
                        className="text-xs font-bold text-blue hover:underline no-underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tools & AI Feature Box */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-light to-white border border-blue/20 rounded-3xl p-7 shadow-[0_8px_40px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <div className="flex items-center gap-2.5 font-bold text-blue text-sm mb-3">
              <Sparkles size={18} className="text-amber-500" />
              <span>AI Auto-Translator Tool</span>
            </div>
            <p className="text-xs text-dark-gray leading-relaxed mb-4">
              Enter details in English once, and click <strong>Auto-Translate</strong> to generate accurate medical translations in <strong>English, Sinhala, and Tamil</strong> automatically!
            </p>

            <Link
              href="/admin/medicine/add"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-blue hover:bg-blue-dark text-white text-xs font-bold rounded-xl shadow-md transition-all no-underline"
            >
              <PlusCircle size={15} />
              <span>Create & Auto-Translate</span>
            </Link>
          </div>

          <div className="bg-white border border-light-gray/50 rounded-[24px] p-7 shadow-[0_8px_40px_rgba(0,0,0,0.06)] space-y-4">
            <h3 className="text-sm font-bold text-near-black font-plus-jakarta m-0">Admin Actions</h3>
            <div className="space-y-2">
              <Link
                href="/admin/medicine/add"
                className="flex items-center justify-between p-3 rounded-xl bg-off-white hover:bg-light-gray/60 transition-colors text-dark-gray text-xs font-bold no-underline group"
              >
                <div className="flex items-center gap-2.5">
                  <Pill size={16} className="text-blue" />
                  <span>Add New Medicine</span>
                </div>
                <ArrowRight size={14} className="text-mid-gray group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between p-3 rounded-xl bg-off-white hover:bg-light-gray/60 transition-colors text-dark-gray text-xs font-bold no-underline group"
              >
                <div className="flex items-center gap-2.5">
                  <Search size={16} className="text-teal" />
                  <span>Test Search Index</span>
                </div>
                <ArrowRight size={14} className="text-mid-gray group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
