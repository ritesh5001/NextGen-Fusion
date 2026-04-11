import { MongoClient } from 'mongodb';

const globalForMongo = globalThis;

if (!globalForMongo.__nextGenFusionMongoClientPromise) {
  globalForMongo.__nextGenFusionMongoClientPromise = null;
}

export async function getMongoDb() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Missing MONGODB_URI. Add it to .env.local before using admin auth.');
  }

  if (!globalForMongo.__nextGenFusionMongoClientPromise) {
    const client = new MongoClient(uri);
    globalForMongo.__nextGenFusionMongoClientPromise = client.connect();
  }

  const client = await globalForMongo.__nextGenFusionMongoClientPromise;
  return client.db();
}