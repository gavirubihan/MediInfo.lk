'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface AdminRoleContextType {
  user: AdminUser | null;
  login: (email: string) => boolean;
  logout: () => void;
  switchUser: (userId: string) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AdminRoleContext = createContext<AdminRoleContextType | undefined>(undefined);

export function AdminRoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mediinfo_admin_user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const matched = PRESET_USERS.find(
      (u) => u.email.toLowerCase() === cleanEmail || (cleanEmail.includes('doc') && u.role === 'doctor')
    );

    const targetUser = matched || PRESET_USERS[0];
    setUser(targetUser);
    localStorage.setItem('mediinfo_admin_user', JSON.stringify(targetUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mediinfo_admin_user');
  };

  const switchUser = (userId: string) => {
    const found = PRESET_USERS.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      localStorage.setItem('mediinfo_admin_user', JSON.stringify(found));
    }
  };

  return (
    <AdminRoleContext.Provider
      value={{
        user,
        login,
        logout,
        switchUser,
        isAuthenticated: !!user,
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
