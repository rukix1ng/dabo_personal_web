import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/invitations - Get all invitations (public)
export async function GET() {
    try {
        const invitations = await query<any>(
            'SELECT * FROM invitation ORDER BY event_time DESC, id DESC'
        );

        return NextResponse.json({ invitations });
    } catch (error) {
        console.error('Error fetching invitations:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
