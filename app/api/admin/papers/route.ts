import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';
import type { Publication } from '@/types/database';

// GET /api/admin/papers - Get all papers
export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 20;
        const offset = (page - 1) * limit;

        const papers = await query<any>(
            'SELECT * FROM publications ORDER BY year DESC, id DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );

        const countResult = await query<any>('SELECT COUNT(*) as total FROM publications');
        const total = countResult[0]?.total || 0;
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({ 
            papers,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error fetching papers:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/admin/papers - Create new paper
export async function POST(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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

        const result = await query(
            'INSERT INTO publications (title, authors, journal, year, link) VALUES (?, ?, ?, ?, ?)',
            [title, authorsStr, journal, parseInt(year), link || null]
        );

        return NextResponse.json({
            success: true,
            id: (result as any).insertId,
        });
    } catch (error) {
        console.error('Error creating paper:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
