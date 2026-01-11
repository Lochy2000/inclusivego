import { NextResponse } from 'next/server';
import { mockRoutes } from '@/features/routes/data/mockRoutes';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, activeRequirements } = body;

    // Placeholder search logic
    let filtered = mockRoutes;

    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(route =>
        route.origin.toLowerCase().includes(searchQuery) ||
        route.destination.toLowerCase().includes(searchQuery)
      );
    }

    return NextResponse.json({
      data: {
        routes: filtered,
        count: filtered.length
      },
      success: true
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      success: false,
      error: 'Search failed'
    }, { status: 500 });
  }
}
