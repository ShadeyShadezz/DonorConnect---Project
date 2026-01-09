import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.donation.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Donation deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting donation:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete donation' },
      { status: 500 }
    );
  }
}
