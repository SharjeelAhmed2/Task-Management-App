const { MongoClient } = require('mongodb');

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'taskManager';

// Function to connect to MongoDB
async function connectToMongoDB() {
  const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
  return client.db(dbName);
}

// Function to create a collection with username and password fields and insert initial data
async function createCollectionWithInitialData(collectionName) {
  const db = await connectToMongoDB();
  const collection = db.collection(collectionName);

  // Define initial data to insert into the collection
  const initialData = [
    { username: 'sharjeel', password: '123456' },
    { username: 'ahmed', password: '12345' },
    // Add more initial data as needed
  ];

  // Create collection with specified fields
  await collection.insertMany(initialData);
  console.log(`Collection '${collectionName}' created with initial data`);
}

module.exports = { connectToMongoDB, createCollectionWithInitialData };
