import mongoose from "mongoose";

type ConnectionObjectType = {
  isConnected?: number;
};
const connection: ConnectionObjectType = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to DB");
    return;
  }

  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = dbConnection.connections[0].readyState;
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("DB connection failed", error);
    // process.exit(1);
  }
}
export default dbConnect;
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const options = {};

// let client;
// let clientPromise: Promise<MongoClient>;

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;
