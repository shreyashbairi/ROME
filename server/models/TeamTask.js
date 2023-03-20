const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamTaskSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  username: String,
  complete: Boolean,
  started:Boolean,
  workers: Array,
  teamID: Number,
  team: String,
  priority: Number,
  repeating: Boolean
});

const TeamTask = mongoose.model('TeamTask', TeamTaskSchema);

module.exports = TeamTask;