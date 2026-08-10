'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, X, ExternalLink, Stethoscope, Sparkles } from 'lucide-react';

interface DoctorEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine: any;
}

export function DoctorEmailModal({ isOpen, onClose, medicine }: DoctorEmailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !medicine || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-near-black/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-light-gray flex flex-col max-h-[90vh] my-auto animate-fade-up">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-near-black to-[#1A233A] p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal/20 border border-teal/40 flex items-center justify-center text-teal shadow-inner">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="font-plus-jakarta font-extrabold text-lg text-white m-0 flex items-center gap-2">
                <span>Doctor Verification Email Sent</span>
                <span className="bg-teal text-near-black text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                  Automated Dispatch
                </span>
              </h3>
              <p className="text-xs text-white/70 m-0">
                Registered medical doctors have been notified to review and verify this medicine.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body / Simulated Email Container */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 bg-[#FAFBFD]">
          
          {/* Status Alert Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 flex items-start gap-3">
            <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold block">Verification Status: Details Not Verified (0/2 Approvals)</span>
              <span className="text-amber-800/80">
                This record is currently pending medical verification. Once <strong>at least 2 registered doctors</strong> approve it, the official Doctor Verified badge will be granted.
              </span>
            </div>
          </div>

          {/* Email Preview Box */}
          <div className="bg-white rounded-2xl border border-light-gray shadow-sm overflow-hidden text-near-black">
            <div className="bg-off-white px-4 py-3 border-b border-light-gray space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-mid-gray uppercase tracking-wider w-16">From:</span>
                <span className="font-bold text-near-black">MediInfo Verification Dispatch &lt;no-reply@mediinfo.lk&gt;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-mid-gray uppercase tracking-wider w-16">To:</span>
                <span className="font-bold text-teal font-mono truncate">
                  dr.saman@mediinfo.lk, nimali.silva@mediinfo.lk, arul.kumaran@mediinfo.lk
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-light-gray/60">
                <span className="font-extrabold text-mid-gray uppercase tracking-wider w-16">Subject:</span>
                <span className="font-extrabold text-near-black">
                  [MediInfo Verification Required] Review Medicine Details: {medicine.genericName} ({medicine.strength})
                </span>
              </div>
            </div>

            {/* Email Content Body */}
            <div className="p-5 space-y-4 text-xs">
              <p className="font-semibold text-dark-gray m-0">
                Dear Doctor,
              </p>
              <p className="text-mid-gray leading-relaxed m-0">
                A new medicine record for <strong className="text-near-black">{medicine.genericName}</strong> ({medicine.chemicalName}) has been added to MediInfo.LK catalog. Please review the dosage guidelines, drug interactions, and multi-language content to grant your clinical verification seal.
              </p>

              {/* Medicine Card in Email */}
              <div className="p-4 rounded-xl bg-blue-light/50 border border-blue/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-blue">{medicine.genericName}</span>
                  <span className="text-[10px] font-bold bg-blue text-white px-2 py-0.5 rounded">
                    {medicine.category}
                  </span>
                </div>
                <div className="text-[11px] text-dark-gray font-medium">
                  <strong>Form:</strong> {medicine.form.join(', ')} | <strong>Strength:</strong> {medicine.strength}
                </div>
                <div className="text-[11px] text-mid-gray truncate">
                  <strong>Brands:</strong> {medicine.brandNames.join(', ')}
                </div>
              </div>

              {/* Email Call To Action Link Button */}
              <div className="pt-2 text-center">
                <Link
                  href={`/admin/medicine/verify`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal/90 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-teal/20 transition-all no-underline"
                >
                  <Stethoscope size={16} />
                  <span>Verify Medicine Details Now</span>
                  <ArrowRight size={14} />
                </Link>
                <div className="text-[10px] text-mid-gray mt-2">
                  Direct Link: <span className="font-mono text-blue underline">https://mediinfo.lk/admin/medicine/verify?id={medicine.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-light-gray flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-off-white text-dark-gray hover:bg-light-gray text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close Window
          </button>
          <Link
            href="/admin/medicine/verify"
            onClick={onClose}
            className="px-5 py-2.5 bg-blue text-white hover:bg-blue/90 text-xs font-bold rounded-xl shadow-md shadow-blue/20 transition-all flex items-center gap-2 no-underline"
          >
            <ShieldCheck size={16} />
            <span>Go to Doctor Verification Section</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
