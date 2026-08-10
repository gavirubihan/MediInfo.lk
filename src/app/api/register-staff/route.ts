import { NextResponse } from 'next/server';
import { createStaffAccount } from '@/lib/firebase/dataconnect';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firebaseUid, email, name, profession, slmcRegNo, proofUrl } = body;

    if (!firebaseUid || !email || !name || !profession || !slmcRegNo || !proofUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const createdAt = new Date().toISOString();

    const response = await createStaffAccount({
      firebaseUid,
      email,
      name,
      profession,
      slmcRegNo,
      proofUrl,
      status: 'pending',
      hospital: '',
      specialization: '',
      createdAt
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error('Error registering staff:', error);
    return NextResponse.json({ error: error.message || 'Failed to register staff account' }, { status: 500 });
  }
}
