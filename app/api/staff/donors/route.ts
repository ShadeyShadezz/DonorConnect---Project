import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const donors = await prisma.donor.findMany({
      include: { donations: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(donors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donors' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const donor = await prisma.donor.create({
      data: { name, email, phone, address },
      include: { donations: true }
    });

    return NextResponse.json(donor, { status: 201 });
  } catch (error: any) {
    console.error('Error creating donor:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create donor' },
      { status: 500 }
    );
  }
}
