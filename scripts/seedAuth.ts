import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import path from 'path';

// Initialize Firebase Admin
if (!getApps().length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const auth = getAuth();

// NOTE: These seed accounts are used for initial setup only.
// Set SEED_PASSWORD in your .env.local before running this script.
const seedPassword = process.env.SEED_PASSWORD;
if (!seedPassword) {
  throw new Error('SEED_PASSWORD env var is required. Set it in .env.local before running.');
}

const users = [
  { email: 'admin@mediinfo.lk', password: seedPassword, displayName: 'Admin User' },
  { email: 'staff@mediinfo.lk', password: seedPassword, displayName: 'Staff User' },
  { email: 'doctor@mediinfo.lk', password: seedPassword, displayName: 'Doctor User' },
  { email: 'nimali.silva@mediinfo.lk', password: seedPassword, displayName: 'Nimali Silva' }
];

async function seedAuth() {
  console.log('Starting to create users in Production Firebase Auth...');

  for (const user of users) {
    try {
      // Check if user already exists
      try {
        const existingUser = await auth.getUserByEmail(user.email);
        console.log(`✅ User ${user.email} already exists (UID: ${existingUser.uid})`);
        continue;
      } catch (error: any) {
        if (error.code !== 'auth/user-not-found') {
          throw error;
        }
      }

      // Create new user
      const userRecord = await auth.createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName,
        emailVerified: true
      });

      console.log(`✅ Created ${user.email} (UID: ${userRecord.uid})`);
    } catch (error: any) {
      console.error(`❌ Failed to create ${user.email}:`, error.message);
    }
  }
  
  console.log('Finished migrating users to production!');
}

seedAuth().catch(console.error);
