import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;

export async function getConnection() {
    if (connection) {
        return connection;
    }

    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'personal_web',
        });

        return connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}

export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const conn = await getConnection();
    const [rows] = await conn.execute(sql, params);
    return rows as T[];
}

export async function closeConnection() {
    if (connection) {
        await connection.end();
        connection = null;
    }
}
