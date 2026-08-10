import { NextResponse } from 'next/server';
import { createMedicineVerification, setMedicineVerified } from '@/lib/firebase/dataconnect';
import { listMedicines } from '@/lib/firebase/dataconnect'; // using listMedicines or getMedicineById if it existed

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { medicineId, doctorId, slmcRegNo } = body;

    if (!medicineId || !doctorId || !slmcRegNo) {
      return NextResponse.json({ error: 'Missing required verification fields' }, { status: 400 });
    }

    // Fetch the medicine to check current verifications
    const rawMedicines = await listMedicines();
    const rawMed = rawMedicines.find((m: any) => m.id === medicineId);
    
    if (!rawMed) {
      return NextResponse.json({ error: 'Medicine not found' }, { status: 404 });
    }

    // 2. Check if this doctor already verified it
    const existingVerifications = rawMed.medicineVerifications_on_medicine || [];
    if (existingVerifications.some((v: any) => v.doctorId === doctorId || v.slmcRegNo === slmcRegNo)) {
      return NextResponse.json({ error: 'You have already verified this medicine.' }, { status: 400 });
    }

    // 3. Create the verification record
    await createMedicineVerification({
      medicineId,
      doctorId,
      slmcRegNo,
      verifiedAt: new Date().toISOString(),
    });

    // 4. Check if total verifications is now 2 or more
    const newCount = existingVerifications.length + 1;
    if (newCount >= 2 && !rawMed.verified) {
      await setMedicineVerified(medicineId, true);
    }

    return NextResponse.json({ 
      success: true, 
      verifiedCount: newCount,
      isFullyVerified: newCount >= 2
    });

  } catch (error: any) {
    console.error(`[POST /api/medicine/verify]`, error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
