import mongoose from 'mongoose';
const { MongoClient, ServerApiVersion } = require('mongodb');
const Uri = process.env.MONGODB_URI;

if (!Uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(Uri as string);
    console.log('connected');
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
