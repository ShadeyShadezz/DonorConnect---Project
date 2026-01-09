import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const donations = await prisma.donation.findMany({
      include: { donor: true, campaign: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, donorId, campaignId, status } = body;

    if (!amount || !donorId) {
      return NextResponse.json(
        { error: 'Amount and donorId are required' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    const donor = await prisma.donor.findUnique({
      where: { id: donorId }
    });

    if (!donor) {
      return NextResponse.json(
        { error: 'Donor not found' },
        { status: 404 }
      );
    }

    if (campaignId) {
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId }
      });

      if (!campaign) {
        return NextResponse.json(
          { error: 'Campaign not found' },
          { status: 404 }
        );
      }
    }

    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        donorId,
        campaignId: campaignId || null,
        status: status || 'processed'
      },
      include: { donor: true, campaign: true }
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error('Error creating donation:', error);
    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    );
  }
}
