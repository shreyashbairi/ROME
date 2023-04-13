const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnnoucementsSchema = new Schema({
    title: String,
    description: String,
    teamName: String,

});

const EventModel = mongoose.model('Annoucements', AnnoucementsSchema);

module.exports = EventModel;
