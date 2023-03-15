const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeamTaskSchema = new Schema({
  title: String,
  description: String,
  date: Object,
  username: String,
  complete: Boolean,
  started:Boolean,
  workers: Array,
  teamID: Number
});

const TeamTask = mongoose.model('TeamTask', TeamTaskSchema);

module.exports = TeamTask;