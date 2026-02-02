import bcrypt from 'bcryptjs';

async function generateHash() {
    const password = 'lam_nims';
    const hash = await bcrypt.hash(password, 10);
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nSQL command to update:');
    console.log(`UPDATE admins SET password_hash = '${hash}' WHERE username = 'admin';`);
}

generateHash();
