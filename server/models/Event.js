const mongoose = require('mongoose');
const {Schema} = mongoose;

const EventSchema = new Schema({
    usernameid: String,
    date: Date,
    startTime: Number,
    endTime: Number,
    title: String,
    description: String
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;