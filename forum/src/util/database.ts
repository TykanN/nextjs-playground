import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";

const url = process.env.DB_URL as string;

const options: MongoClientOptions = {
  serverApi: ServerApiVersion.v1,
};

let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
