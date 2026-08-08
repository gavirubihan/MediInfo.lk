export type ProfessionType = 'doctor' | 'pharmacist' | 'nurse' | 'student' | 'other';
export type StaffRequestStatus = 'pending' | 'approved' | 'rejected';

export interface MedicalStaffRequest {
  id: string;
  name: string;
  email: string;
  password?: string;
  profession: ProfessionType;
  slmcRegNo: string;
  proofFileName: string;
  submittedAt: string;
  status: StaffRequestStatus;
  adminNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  specialization?: string;
  hospital?: string;
}

const STORAGE_KEY = 'mediinfo_staff_requests';

export const INITIAL_STAFF_REQUESTS: MedicalStaffRequest[] = [
  {
    id: 'req-101',
    name: 'Dr. Ruwan Jayasinghe',
    email: 'ruwan.j@hospital.lk',
    profession: 'doctor',
    slmcRegNo: 'SLMC-68420',
    proofFileName: 'SLMC_Doctor_License_2026.pdf',
    submittedAt: '2026-08-07T14:30:00Z',
    status: 'pending',
    specialization: 'General Practitioner',
    hospital: 'Colombo South Teaching Hospital'
  },
  {
    id: 'req-102',
    name: 'Dilani Fernando',
    email: 'dilani.f@pharmacy.lk',
    profession: 'pharmacist',
    slmcRegNo: 'SLMC-89102',
    proofFileName: 'Pharmacy_Council_Cert.jpg',
    submittedAt: '2026-08-08T08:15:00Z',
    status: 'pending',
    specialization: 'Clinical Pharmacist',
    hospital: 'Lanka Hospitals Colombo'
  },
  {
    id: 'req-103',
    name: 'Dr. Anura Senanayake',
    email: 'anura.s@mediinfo.lk',
    profession: 'doctor',
    slmcRegNo: 'SLMC-41905',
    proofFileName: 'Medical_Registration_Card.png',
    submittedAt: '2026-08-05T10:00:00Z',
    status: 'approved',
    adminNotes: 'Verified against Sri Lanka Medical Council official registry database.',
    reviewedAt: '2026-08-05T16:20:00Z',
    reviewedBy: 'Super Administrator',
    specialization: 'Consultant Cardiologist',
    hospital: 'National Hospital of Sri Lanka'
  },
  {
    id: 'req-104',
    name: 'Mahesh Perera',
    email: 'mahesh.p@health.gov.lk',
    profession: 'nurse',
    slmcRegNo: 'SLMC-12093',
    proofFileName: 'National_ID_Proof.jpg',
    submittedAt: '2026-08-04T11:45:00Z',
    status: 'rejected',
    adminNotes: 'Uploaded document is a personal ID card rather than official SLMC nursing license.',
    reviewedAt: '2026-08-04T15:10:00Z',
    reviewedBy: 'Super Administrator',
    specialization: 'Registered Nurse',
    hospital: 'Kandy General Hospital'
  }
];

export function getStaffRequests(): MedicalStaffRequest[] {
  if (typeof window === 'undefined') return INITIAL_STAFF_REQUESTS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STAFF_REQUESTS));
    return INITIAL_STAFF_REQUESTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_STAFF_REQUESTS;
  }
}

export function saveStaffRequests(requests: MedicalStaffRequest[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function addStaffRequest(data: Omit<MedicalStaffRequest, 'id' | 'submittedAt' | 'status'>): MedicalStaffRequest {
  const current = getStaffRequests();
  const newReq: MedicalStaffRequest = {
    ...data,
    id: `req-${Date.now().toString().slice(-4)}`,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  };
  const updated = [newReq, ...current];
  saveStaffRequests(updated);
  return newReq;
}

export function approveStaffRequest(id: string, adminNotes?: string, reviewedBy = 'Super Administrator'): MedicalStaffRequest | null {
  const current = getStaffRequests();
  let approvedItem: MedicalStaffRequest | null = null;
  const updated = current.map((req) => {
    if (req.id === id) {
      approvedItem = {
        ...req,
        status: 'approved',
        adminNotes: adminNotes || 'Approved by Super Administrator.',
        reviewedAt: new Date().toISOString(),
        reviewedBy
      };
      return approvedItem;
    }
    return req;
  });
  saveStaffRequests(updated);
  return approvedItem;
}

export function rejectStaffRequest(id: string, adminNotes?: string, reviewedBy = 'Super Administrator'): MedicalStaffRequest | null {
  const current = getStaffRequests();
  let rejectedItem: MedicalStaffRequest | null = null;
  const updated = current.map((req) => {
    if (req.id === id) {
      rejectedItem = {
        ...req,
        status: 'rejected',
        adminNotes: adminNotes || 'Registration request declined by Super Administrator.',
        reviewedAt: new Date().toISOString(),
        reviewedBy
      };
      return rejectedItem;
    }
    return req;
  });
  saveStaffRequests(updated);
  return rejectedItem;
}

export function getPendingStaffCount(): number {
  const current = getStaffRequests();
  return current.filter((r) => r.status === 'pending').length;
}

export function findStaffByEmail(email: string): MedicalStaffRequest | undefined {
  const current = getStaffRequests();
  return current.find((r) => r.email.toLowerCase() === email.trim().toLowerCase());
}
