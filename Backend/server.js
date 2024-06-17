const express = require('express');
const app = express();
const userController = require('./controllers/userController');
const cors = require('cors'); // Import the cors middleware
const User = require('./models/user');
const mongoose = require('mongoose');
const connectDB = require('./db')
const morgan = require('morgan');
const task = require('./models/task');
const cron = require('node-cron');

const mongoUrl = 'mongodb://localhost:27017/taskManager';
// connect to DB
connectDB(mongoUrl)
app.use(morgan('dev'));
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Middleware for handling errors
app.use((err, req, res, next) => {
    if (err instanceof jwt.JsonWebTokenError) {
        console.error('JWT error:', err.message);
        res.status(401).json({ message: 'Unauthorized: Invalid JWT token' });
    } else {
        console.error('Error occurred:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Function to check due dates and update task status
async function checkDueDates() {
    const currentDate = new Date();

    try {
        // Find tasks with a due date before today and status not 'pending'
        const tasksToUpdate = await task.find({
            dueDate: { $lt: currentDate },
            status: {$nin: ['pending', 'done'] }
        });

        for (const tasks of tasksToUpdate) {
            tasks.status = 'pending';
            await tasks.save();
            console.log(`Task ID: ${tasks._id} status updated to pending`);
        }
    } catch (error) {
        console.error('Error checking due dates:', error);
    }
}
// Schedule the cron job to run every day at midnight
cron.schedule('*/240 * * * *', () => {
    console.log('Running cron job to check due dates');
    checkDueDates();
});
// Routes
app.get('/users', userController.getAllUsers);
app.post('/login', userController.loginUser);
app.post('/update-profile', userController.updateProfile);
app.post('/signup', userController.signUp);
app.post('/taskAdd', userController.taskAdd);
app.get('/getTask', userController.getTask);
app.get('/getTask/:id', userController.getIndividualTask);
app.put('/tasks/:id/status/done', userController.setCompleted)
app.delete('/tasks/:id', userController.deleteTasks)
app.get('/tasks/pending-count',userController.getpendingTasks);
app.get('/tasks/done-count',userController.getdoneTasks);
app.get('/tasks/todo-count',userController.gettodoTasks);
app.get('/tasks/total-count',userController.gettotalTasks);

// app.get('/update-email', async (req, res) => {
//     try {
//         // Update all documents in the collection to include the email field with a default value
//         await User.updateMany({}, { $set: { email: "" } });
//         res.send('Email field added to existing documents.');
//     } catch (error) {
//         console.error('Error updating documents:', error);
//         res.status(500).send('Error updating documents.');
//     }
// });

// Start server
const PORT = 3000 || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
