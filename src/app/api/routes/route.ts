import { NextResponse } from 'next/server';
import { mockRoutes } from '@/features/routes/data/mockRoutes';
import type { RoutesResponse } from '@/types';

export async function GET() {
  try {
    const response: RoutesResponse = {
      routes: mockRoutes,
      count: mockRoutes.length
    };

    return NextResponse.json({
      data: response,
      success: true
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      success: false,
      error: 'Failed to fetch routes'
    }, { status: 500 });
  }
}
