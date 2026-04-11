import { Db, MongoClient } from 'mongodb';

type GlobalMongoState = typeof globalThis & {
  __nextGenFusionMongoClientPromise?: Promise<MongoClient> | null;
};

const globalForMongo = globalThis as GlobalMongoState;

if (!globalForMongo.__nextGenFusionMongoClientPromise) {
  globalForMongo.__nextGenFusionMongoClientPromise = null;
}

function normalizeMongoUri(uri: string): string {
  try {
    const parsedUrl = new URL(uri);
    const username = parsedUrl.username ? decodeURIComponent(parsedUrl.username) : '';
    const password = parsedUrl.password ? decodeURIComponent(parsedUrl.password) : '';

    if (!username || !password) {
      return uri;
    }

    const authPrefix = `${parsedUrl.protocol}//${encodeURIComponent(username)}:${encodeURIComponent(password)}@`;
    const hostAndPath = `${parsedUrl.host}${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;

    return `${authPrefix}${hostAndPath}`;
  } catch {
    const match = uri.match(/^(mongodb(?:\+srv)?):\/\/([^:]+):(.+)@(.+)$/);

    if (!match) {
      return uri;
    }

    const [, protocol, username, rawPassword, hostAndPath] = match;

    return `${protocol}://${encodeURIComponent(username)}:${encodeURIComponent(
      decodeURIComponent(rawPassword)
    )}@${hostAndPath}`;
  }
}

export async function getMongoDb(): Promise<Db> {
  const rawUri = process.env.MONGODB_URI;

  if (!rawUri) {
    throw new Error('Missing MONGODB_URI. Add it to .env.local before using admin auth.');
  }

  const uri = normalizeMongoUri(rawUri);

  if (!globalForMongo.__nextGenFusionMongoClientPromise) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    globalForMongo.__nextGenFusionMongoClientPromise = client.connect();
  }

  const client = await globalForMongo.__nextGenFusionMongoClientPromise;
  return client.db();
}