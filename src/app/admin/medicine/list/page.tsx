'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Pill, PlusCircle, Search, Languages, CheckCircle2, Edit3 } from 'lucide-react';

export default function MedicineListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const medicines = [
    { id: '1', name: 'Paracetamol', generic: 'Acetaminophen', category: 'Painkiller', form: 'Tablet / Syrup', strength: '500mg / 1000mg', langs: ['EN', 'SI', 'TA'], verified: true },
    { id: '2', name: 'Amoxicillin', generic: 'Amoxicillin Trihydrate', category: 'Antibiotic', form: 'Capsule', strength: '250mg / 500mg', langs: ['EN', 'SI', 'TA'], verified: true },
    { id: '3', name: 'Cetirizine', generic: 'Cetirizine Hydrochloride', category: 'Antihistamine', form: 'Tablet', strength: '10mg', langs: ['EN', 'SI'], verified: false },
    { id: '4', name: 'Omeprazole', generic: 'Omeprazole Magnesium', category: 'Antacid', form: 'Capsule', strength: '20mg', langs: ['EN', 'SI', 'TA'], verified: true },
    { id: '5', name: 'Metformin', generic: 'Metformin Hydrochloride', category: 'Antidiabetic', form: 'Tablet', strength: '500mg / 850mg', langs: ['EN', 'SI', 'TA'], verified: true },
  ];

  const filtered = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.generic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-light-gray shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-plus-jakarta text-near-black tracking-tight m-0 flex items-center gap-2.5">
            <Pill className="text-blue" size={26} />
            <span>Medicine Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm text-mid-gray m-0 mt-0.5">
            Manage all 3-language medicine records in your catalog
          </p>
        </div>

        <Link
          href="/admin/medicine/add"
          className="px-5 py-2.5 bg-teal hover:bg-teal/90 text-white font-bold text-xs rounded-xl shadow-md shadow-teal/20 transition-all flex items-center gap-2 no-underline"
        >
          <PlusCircle size={16} />
          <span>Add New Medicine</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white border border-light-gray rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <Search size={18} className="text-mid-gray shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by brand name, generic name, or category..."
          className="w-full text-xs font-bold text-near-black outline-none bg-transparent"
        />
      </div>

      {/* Medicine List Table */}
      <div className="bg-white border border-light-gray rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="bg-off-white border-b border-light-gray text-mid-gray font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">Brand Name / Generic</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Form & Strength</th>
                <th className="py-3.5 px-4">Available Languages</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/60">
              {filtered.map((med) => (
                <tr key={med.id} className="hover:bg-off-white/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-near-black text-sm">{med.name}</div>
                    <div className="text-[11px] text-mid-gray font-medium">{med.generic}</div>
                  </td>
                  <td className="py-4 px-4 font-bold text-dark-gray">{med.category}</td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-dark-gray">{med.form}</div>
                    <div className="text-[11px] text-mid-gray font-jetbrains">{med.strength}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-1">
                      {med.langs.map((lang) => (
                        <span
                          key={lang}
                          className="bg-blue-light text-blue text-[10px] font-bold px-2 py-0.5 rounded border border-blue/15"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {med.verified ? (
                      <span className="inline-flex items-center gap-1 bg-teal/10 text-teal border border-teal/20 text-[11px] font-bold px-2 py-0.5 rounded-md">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    ) : (
                      <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[11px] font-bold px-2 py-0.5 rounded-md">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      href="/admin/medicine/add"
                      className="p-2 text-blue hover:bg-blue-light rounded-lg inline-flex items-center no-underline"
                    >
                      <Edit3 size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
