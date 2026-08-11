const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Point the admin SDK to the local Auth Emulator
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

initializeApp({ projectId: 'mediinfo-lk' });

// NOTE: These are LOCAL EMULATOR ONLY seed accounts. Do NOT use real passwords here.
// For local dev, any password works since the emulator is not a real Firebase project.
const users = [
  { email: 'admin@mediinfo.lk', password: process.env.SEED_PASSWORD || 'dev-password-local', role: 'super_admin' },
  { email: 'doctor@mediinfo.lk', password: process.env.SEED_PASSWORD || 'dev-password-local', role: 'doctor' },
  { email: 'nimali.silva@mediinfo.lk', password: process.env.SEED_PASSWORD || 'dev-password-local', role: 'doctor' },
  { email: 'staff@mediinfo.lk', password: process.env.SEED_PASSWORD || 'dev-password-local', role: 'other_medical' }
];

async function seed() {
  const auth = getAuth();
  for (const u of users) {
    try {
      const userRecord = await auth.createUser({
        email: u.email,
        password: u.password,
        emailVerified: true
      });
      
      // Set the custom role claim
      await auth.setCustomUserClaims(userRecord.uid, { role: u.role });
      console.log(`Successfully created user: ${u.email} with role: ${u.role}`);
    } catch (e) {
      if (e.code === 'auth/email-already-exists') {
         console.log(`User ${u.email} already exists.`);
      } else {
         console.error(`Error creating ${u.email}:`, e.message);
      }
    }
  }
  process.exit();
}

seed();
