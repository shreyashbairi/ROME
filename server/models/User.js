const mongoose = require('mongoose');
const {Schema} = mongoose;

// const TeamSchema = new Schema({
//     team: String,
//     description:String
// });

// const EventSchema = new Schema({
//     date: Date,
//     startTime: Number,
//     endTime: Number,
//     title: String,
//     description: String
// });

// const PersonalTaskSchema = new Schema({

// });

// const ProfileSchema = new Schema({
//     userBrithday: Date,
//     userPhone: String,
//     userAddress: String,
//     userNotification: Boolean,
// });

const UserSchema = new Schema({
    userFullname:{type:String, unique:false},
    userEmail: {type:String, unique:true},
    userUserName: String,
    userPassword: String,
    userBirthday: Date,
    userPhone: String,
    userAddress: String,
    userColor: String,
    userViewMode: Number,
    userTeamList: [String],
    notifjoin: Boolean,
    notifpoke: Boolean,
    notiftask: Boolean,
    notifleave: Boolean,
    notifannounce: Boolean,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;