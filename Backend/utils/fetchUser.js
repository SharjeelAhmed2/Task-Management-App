const { MongoClient } = require('mongodb');

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'taskManager';
const collectionName = 'users'; // Collection name for user data

// Function to connect to MongoDB
async function connectToMongoDB() {
  const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
  return client.db(dbName);
}

// Function to fetch user data from MongoDB
async function fetchUserData() {
  const db = await connectToMongoDB();
  const collection = db.collection(collectionName);

  // Fetch user data from the collection
  const userData = await collection.find().toArray();
  console.log('User Data:', userData);
  return userData;
}


module.exports = { connectToMongoDB, fetchUserData };