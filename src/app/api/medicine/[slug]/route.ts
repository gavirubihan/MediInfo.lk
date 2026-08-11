import { NextResponse } from 'next/server';
import {
  getMedicineBySlug,
  updateMedicineCore,
  deleteMedicineRelations,
  createDosageRow,
  createDrugInteraction,
  createLocalizedContent,
  createWarningCard
} from '@/lib/firebase/dataconnect';

export async function GET(request: any, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  try {
    const rawMed = await getMedicineBySlug(slug);
    if (!rawMed) {
      return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
    }

    // Map Data Connect format to the legacy JSON format expected by the UI
    const localized: any = {};
    if (rawMed.localizedContents) {
      rawMed.localizedContents.forEach((lc: any) => {
        localized[lc.language] = {
          ...lc,
          warningCards: lc.warningCards || []
        };
      });
    }

    const medicine = {
      ...rawMed,
      verifications: rawMed.medicineVerifications_on_medicine || [],
      localized,
      safety: {
        pregnancy: rawMed.safetyPregnancy,
        breastfeeding: rawMed.safetyBreastfeeding,
        elderly: rawMed.safetyElderly,
        children: rawMed.safetyChildren
      }
    };

    return NextResponse.json({ medicine });
  } catch (error: any) {
    console.error(`[GET /api/medicine/${slug}]`, error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: any, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  try {
    const body = await request.json();
    const { id, core, dosageRows, drugInteractions, localizedContent } = body;

    if (!id) {
      return NextResponse.json({ error: 'Medicine ID is required for update' }, { status: 400 });
    }

    // 1. Update core medicine record
    await updateMedicineCore({
      id,
      ...core,
      imageUrl: core.imageUrl ?? undefined,
    });

    // 2. Delete all existing relations for this medicine
    await deleteMedicineRelations(id);

    // 3. Re-insert dosage rows
    for (const row of dosageRows ?? []) {
      await createDosageRow({
        medicineId: id,
        ageGroup: row.ageGroup,
        dose: row.dose,
        frequency: row.frequency,
        maxPerDay: row.maxPerDay,
      });
    }

    // 4. Re-insert drug interactions
    for (const interaction of drugInteractions ?? []) {
      await createDrugInteraction({
        medicineId: id,
        drug: interaction.drug,
        note: interaction.note,
      });
    }

    // 5. Re-insert localized content (en, si, ta) and their warning cards
    for (const lang of ['en', 'si', 'ta']) {
      const lc = localizedContent?.[lang];
      if (!lc) continue;

      const lcId = await createLocalizedContent({
        medicineId: id,
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error(`[PUT /api/medicine/${slug}]`, error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
