const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeamSchema = new Schema({
    team: String,
    description:String
});

const EventSchema = new Schema({
    date: Date,
    startTime: Number,
    endTime: Number,
    title: String,
    description: String
});

const PersonalTaskSchema = new Schema({

});

const ProfileSchema = new Schema({

});

const UserSchema = new Schema({
    userFullname: String,
    userEmail: {type:String, unique:true},
    userUserName: String,
    userPassword: String,
    userTeams: [TeamSchema],
    userEvents: [EventSchema],
    userPersonalTask: [PersonalTaskSchema],
    userProfile: ProfileSchema,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;