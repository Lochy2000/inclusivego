import { NextResponse } from 'next/server';
import { mockRequirements } from '@/features/requirements/data/mockRequirements';

export async function GET() {
  try {
    return NextResponse.json({
      data: mockRequirements,
      success: true
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      success: false,
      error: 'Failed to fetch requirements'
    }, { status: 500 });
  }
}
