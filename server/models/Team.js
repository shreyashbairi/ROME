const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeamSchema = new Schema({
    teamId: String,
    team: String,
    description:String,
    userid: String,
    role: String
});

const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;