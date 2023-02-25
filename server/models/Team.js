const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeamSchema = new Schema({
    team: String,
    description:String
});

const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;