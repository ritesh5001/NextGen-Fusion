import bcrypt from 'bcryptjs';
import { WithId } from 'mongodb';

import { getMongoDb } from './mongodb';

const ADMIN_COLLECTION = 'admins';

export type AdminDocument = {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function ensureAdminSeed(): Promise<WithId<AdminDocument>> {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || 'Admin';

  if (!email || !password) {
    throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD. Add them to .env.local.');
  }

  const normalizedEmail = normalizeEmail(email);
  const db = await getMongoDb();
  const admins = db.collection<AdminDocument>(ADMIN_COLLECTION);

  await admins.createIndex({ email: 1 }, { unique: true });

  const existingAdmin = await admins.findOne({ email: normalizedEmail });

  if (existingAdmin) {
    return existingAdmin;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const now = new Date();

  const adminDocument: AdminDocument = {
    name,
    email: normalizedEmail,
    passwordHash,
    role: 'admin',
    createdAt: now,
    updatedAt: now,
  };

  const result = await admins.insertOne(adminDocument);

  return {
    ...adminDocument,
    _id: result.insertedId,
  };
}

export async function findAdminByEmail(email: string): Promise<WithId<AdminDocument> | null> {
  const db = await getMongoDb();
  const admins = db.collection<AdminDocument>(ADMIN_COLLECTION);

  await admins.createIndex({ email: 1 }, { unique: true });

  return admins.findOne({ email: normalizeEmail(email) });
}
