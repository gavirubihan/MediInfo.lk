'use client';
import React, { useState, useEffect } from 'react';
import { PrescriptionUploadModal } from './PrescriptionUploadModal';
import { useRouter, usePathname } from '@/i18n/routing';

interface UploadPrescriptionButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const UploadPrescriptionButton: React.FC<UploadPrescriptionButtonProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, [pathname]);

  const handleClick = () => {
    if (isLoggedIn) {
      setIsOpen(true);
    } else {
      router.push('/login?view=signup');
    }
  };

  return (
    <>
      <div onClick={handleClick} className={`inline-block ${className || ''}`}>
        {children}
      </div>
      <PrescriptionUploadModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
