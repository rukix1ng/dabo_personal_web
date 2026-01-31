import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';
import type { Publication } from '@/types/database';

// GET /api/admin/papers/[id] - Get single paper
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const papers = await query<Publication>(
            'SELECT * FROM publications WHERE id = ?',
            [parseInt(id)]
        );

        if (papers.length === 0) {
            return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
        }

        return NextResponse.json({ paper: papers[0] });
    } catch (error) {
        console.error('Error fetching paper:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT /api/admin/papers/[id] - Update paper
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { title, authors, journal, year, link } = body;

        if (!title || !authors || !journal || !year) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Convert authors array to JSON string
        const authorsStr = Array.isArray(authors)
            ? JSON.stringify(authors)
            : authors;

        await query(
            'UPDATE publications SET title = ?, authors = ?, journal = ?, year = ?, link = ? WHERE id = ?',
            [title, authorsStr, journal, parseInt(year), link || null, parseInt(id)]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating paper:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/papers/[id] - Delete paper
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await query('DELETE FROM publications WHERE id = ?', [parseInt(id)]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting paper:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
