const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'taskManager';
const collectionName = 'users'; // Collection name for user data

// Function to connect to MongoDB
async function connectToMongoDB() {
  const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
  return client.db(dbName);
}

// Function to create a collection with hashed passwords
async function createCollectionWithHashedPasswords() {
  try {
    // Connect to MongoDB
    const db = await connectToMongoDB();
    const collection = db.collection(collectionName);

    // Hash passwords before insertion
    const hashedPassword1 = bcrypt.hashSync('123456', 10); // Hash password using bcrypt
    const hashedPassword2 = bcrypt.hashSync('12345', 10); // Hash password using bcrypt

    // Insert user data with hashed passwords
    await collection.insertMany([
      { username: 'sharjeel', password: hashedPassword1 },
      { username: 'ahmed', password: hashedPassword2 },
      // Add more user data as needed
    ]);

    console.log('Collection created with hashed passwords');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call createCollectionWithHashedPasswords function
createCollectionWithHashedPasswords();
