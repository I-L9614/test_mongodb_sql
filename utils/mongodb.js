import { MongoClient } from 'mongodb';

let db;

export async function initMongoDb() {
  const client = new MongoClient(
    'mongodb://admin:password123@localhost:27018/users?authSource=admin'
  );

  await client.connect();
  db = client.db('usersdb');

  await db.collection('users').createIndex(
    { username: 1 },
    { unique: true }
  );
}

export function getMongoDbConnection() {
  return db;
}