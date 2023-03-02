const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: String,
  description: String,
  date: Object
});
