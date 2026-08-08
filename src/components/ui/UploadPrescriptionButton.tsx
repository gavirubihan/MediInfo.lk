'use client';
import React, { useState } from 'react';
import { PrescriptionUploadModal } from './PrescriptionUploadModal';

interface UploadPrescriptionButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const UploadPrescriptionButton: React.FC<UploadPrescriptionButtonProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className={`inline-block ${className || ''}`}>
        {children}
      </div>
      <PrescriptionUploadModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
