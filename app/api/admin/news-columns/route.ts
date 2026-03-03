import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

// GET /api/admin/news-columns - Get all news columns
export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const newsColumns = await query<any>(
            'SELECT * FROM news_column ORDER BY series_number DESC, publish_date DESC, id DESC'
        );

        return NextResponse.json({ newsColumns });
    } catch (error) {
        console.error('Error fetching news columns:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/admin/news-columns - Create new news column
export async function POST(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            title_en, title_zh, title_ja,
            content_en, content_zh, content_ja,
            journal_name_en, journal_name_zh, journal_name_ja,
            author_bio_en, author_bio_zh, author_bio_ja,
            publish_date, series_number, image, is_published
        } = body;

        // Validate required fields
        if (!title_en || !title_zh || !title_ja || !series_number) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const result = await query(
            `INSERT INTO news_column (
                title_en, title_zh, title_ja,
                content_en, content_zh, content_ja,
                journal_name_en, journal_name_zh, journal_name_ja,
                author_bio_en, author_bio_zh, author_bio_ja,
                publish_date, series_number, image
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title_en, title_zh, title_ja,
                content_en || null, content_zh || null, content_ja || null,
                journal_name_en || null, journal_name_zh || null, journal_name_ja || null,
                author_bio_en || null, author_bio_zh || null, author_bio_ja || null,
                publish_date || null, series_number, image || null
            ]
        );

        return NextResponse.json({
            success: true,
            id: (result as any).insertId,
        });
    } catch (error) {
        console.error('Error creating news column:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
