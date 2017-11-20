var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var addUser = new Schema({

    "emailid" : {type:String,required:true},
    "firstname" : {type:String,required:true},
    "lastname" : {type:String,required:true},
    "password" : {type:String,required:true},
    "confirmpassword" : {type:String,required:true}

});

var addUserModel = mongoose.model("signup",addUser);
module.exports = addUserModel;