// const { MongoClient } = require('mongodb');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'taskManager';

// // New fields to be added
// const newFields = {
//   fullName: "",
//   contactInfo: "",
//   profilePicture: ""
// };
// console.log("Above MongoClient");
// // Connect to MongoDB server

// async function connectToMongoDB() {
//     const client = await MongoClient.connect(url);
//     return client.db(dbName);
//   }


//   async function createCollectionWithHashedPasswords() {
//     try {
//       // Connect to MongoDB
//   console.log('Connected successfully to server');

//   const db = await connectToMongoDB();

//   const collection = db.collection('users'); // Replace 'users' with your existing collection name

//      // Update documents to add new fields
//  await collection.updateMany({}, { $set: newFields }, (updateErr, result) => {
//     if (updateErr) {
//       console.error('Error occurred while updating documents:', updateErr);
//     } else {
//       console.log(`${result.modifiedCount} documents updated successfully`);
//     };
//   });
// }catch (error) {
//     console.error('Error:', error);
//   }
//   }

//   createCollectionWithHashedPasswords();


const { MongoClient } = require('mongodb');

async function updateCollection() {
  const url = 'mongodb://localhost:27017';
  const dbName = 'taskManager';
  const newFields = {
    fullName: "",
    contactInfo: "",
    profilePicture: ""
  };

  try {
    const client = await MongoClient.connect(url);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('users');

    const result = await collection.updateMany({}, { $set: newFields });
    console.log(`${result.modifiedCount} documents updated successfully`);

    client.close();
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

updateCollection();

