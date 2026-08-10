// This file will use the auto-generated Firebase Data Connect SDK
// Run `firebase emulators:start` or `firebase deploy --only dataconnect` to generate it.
// import { createMedicine, createMedicineLocalizedContent, createDosageRow, createWarningCard } from './dataconnect';

export async function saveMedicineToDataConnect(medRecord: any) {
  try {
    console.log("Saving to Data Connect:", medRecord);
    // 1. Core Medicine Insert
    // const coreResult = await createMedicine({
    //   slug: medRecord.slug,
    //   genericName: medRecord.genericName,
    //   chemicalName: medRecord.chemicalName,
    //   category: medRecord.category,
    //   strength: medRecord.strength,
    //   ageGroup: medRecord.ageGroup,
    //   prescriptionRequired: medRecord.prescriptionRequired,
    //   verified: medRecord.verified,
    //   maxDailyDoseAdults: medRecord.maxDailyDoseAdults,
    //   safetyPregnancy: medRecord.safety?.pregnancy || 'caution',
    //   safetyBreastfeeding: medRecord.safety?.breastfeeding || 'caution',
    //   safetyElderly: medRecord.safety?.elderly || 'caution',
    //   safetyChildren: medRecord.safety?.children || 'caution',
    //   brandNames: medRecord.brandNames,
    //   form: medRecord.form,
    // });
    
    // const medicineId = coreResult.data.medicine_insert;

    // 2. Localized Content Inserts
    // for (const lang of ['en', 'si', 'ta']) {
    //   const lc = medRecord.localized[lang];
    //   const lcResult = await createMedicineLocalizedContent({
    //     medicineId,
    //     language: lang,
    //     description: lc.description,
    //     howItWorks: lc.howItWorks,
    //     dosageNotes: lc.dosageNotes,
    //     usedFor: lc.usedFor,
    //     sideEffectsCommon: lc.sideEffectsCommon,
    //     sideEffectsLessCommon: lc.sideEffectsLessCommon,
    //     sideEffectsSerious: lc.sideEffectsSerious,
    //   });
    //   
    //   const lcId = lcResult.data.medicineLocalizedContent_insert;
    //
    //   for (const warning of lc.warningCards) {
    //     await createWarningCard({
    //       localizedContentId: lcId,
    //       title: warning.title,
    //       severity: warning.severity,
    //       text: warning.text
    //     });
    //   }
    // }

    // 3. Dosages
    // for (const row of medRecord.dosageRows) {
    //   await createDosageRow({
    //     medicineId,
    //     ageGroup: row.ageGroup,
    //     dose: row.dose,
    //     frequency: row.frequency,
    //     maxPerDay: row.maxPerDay
    //   });
    // }

    return { success: true };
  } catch (error) {
    console.error("Error saving medicine to Data Connect", error);
    return { success: false, error };
  }
}
