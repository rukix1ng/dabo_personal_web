import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

async function initializeAdmin() {
    try {
        // Create admins table if not exists
        await query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

        // Check if admin exists
        const existing = await query('SELECT id FROM admins WHERE username = ?', ['admin']);

        if (existing.length === 0) {
            // Create default admin account
            const passwordHash = await hashPassword('lam_nims');
            await query(
                'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
                ['admin', passwordHash]
            );
            console.log('✅ Admin account created successfully');
        } else {
            console.log('ℹ️  Admin account already exists');
        }
    } catch (error) {
        console.error('❌ Error initializing admin:', error);
        throw error;
    }
}

// Run initialization
initializeAdmin()
    .then(() => {
        console.log('✅ Database initialization complete');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Database initialization failed:', error);
        process.exit(1);
    });
