'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/client';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

export type AdminRole = 'super_admin' | 'doctor' | 'other_medical';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatarUrl?: string;
  doctorId?: string;
  slmcRegNo?: string;
  specialization?: string;
  hospital?: string;
}

// Keep PRESET_USERS for display metadata mapping (name, role, specialization etc.)
// Firebase Auth only stores email/uid — we enrich it with this local map.
export const PRESET_USERS: AdminUser[] = [
  {
    id: 'usr-admin',
    email: 'admin@mediinfo.lk',
    name: 'Super Administrator',
    role: 'super_admin',
  },
  {
    id: 'usr-doc1',
    email: 'doctor@mediinfo.lk',
    name: 'Dr. Saman Perera',
    role: 'doctor',
    doctorId: 'doc-01',
    slmcRegNo: 'SLMC-45291',
    specialization: 'Senior Clinical Pharmacologist',
    hospital: 'National Hospital of Sri Lanka',
  },
  {
    id: 'usr-doc2',
    email: 'nimali.silva@mediinfo.lk',
    name: 'Dr. Nimali Silva',
    role: 'doctor',
    doctorId: 'doc-02',
    slmcRegNo: 'SLMC-51820',
    specialization: 'Consultant Physician',
    hospital: 'Asiri Surgical Hospital',
  },
  {
    id: 'usr-staff',
    email: 'staff@mediinfo.lk',
    name: 'Kavinda Bandara (Pharmacist)',
    role: 'other_medical',
    specialization: 'Lead Medical Editor / Pharmacist',
    hospital: 'MediInfo Content Team',
  },
];

function getUserMetadata(firebaseUser: User): AdminUser {
  const email = firebaseUser.email?.toLowerCase() || '';
  const preset = PRESET_USERS.find((u) => u.email.toLowerCase() === email);
  if (preset) return preset;
  // Fallback for unknown users
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || firebaseUser.email || 'Admin User',
    role: 'other_medical',
  };
}

interface AdminRoleContextType {
  user: AdminUser | null;
  firebaseUser: User | null;
  logout: () => Promise<void>;
  switchUser: (userId: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AdminRoleContext = createContext<AdminRoleContextType | undefined>(undefined);

export function AdminRoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        setUser(getUserMetadata(fbUser));
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    // 1. Sign out from Firebase Auth (clears client-side session)
    await signOut(auth);
    // 2. Delete the server-side httpOnly cookie
    await fetch('/api/logout', { method: 'POST' });
    // 3. Hard redirect to login
    window.location.href = '/en/login';
  };

  const switchUser = (userId: string) => {
    // Dev-only: switch display metadata without re-authenticating
    const found = PRESET_USERS.find((u) => u.id === userId);
    if (found) setUser(found);
  };

  return (
    <AdminRoleContext.Provider
      value={{
        user,
        firebaseUser,
        logout,
        switchUser,
        isAuthenticated: !!firebaseUser,
        isLoading,
      }}
    >
      {children}
    </AdminRoleContext.Provider>
  );
}

export function useAdminRole() {
  const context = useContext(AdminRoleContext);
  if (!context) {
    throw new Error('useAdminRole must be used within an AdminRoleProvider');
  }
  return context;
}
