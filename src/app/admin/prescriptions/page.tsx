'use client';
import React from 'react';
import { FileText } from 'lucide-react';

export default function PrescriptionsAdminPage() {
  const submissions = [
    { id: 'RX-1092', patient: 'Anura Kumara', date: '2026-08-07', status: 'Pending Review', medicinesCount: 3 },
    { id: 'RX-1091', patient: 'Samanthi Perera', date: '2026-08-06', status: 'Verified', medicinesCount: 2 },
    { id: 'RX-1090', patient: 'Mohamed Rizwan', date: '2026-08-05', status: 'Verified', medicinesCount: 4 },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="bg-white p-5 rounded-2xl border border-light-gray shadow-sm">
        <h1 className="text-xl sm:text-2xl font-extrabold font-plus-jakarta text-near-black tracking-tight m-0 flex items-center gap-2.5">
          <FileText className="text-blue" size={26} />
          <span>Uploaded Prescriptions Management</span>
        </h1>
        <p className="text-xs sm:text-sm text-mid-gray m-0 mt-0.5">
          Review patient prescription uploads and match with medicine database
        </p>
      </div>

      <div className="bg-white border border-light-gray rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-off-white border-b border-light-gray text-mid-gray font-bold uppercase">
              <th className="py-3.5 px-6">Prescription ID</th>
              <th className="py-3.5 px-4">Patient Name</th>
              <th className="py-3.5 px-4">Date Uploaded</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray/60">
            {submissions.map((item) => (
              <tr key={item.id} className="hover:bg-off-white/60 transition-colors">
                <td className="py-4 px-6 font-bold text-near-black">{item.id}</td>
                <td className="py-4 px-4 text-dark-gray font-semibold">{item.patient}</td>
                <td className="py-4 px-4 text-mid-gray">{item.date}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${
                    item.status === 'Verified' ? 'bg-teal/10 text-teal border border-teal/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-xs font-bold text-blue hover:underline">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
