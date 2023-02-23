const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    userFullname: String,
    userEmail: {type:String, unique:true},
    userUserName:String,
    userPassword: String,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;