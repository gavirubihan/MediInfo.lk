import { NextResponse } from 'next/server';
import {
  listMedicines,
  createMedicine,
  createLocalizedContent,
  createDosageRow,
  createWarningCard,
  createDrugInteraction,
} from '@/lib/firebase/dataconnect';

// GET /api/medicine — list all medicines
export async function GET() {
  try {
    const rawMedicines = await listMedicines();
    
    // Map Data Connect format to the legacy JSON format expected by the UI
    const medicines = rawMedicines.map((med: any) => {
      const localized: any = {};
      if (med.medicineLocalizedContents_on_medicine) {
        med.medicineLocalizedContents_on_medicine.forEach((lc: any) => {
          localized[lc.language] = {
            ...lc,
            warningCards: lc.warningCards_on_localizedContent || []
          };
        });
      }

      return {
        ...med,
        dosageRows: med.dosageRows_on_medicine || [],
        drugInteractions: med.drugInteractions_on_medicine || [],
        verifications: med.medicineVerifications_on_medicine || [],
        localized,
        safety: {
          pregnancy: med.safetyPregnancy,
          breastfeeding: med.safetyBreastfeeding,
          elderly: med.safetyElderly,
          children: med.safetyChildren
        }
      };
    });

    return NextResponse.json({ medicines });
  } catch (error: any) {
    console.error('[GET /api/medicine]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/medicine — create new medicine with all related data
export async function POST(request: any) {
  try {
    const body = await request.json();
    const { core, dosageRows, drugInteractions, localizedContent } = body;

    // 1. Insert core medicine record
    const medicineId = await createMedicine(core);

    // 2. Insert dosage rows
    for (const row of dosageRows ?? []) {
      await createDosageRow({
        medicineId,
        ageGroup: row.ageGroup,
        dose: row.dose,
        frequency: row.frequency,
        maxPerDay: row.maxPerDay,
      });
    }

    // 3. Insert drug interactions
    for (const interaction of drugInteractions ?? []) {
      await createDrugInteraction({
        medicineId,
        drug: interaction.drug,
        note: interaction.note,
      });
    }

    // 4. Insert localized content (en, si, ta) and their warning cards
    for (const lang of ['en', 'si', 'ta']) {
      const lc = localizedContent?.[lang];
      if (!lc) continue;

      const lcId = await createLocalizedContent({
        medicineId,
        language: lang,
        description: lc.description || '',
        howItWorks: lc.howItWorks || '',
        dosageNotes: lc.dosageNotes || '',
        usedFor: lc.usedFor || [],
        sideEffectsCommon: lc.sideEffectsCommon || [],
        sideEffectsLessCommon: lc.sideEffectsLessCommon || [],
        sideEffectsSerious: lc.sideEffectsSerious || [],
      });

      for (const card of lc.warningCards ?? []) {
        await createWarningCard({
          localizedContentId: lcId,
          title: card.title,
          severity: card.severity,
          text: card.text,
        });
      }
    }

    return NextResponse.json({ success: true, medicineId }, { status: 201 });
  } catch (error: any) {
    console.error('[POST /api/medicine]', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
