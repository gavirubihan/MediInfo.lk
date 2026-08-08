'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Pill, PlusCircle, Search, Languages, CheckCircle2, Edit3, ExternalLink, AlertTriangle, Clock } from 'lucide-react';
import { getStoredMedicines, MedicineRecord } from '@/data/medicinesData';

export default function MedicineListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState<MedicineRecord[]>([]);

  useEffect(() => {
    setMedicines(getStoredMedicines());
  }, []);

  const filtered = medicines.filter((m) =>
    m.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.chemicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.brandNames.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
          placeholder="Search by generic name, chemical salt, brands, or category..."
          className="w-full text-xs font-bold text-near-black outline-none bg-transparent"
        />
      </div>

      {/* Medicine List Table */}
      <div className="bg-white border border-light-gray rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="bg-off-white border-b border-light-gray text-mid-gray font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">Generic Name / Chemical</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Form & Strength</th>
                <th className="py-3.5 px-4">Available Languages</th>
                <th className="py-3.5 px-4">Doctor Verification Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray/60">
              {filtered.map((med) => {
                const count = med.verifications?.length || (med.verified ? 2 : 0);

                return (
                  <tr key={med.id} className="hover:bg-off-white/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-near-black text-sm">{med.genericName}</div>
                      <div className="text-[11px] text-mid-gray font-medium">{med.chemicalName}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-dark-gray">{med.category}</td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-dark-gray">{med.form.join(' / ')}</div>
                      <div className="text-[11px] text-mid-gray font-jetbrains">{med.strength}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        <span className="bg-blue-light text-blue text-[10px] font-bold px-2 py-0.5 rounded border border-blue/15">EN</span>
                        <span className="bg-teal/10 text-teal text-[10px] font-bold px-2 py-0.5 rounded border border-teal/15">SI (සිංහල)</span>
                        <span className="bg-amber-500/10 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/15">TA (தமிழ்)</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {count >= 2 ? (
                        <span className="inline-flex items-center gap-1 bg-teal/10 text-teal border border-teal/20 text-[11px] font-bold px-2.5 py-1 rounded-md">
                          <CheckCircle2 size={12} /> Doctor Verified (2/2)
                        </span>
                      ) : count === 1 ? (
                        <span className="inline-flex items-center gap-1 bg-blue-light text-blue border border-blue/20 text-[11px] font-bold px-2.5 py-1 rounded-md">
                          <Clock size={12} /> Partially Verified (1/2)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 text-[11px] font-bold px-2.5 py-1 rounded-md">
                          <AlertTriangle size={12} className="text-amber-600" /> Details Not Verified (0/2)
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/en/medicine/${med.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 bg-blue-light text-blue hover:bg-blue/15 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 no-underline"
                        >
                          <ExternalLink size={13} />
                          <span>View Page</span>
                        </Link>
                        <Link
                          href="/admin/medicine/add"
                          className="px-3 py-1.5 bg-off-white text-dark-gray hover:bg-light-gray text-xs font-bold rounded-lg border border-light-gray transition-colors flex items-center gap-1 no-underline"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
