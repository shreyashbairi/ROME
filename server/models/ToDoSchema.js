const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  username: String,
  HighPriority: Boolean,
  MediumPriority: Boolean,
  LowPriority: Boolean,
  repeating: Boolean,
  reminder: Boolean
});

const Task = mongoose.model('Task', TodoSchema);

module.exports = Task;