import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

type RouteContext = {
    params: Promise<{ id: string }>;
};

// GET /api/invitations/[id] - Get single invitation (public)
export async function GET(request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;

        const invitations = await query<any>(
            'SELECT * FROM invitation WHERE id = ?',
            [parseInt(id)]
        );

        if (invitations.length === 0) {
            return NextResponse.json(
                { error: 'Invitation not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ invitation: invitations[0] });
    } catch (error) {
        console.error('Error fetching invitation:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
