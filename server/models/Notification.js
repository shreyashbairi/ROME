const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotificationSchema = new Schema({
    fromuser: String,
    touser: String,
    description: String,
    type: String,
    teamName: String,
    teamID: String,
});

const EventModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationSchema;