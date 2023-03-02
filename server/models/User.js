const mongoose = require('mongoose');
const {Schema} = mongoose;

const TeamSchema = new Schema({
    team: String,
    description:String
});

const EventSchema = new Schema({

});

const PersonalTaskSchema = new Schema({

});

const ProfileSchema = new Schema({
    userBrithday: Date,
    userPhone: String,
    userAddress: String,
    userNotification: Boolean,
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