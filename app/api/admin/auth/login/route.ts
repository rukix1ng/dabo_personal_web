import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyPassword, createToken, setAdminToken, hashPassword } from '@/lib/auth';

interface Admin {
    id: number;
    username: string;
    password_hash: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Query admin from database
        const admins = await query<Admin>(
            'SELECT id, username, password_hash FROM admins WHERE username = ?',
            [username]
        );

        if (admins.length === 0) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const admin = admins[0];

        // Check if password hash is placeholder (first time login)
        if (admin.password_hash.includes('placeholder') || admin.password_hash.includes('YourHashWillBeGeneratedByApp')) {
            // First time login - set the password
            const newHash = await hashPassword(password);
            await query(
                'UPDATE admins SET password_hash = ? WHERE id = ?',
                [newHash, admin.id]
            );

            // Create token and set cookie
            const token = await createToken({ id: admin.id, username: admin.username });
            await setAdminToken(token);

            return NextResponse.json({
                success: true,
                user: { id: admin.id, username: admin.username },
            });
        }

        // Verify password
        const isValid = await verifyPassword(password, admin.password_hash);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create token and set cookie
        const token = await createToken({ id: admin.id, username: admin.username });
        await setAdminToken(token);

        return NextResponse.json({
            success: true,
            user: { id: admin.id, username: admin.username },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
