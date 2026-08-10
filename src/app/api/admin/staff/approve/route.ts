import { NextResponse } from 'next/server';
import { updateStaffStatus } from '@/lib/firebase/dataconnect';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const response = await updateStaffStatus({
      id,
      status
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error('Error updating staff status:', error);
    return NextResponse.json({ error: error.message || 'Failed to update staff status' }, { status: 500 });
  }
}
