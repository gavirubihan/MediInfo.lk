'use client';
import React, { useEffect, useState } from 'react';
import { MedicineForm, MedicineFormData } from '@/components/admin/MedicineForm';
import { Pill } from 'lucide-react';

export default function EditMedicinePage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  const [initialData, setInitialData] = useState<MedicineFormData & { id?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/medicine/${unwrappedParams.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        if (data.medicine) {
          // Pre-populate data mapping
          const med = data.medicine;
          setInitialData({
            id: med.id,
            genericName: med.genericName || '',
            chemicalName: med.chemicalName || '',
            brandNames: med.brandNames || [],
            slug: med.slug || '',
            category: med.category || '',
            form: med.form || [],
            strength: med.strength || '',
            ageGroup: med.ageGroup || '',
            prescriptionRequired: med.prescriptionRequired || false,
            verified: med.verified || false,
            maxDailyDoseAdults: med.maxDailyDoseAdults || '',
            dosageRows: med.dosageRows || [],
            drugInteractions: med.drugInteractions || [],
            safety: med.safety || {
              pregnancy: 'caution',
              breastfeeding: 'caution',
              elderly: 'caution',
              children: 'caution',
            },
            localizedContent: {
              en: { description: '', usedFor: [], howItWorks: '', dosageNotes: '', sideEffectsCommon: [], sideEffectsLessCommon: [], sideEffectsSerious: [], warningCards: [], ...(med.localized?.en || {}) },
              si: { description: '', usedFor: [], howItWorks: '', dosageNotes: '', sideEffectsCommon: [], sideEffectsLessCommon: [], sideEffectsSerious: [], warningCards: [], ...(med.localized?.si || {}) },
              ta: { description: '', usedFor: [], howItWorks: '', dosageNotes: '', sideEffectsCommon: [], sideEffectsLessCommon: [], sideEffectsSerious: [], warningCards: [], ...(med.localized?.ta || {}) },
            },
          });
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [unwrappedParams.slug]);

  if (isLoading) {
    return <div className="p-8 text-center text-sm font-bold text-mid-gray animate-pulse">Loading medicine details...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-sm font-bold text-red-500">Error: {error}</div>;
  }

  return (
    <div className="animate-fade-up">
      {initialData ? (
        <MedicineForm initialData={initialData} />
      ) : (
        <div className="p-8 text-center text-sm font-bold text-mid-gray">Medicine not found.</div>
      )}
    </div>
  );
}
