import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalDonors, donations, activeCampaigns] = await Promise.all([
      prisma.donor.count(),
      prisma.donation.findMany({
        include: { donor: true }
      }),
      prisma.campaign.count({
        where: { status: 'active' }
      })
    ]);

    const activeDonors = new Set(donations.map(d => d.donorId)).size;
    const totalDonations = donations.length;
    const lifetimeDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const monthlyDonations = donations
      .filter(d => new Date(d.createdAt) >= monthAgo)
      .reduce((sum, d) => sum + d.amount, 0);

    return NextResponse.json({
      totalDonors,
      activeDonors,
      lifetimeDonations,
      monthlyDonations,
      activeCampaigns,
      totalDonations
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
