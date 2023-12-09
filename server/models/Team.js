const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeamSchema = new Schema({
    teamId: Number,
    team: String,
    description:String,
    managerid: String,
    color: String,
    members: [String]
});

TeamSchema.index({team:1});
const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;