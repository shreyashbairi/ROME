const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotificationSchema = new Schema({
    usernameid: String,
    date: Date,
    description: String,
    teamName: String,
    teamID: Number,
    color: String
});

const EventModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel;