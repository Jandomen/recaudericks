import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error(
    "Falta la variable de entorno MONGODB_URI. Revisa tu archivo .env.local"
  );
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: Cached | undefined;
}

const cached: Cached = globalThis.mongooseCache ?? { conn: null, promise: null };

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
