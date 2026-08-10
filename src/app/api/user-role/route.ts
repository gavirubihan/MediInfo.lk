import { NextResponse } from 'next/server';
import { getStaffAccountByFirebaseUid } from '@/lib/firebase/dataconnect';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    // You might also want to check for super_admin emails here, 
    // or keep them in the PRESET_USERS array on the client side for simplicity.

    const result = await getStaffAccountByFirebaseUid({ firebaseUid: uid });
    
    if (!result || !result.staffAccounts || result.staffAccounts.length === 0) {
      return NextResponse.json({ role: 'normal_user', status: null });
    }

    const staffAccount = result.staffAccounts[0];
    
    // Map profession to app roles
    let role = 'other_medical';
    if (staffAccount.profession === 'doctor') {
      role = 'doctor';
    }

    return NextResponse.json({
      role: role,
      status: staffAccount.status,
      staffDetails: staffAccount
    });
  } catch (error: any) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
