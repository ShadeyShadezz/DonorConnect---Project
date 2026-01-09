import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, address } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const donor = await prisma.donor.update({
      where: { id },
      data: { name, email, phone, address },
      include: { donations: true }
    });

    return NextResponse.json(donor);
  } catch (error: any) {
    console.error('Error updating donor:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Donor not found' },
        { status: 404 }
      );
    }
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update donor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.donor.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Donor deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting donor:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Donor not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete donor' },
      { status: 500 }
    );
  }
}
