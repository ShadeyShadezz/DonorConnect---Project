import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // This will throw if user is not authenticated
    const user = await requireAuth(request);
    
    return NextResponse.json({
      message: 'Access granted to protected endpoint',
      user,
      data: { secret: 'This is protected data only for authenticated users' }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
