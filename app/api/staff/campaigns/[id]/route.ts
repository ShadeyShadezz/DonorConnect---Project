import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, goal, status } = body;
    const id = params.id;

    if (!name || goal === undefined) {
      return NextResponse.json(
        { error: 'Name and goal are required' },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        name,
        description,
        goal: parseFloat(goal),
        status
      },
      include: { donations: true }
    });

    return NextResponse.json(campaign);
  } catch (error: any) {
    console.error('Error updating campaign:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update campaign' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.campaign.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Campaign deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting campaign:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete campaign' },
      { status: 500 }
    );
  }
}
