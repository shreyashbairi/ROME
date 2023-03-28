const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeamEventSchema = new Schema({
    date: Date,
    startTime: Number,
    endTime: Number,
    title: String,
    description: String,
    teamName: String,
    teamID: Number,
    color: String,
    type: String
});

const TeamEventModel = mongoose.model('TeamEvent', TeamEventSchema);

module.exports = TeamEventModel;