import argon2 from 'argon2';
async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password);
    console.log('Hashed Password:', hash);
    return hash;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err; // Re-throw the error for proper handling
  }
}

// Example usage:
hashPassword('admin123');