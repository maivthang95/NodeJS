var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/myDatabase" , { useNewUrlParser: true } );

var userSchema = new mongoose.Schema({
    id: String , 
    name : String , 
    email : String 
})

var users = mongoose.model('users' , userSchema ,'users');
module.exports = users 