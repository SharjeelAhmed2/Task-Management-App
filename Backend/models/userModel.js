const { MongoClient, ObjectId, CURSOR_FLAGS } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');
const User = require('./user');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'taskManager';
const collectionName = 'users';
const secretKey = 'Anim3!zv3ry!!@@';

async function connectToMongoDB() {
    const client = await MongoClient.connect(mongoUrl);
    return client.db(dbName);
}

exports.getAllUsers = async () => {
    const db = await connectToMongoDB();
    const collection = db.collection(collectionName);
    return collection.find().toArray();
};

exports.loginUser = async (username, password) => {
    const user = await User.findOne({username});

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
    console.log("token "+token)
    return token;
};

exports.updateUserProfile = async (token, fullName, contactInfo, profilePicture,email) => {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id;
    const user = await User.findByIdAndUpdate(userId, {fullName, contactInfo, profilePicture,email})
    return user;
};

exports.signupUser = async (username, password, contactInfo, fullName, profilePicture) => {
    // const db = await connectToMongoDB();
 //   const collection = db.collection(collectionName);

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Username already exists');
    }

    // add salt

    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

 

    // Create a new user document
    const newUser = {
        username,
        password: hashedPassword,
        contactInfo,
        fullName,
        profilePicture
    };

    // Insert the new user document into the database
    //await collection.insertOne(newUser);

    await User.create(newUser);

    return {message: 'User signed in successfully!'};
};

exports.addTask = async (token, title, description, dueDate, priority) => 
{
    // userID

    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id;
    try {
        const newTask = {
          title,
          description,
          dueDate,
          priority,
          user: userId
        };
      return await Task.create(newTask);
     } catch (error) {
        console.error('Error creating task:', error);
      }
}

exports.getTaskSingle = async(token) => 
{
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id;
   try{
           return await Task.find({user:userId});
    }
    catch(error)
    {
        console.error("error", error)
    }
}

exports.getTaskIndividual = async(id) => 
{
    const userId = id;
       
   try{
       return await Task.findById(userId);
   }
   catch(error)
   {
      console.log("Error in Model Class: "+error);
   }
}

exports.updateTaskStatusDone = async(id) => 
{
    const taskID = id;
    try
    {
        const updateTask = await Task.findByIdAndUpdate(
            id,
            {status:'done'},
            {new:true, runValidators:true}
        );
        if(updateTask)
        {
            return updateTask;
        }
    }
    catch(error)
    {
        console.log("error on completing"+ error);
    }
}

exports.deleteTask = async(id) => 
{
     const taskId = id; 
     try{ const deleteTask = await Task.findByIdAndDelete(id); 
    if(deleteTask)
    {
        return deleteTask;
    }}
    catch(error)
    {
        console.log("error on deleting "+ error)
    }
}

exports.pendingTasks = async(token)=> 
{
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id;
    try {
         const pendingTasks = await Task.countDocuments({ status: 'pending', user: userId });
         if(pendingTasks)
         {
            return pendingTasks;
         }
         else if (pendingTasks===0)
         {
             return pendingTasks;
         }
    }
    catch(error)
    {
        console.log("eror on pending tasks", error);  
    }
}

exports.doneTasks = async(token)=> 
{
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id;
    try {
         const pendingTasks = await Task.countDocuments({ status: 'done', user: userId });
         if(pendingTasks)
         {
            return pendingTasks;
         }
        else if (pendingTasks===0)
        {
            return pendingTasks;
        }
    }
    catch(error)
    {
        console.log("eror on pending tasks", error);  
    }
}

exports.totalTasks = async(token)=> 
{
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id;
    try {
         const pendingTasks = await Task.countDocuments({ user: userId });
         if(pendingTasks)
         {
            return pendingTasks;
         }
        else if (pendingTasks===0)
        {
            return pendingTasks;
        }
    }
    catch(error)
    {
        console.log("eror on pending tasks", error);  
    }
}

exports.todoTasks = async(token)=> 
{
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.id;
    try {
         const pendingTasks = await Task.countDocuments({ status: 'todo', user: userId });
         if(pendingTasks)
         {
            return pendingTasks;
         }
         else if (pendingTasks===0)
         {
             return pendingTasks;
         }
    }
    catch(error)
    {
        console.log("eror on pending tasks", error);  
    }
}


exports.setStatPending = async(id)=> 
{ 
    const taskId = id;
    try
    {
        const taskState = await Task.findById(taskId);
        if (taskState) {
            taskState.status = 'pending';
            await taskState.save();
            console.log(`Task ${taskId} status updated to pending`);
            return taskState;
          } else {
            console.log(`Task ${taskId} not found`);
          }
    }
    catch(error)
    {
        
    }
}