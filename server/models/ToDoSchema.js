const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: String,
  description: String,
  date: Object,
  username: String
});

const Task = mongoose.model('Task', TodoSchema);

module.exports = Task;