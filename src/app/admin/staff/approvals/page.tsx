'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building2, 
  Stethoscope, 
  Eye, 
  Check, 
  X, 
  Download, 
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Users,
  Filter
} from 'lucide-react';
import { useAdminRole } from '@/components/admin/AdminRoleContext';

interface StaffAccount {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  profession: string;
  slmcRegNo: string;
  proofUrl: string;
  status: string;
  hospital?: string;
  specialization?: string;
  createdAt: string;
}

type StaffRequestStatus = 'pending' | 'approved' | 'rejected';
type ProfessionType = 'doctor' | 'pharmacist' | 'nurse' | 'student' | 'other';

export default function StaffApprovalsPage() {
  const { user } = useAdminRole();
  const [requests, setRequests] = useState<StaffAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<StaffRequestStatus | 'all'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<StaffAccount | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadRequests = async () => {
    try {
      const res = await fetch('/api/admin/staff');
      const data = await res.json();
      if (data.success && data.data) {
        setRequests(data.data);
      }
    } catch (e) {
      console.error('Failed to load requests', e);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const refreshData = () => {
    loadRequests();
  };

  const handleApprove = async (reqId: string, notes?: string) => {
    try {
      await fetch('/api/admin/staff/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reqId, status: 'approved' })
      });
      refreshData();
      setSelectedRequest(null);
      setAdminNotes('');
      setToastMessage('Staff member approved! Access granted for login.');
      setTimeout(() => setToastMessage(null), 3500);
    } catch (e) {
      console.error('Failed to approve request', e);
    }
  };

  const handleReject = async (reqId: string, notes?: string) => {
    try {
      await fetch('/api/admin/staff/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reqId, status: 'rejected' })
      });
      refreshData();
      setSelectedRequest(null);
      setAdminNotes('');
      setToastMessage('Registration request rejected.');
      setTimeout(() => setToastMessage(null), 3500);
    } catch (e) {
      console.error('Failed to reject request', e);
    }
  };

  const pendingList = requests.filter((r) => r.status === 'pending');
  const approvedList = requests.filter((r) => r.status === 'approved');
  const rejectedList = requests.filter((r) => r.status === 'rejected');

  const filteredRequests = requests.filter((r) => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesSearch = 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.slmcRegNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.profession.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getProfessionBadge = (prof: ProfessionType) => {
    switch (prof) {
      case 'doctor':
        return <span className="bg-teal/10 text-teal border border-teal/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Stethoscope size={13} /> Medical Doctor</span>;
      case 'pharmacist':
        return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Building2 size={13} /> Pharmacist</span>;
      case 'nurse':
        return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"><UserCheck size={13} /> Registered Nurse</span>;
      case 'student':
        return <span className="bg-blue-light text-blue border border-blue/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">Medical Student</span>;
      default:
        return <span className="bg-off-white text-dark-gray border border-light-gray px-2.5 py-1 rounded-full text-xs font-bold capitalize">{prof}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-near-black text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-teal/40 animate-fade-up">
          <CheckCircle2 size={20} className="text-teal shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold font-plus-jakarta text-near-black tracking-tight m-0 flex items-center gap-2">
            <UserCheck className="text-blue" size={20} />
            <span>Staff Approvals</span>
          </h1>
          <p className="text-xs text-mid-gray m-0 mt-0.5">Verify SLMC credentials and grant staff portal access</p>
        </div>
        {pendingList.length > 0 && (
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-xl text-xs">
            <Clock size={14} className="text-amber-600" />
            <span className="font-bold text-amber-700">{pendingList.length} pending review</span>
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('pending')}
          className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex items-center justify-between ${
            activeTab === 'pending'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-white border-light-gray/60 hover:border-amber-200'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-mid-gray block uppercase tracking-wide">Pending</span>
            <span className="text-xl font-extrabold text-amber-600 font-plus-jakarta">{pendingList.length}</span>
          </div>
          <Clock size={18} className="text-amber-500 opacity-70" />
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex items-center justify-between ${
            activeTab === 'approved'
              ? 'bg-teal/10 border-teal/30'
              : 'bg-white border-light-gray/60 hover:border-teal/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-mid-gray block uppercase tracking-wide">Approved</span>
            <span className="text-xl font-extrabold text-teal font-plus-jakarta">{approvedList.length}</span>
          </div>
          <CheckCircle2 size={18} className="text-teal opacity-70" />
        </button>

        <button
          onClick={() => setActiveTab('rejected')}
          className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex items-center justify-between ${
            activeTab === 'rejected'
              ? 'bg-red/10 border-red/30'
              : 'bg-white border-light-gray/60 hover:border-red/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-mid-gray block uppercase tracking-wide">Declined</span>
            <span className="text-xl font-extrabold text-red font-plus-jakarta">{rejectedList.length}</span>
          </div>
          <XCircle size={18} className="text-red opacity-70" />
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex items-center justify-between ${
            activeTab === 'all'
              ? 'bg-blue-light border-blue/30'
              : 'bg-white border-light-gray/60 hover:border-blue/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-mid-gray block uppercase tracking-wide">Total</span>
            <span className="text-xl font-extrabold text-blue font-plus-jakarta">{requests.length}</span>
          </div>
          <Users size={18} className="text-blue opacity-70" />
        </button>
      </div>

      {/* Search & Filter Strip */}
      <div className="bg-white border border-light-gray/50 rounded-full p-3 px-6 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Search size={18} className="text-mid-gray shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search applicants by name, email, or SLMC registration number..."
            className="w-full text-xs font-bold text-near-black outline-none bg-transparent"
          />
        </div>
        <div className="text-xs text-mid-gray font-semibold shrink-0">
          Showing {filteredRequests.length} of {requests.length}
        </div>
      </div>

      {/* Applicant Cards Grid */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 text-center border border-light-gray/50 text-mid-gray space-y-3 shadow-sm">
            <UserCheck size={40} className="mx-auto text-blue/40" />
            <h3 className="text-base font-bold text-near-black m-0">No staff registration records found</h3>
            <p className="text-xs m-0">Try clearing your search term or switching status tabs above.</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-[24px] border border-light-gray/50 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] hover:border-blue/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Applicant Info Column */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-extrabold text-near-black font-plus-jakarta m-0">
                    {req.name}
                  </h3>
                  {getProfessionBadge(req.profession as ProfessionType)}
                  
                  {req.status === 'pending' && (
                    <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1">
                      <Clock size={12} /> Pending Approval
                    </span>
                  )}
                  {req.status === 'approved' && (
                    <span className="bg-teal/10 text-teal border border-teal/20 px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} /> Approved
                    </span>
                  )}
                  {req.status === 'rejected' && (
                    <span className="bg-red/10 text-red border border-red/20 px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1">
                      <XCircle size={12} /> Declined
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-6 text-xs text-mid-gray">
                  <div><strong className="text-dark-gray">Email:</strong> {req.email}</div>
                  <div><strong className="text-dark-gray">SLMC Reg No:</strong> <span className="font-mono text-blue font-bold">{req.slmcRegNo}</span></div>
                  <div><strong className="text-dark-gray">Submitted:</strong> {new Date(req.createdAt).toLocaleDateString()}</div>
                </div>

                {req.hospital && (
                  <div className="text-xs text-dark-gray flex items-center gap-1.5 pt-1">
                    <Building2 size={14} className="text-mid-gray" />
                    <span>{req.hospital} • {req.specialization || 'Healthcare Professional'}</span>
                  </div>
                )}

              
              </div>

              {/* Action & Proof Column */}
              <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRequest(req);
                    setAdminNotes('');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-light-gray hover:border-blue bg-off-white hover:bg-blue-light text-dark-gray hover:text-blue font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <FileText size={15} />
                  <span>Inspect Proof</span>
                </button>

                {req.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleApprove(req.id)}
                      className="px-4 py-2.5 rounded-xl bg-teal hover:bg-teal/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal/20 transition-all cursor-pointer"
                    >
                      <Check size={16} />
                      <span>Approve</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(req.id)}
                      className="px-4 py-2.5 rounded-xl bg-white border border-red/30 text-red hover:bg-red/5 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <X size={16} />
                      <span>Decline</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Verification & Inspection Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[100] bg-near-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-light-gray shadow-xl overflow-hidden my-12 mx-4 animate-fade-up">
            {/* Modal Header */}
            <div className="bg-off-white border-b border-light-gray p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue/10 text-blue flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-plus-jakarta text-near-black m-0">Credential Inspection</h3>
                  <p className="text-[11px] text-mid-gray m-0">Verify SLMC Registration & Document Proof</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="w-8 h-8 rounded-full bg-off-white hover:bg-light-gray text-mid-gray hover:text-near-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Applicant Summary Header */}
              <div className="p-4 rounded-2xl bg-off-white border border-light-gray flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-xs text-mid-gray font-bold uppercase tracking-wider mb-0.5">Applicant</div>
                  <div className="text-base font-extrabold text-near-black">{selectedRequest.name}</div>
                  <div className="text-xs text-mid-gray">{selectedRequest.email}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-mid-gray font-bold uppercase tracking-wider mb-0.5">SLMC Registration</div>
                  <div className="text-base font-mono font-extrabold text-blue">{selectedRequest.slmcRegNo}</div>
                </div>
              </div>

              {/* Document Proof Box (Simulated Viewer) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark-gray block">Uploaded Verification Document</label>
                <div className="border border-light-gray rounded-2xl p-5 bg-gradient-to-br from-blue-light/40 to-white flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white border border-blue/20 flex items-center justify-center text-blue shadow-sm">
                      <FileText size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-near-black truncate max-w-[200px]">{selectedRequest.proofUrl}</div>
                      <div className="text-[11px] text-mid-gray">Uploaded document proof • PDF / Image format</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.open(selectedRequest.proofUrl, '_blank')}
                      className="px-3.5 py-2 rounded-xl bg-white border border-light-gray text-xs font-bold text-dark-gray hover:text-blue hover:border-blue transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Eye size={14} />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Verification Notes Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-dark-gray block">Super Admin Verification Notes (Optional Audit Record)</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Enter notes (e.g. SLMC # verified against official Sri Lanka Medical Council database)..."
                  className="w-full p-3.5 rounded-xl border border-light-gray bg-white text-xs text-near-black outline-none focus:border-blue transition-all"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-off-white border-t border-light-gray flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-5 py-2.5 rounded-xl border border-light-gray text-xs font-bold text-dark-gray hover:bg-light-gray transition-colors cursor-pointer"
              >
                Close
              </button>
              
              <button
                type="button"
                onClick={() => handleReject(selectedRequest.id)}
                className="px-5 py-2.5 rounded-xl bg-white border border-red/40 text-red hover:bg-red/5 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <X size={15} />
                <span>Decline Request</span>
              </button>

              <button
                type="button"
                onClick={() => handleApprove(selectedRequest.id)}
                className="px-5 py-2.5 rounded-xl bg-teal hover:bg-teal/90 text-white text-xs font-bold shadow-md shadow-teal/20 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Check size={15} />
                <span>Approve Staff Access</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
