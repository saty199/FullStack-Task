const mongoose = require('mongoose');
const Schema= mongoose.Schema;

var userSchema= new Schema({
    firstName: {type:String},
    lastName: {type:String},
    email:{type:String, unique:true, isEmail: true},
    country:{type:String},
    password:{type:String},
    userName:{type:String, unique: true},
    data: {type:String}
})
module.exports= mongoose.model('User', userSchema);