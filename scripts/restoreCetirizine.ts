import { sampleMedicines } from '../src/data/medicinesData';

async function restore() {
  const medicineToRestore = sampleMedicines.find(m => m.slug === 'paracetamol');
  if (!medicineToRestore) {
    console.error('Paracetamol not found in sample data');
    return;
  }

  try {
    const getRes = await fetch('http://localhost:3000/api/medicine/paracetamol');
    const getData = await getRes.json();
    
    if (!getData.medicine || !getData.medicine.id) {
      console.error('Failed to fetch existing paracetamol from DB');
      return;
    }

    const id = getData.medicine.id;
    console.log(`Found Paracetamol with ID: ${id}. Restoring...`);

    const payload = {
      id,
      core: {
        slug: medicineToRestore.slug,
        genericName: medicineToRestore.genericName,
        chemicalName: medicineToRestore.chemicalName,
        category: medicineToRestore.category,
        strength: medicineToRestore.strength,
        ageGroup: medicineToRestore.ageGroup,
        prescriptionRequired: medicineToRestore.prescriptionRequired,
        verified: medicineToRestore.verified,
        createdDate: new Date().toISOString().split('T')[0],
        maxDailyDoseAdults: medicineToRestore.maxDailyDoseAdults,
        safetyPregnancy: 'safe',
        safetyBreastfeeding: 'safe',
        safetyElderly: 'caution',
        safetyChildren: 'safe',
        brandNames: medicineToRestore.brandNames,
        form: medicineToRestore.form,
      },
      dosageRows: medicineToRestore.dosageRows,
      drugInteractions: medicineToRestore.drugInteractions,
      localizedContent: medicineToRestore.localized,
    };

    const response = await fetch('http://localhost:3000/api/medicine/paracetamol', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    const result = await response.json();
    if (response.ok) {
      console.log(`✅ Restored: ${medicineToRestore.genericName}`);
    } else {
      console.error(`❌ Failed: ${medicineToRestore.genericName} - ${result.error}`);
    }
  } catch (e: any) {
    console.error(`❌ Error restoring ${medicineToRestore?.genericName}: ${e.message}`);
  }
}

restore();
