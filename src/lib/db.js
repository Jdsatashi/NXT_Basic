import "server-only";

const { MongoClient, ServerApiVersion } = require("mongodb");

const db_uri = process.env.DB_URI;
const db_name = process.env.DB_NAME;

if (!db_uri) {
  throw new Error("Database URI is not found");
}

const client = new MongoClient(db_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName) {
  try {
    await client.connect();
    console.log("----- Connecting to database -----");
    return client.db(dbName);
  } catch (err) {
    console.log("----- Error connecting to database -----");
    console.log(err);
  }
}

export async function getColct(cltName) {
  const db = await getDB(db_name);
  if (db) return db.collection(cltName);
  return null;
}
