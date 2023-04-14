const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotificationSchema = new Schema({
    fromuser: String,
    touser: String,
    description: String,
    type: String,
    teamName: String,
    message: String,
    show: Boolean,
});

const EventModel = mongoose.model('Notification', NotificationSchema);

module.exports = EventModel;
/*
types:
Invite
Request
Join
Poke
task-reminder
Leave

*/