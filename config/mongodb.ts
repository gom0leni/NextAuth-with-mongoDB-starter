import { ConnectOptions, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Add Mongo URI to .env.local");
  }

  const client = new MongoClient(MONGODB_URI, options as ConnectOptions);
  return client.connect();
}