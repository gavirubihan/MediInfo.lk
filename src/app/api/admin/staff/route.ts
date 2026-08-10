import { NextResponse } from 'next/server';
import { listStaffAccounts } from '@/lib/firebase/dataconnect';

export async function GET() {
  try {
    const result = await listStaffAccounts();
    return NextResponse.json({ success: true, data: result.data.staffAccounts || [] });
  } catch (error: any) {
    console.error('Error fetching staff requests:', error);
    return NextResponse.json({ error: 'Failed to fetch staff requests' }, { status: 500 });
  }
}
