import { sampleMedicines } from '../src/data/medicinesData';

async function seed() {
  console.log(`Starting to seed ${sampleMedicines.length} medicines...`);
  
  for (const med of sampleMedicines) {
    const payload = {
      core: {
        slug: med.slug,
        genericName: med.genericName,
        chemicalName: med.chemicalName,
        category: med.category,
        strength: med.strength,
        ageGroup: med.ageGroup,
        prescriptionRequired: med.prescriptionRequired,
        verified: med.verified,
        createdDate: new Date().toISOString(),
        maxDailyDoseAdults: med.maxDailyDoseAdults,
        safetyPregnancy: '',
        safetyBreastfeeding: '',
        safetyElderly: '',
        safetyChildren: '',
        brandNames: med.brandNames,
        form: med.form,
      },
      dosageRows: med.dosageRows,
      drugInteractions: med.drugInteractions,
      localizedContent: med.localized,
    };

    try {
      const response = await fetch('http://localhost:3000/api/medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      if (response.ok) {
        console.log(`✅ Seeded: ${med.genericName}`);
      } else {
        console.error(`❌ Failed: ${med.genericName} - ${result.error}`);
      }
    } catch (e: any) {
      console.error(`❌ Error seeding ${med.genericName}: ${e.message}`);
    }
  }
  
  console.log('Seeding complete.');
}

seed();
