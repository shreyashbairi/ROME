const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnnoucementsSchema = new Schema({
    title: String,
    description: String,
    teamName: String,

});

AnnoucementsSchema.index({teamName: 1});
const EventModel = mongoose.model('Annoucements', AnnoucementsSchema);

module.exports = EventModel;
