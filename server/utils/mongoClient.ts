// server/utils/mongoClient.ts
import { MongoClient } from 'mongodb';

let client: MongoClient;

// TODO: Not used.
export async function getMongoClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect();
  }
  return client;
}