const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['todo', 'in-progress', 'done','pending'], default: 'todo' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true } // Reference to the user who owns the task
});

module.exports = mongoose.model('task', taskSchema)