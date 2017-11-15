// Module dependencies.
const http = require("http");
const express = require("express");

const path = require("path");
const logger = require("morgan");
var bodyParser = require("body-parser");
var flash = require('connect-flash');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/eoccop",{useMongoClient:true});

var signupmodel = require("./models/signup.model.js");
// =========================================================

// create express app 
global.app = express();
app.use(bodyParser.urlencoded({extended:false})); 

// set the root view folder & specify the view engine 
app.set("views", path.join(__dirname, "views"));
//app.engine('ejs', engines.ejs);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/assets/'));
// Connect Flash
app.use(flash());

app.get("/",function (request, response) {
  response.render("index.ejs");
});

app.get("/login",function (request, response) {
	//req.flash('success_msg', 'you are registered');
	//request.flash('success_msg', 'you are registered');
  response.render("login.ejs");
});
app.get("/signup",function (request, response) {
  response.render("signup.ejs");
});

//Handling signup data 

app.post("/signup/add",function(req,res){
console.log(req.body);
console.log("I am ready to add user");
let addUser = new signupmodel();

addUser.emailid = req.body.emailid;
addUser.firstname = req.body.firstname;
addUser.lastname = req.body.lastname;
addUser.password = req.body.password;
addUser.confirmpassword = req.body.cnfpassword;
console.log(addUser);
addUser.save(function(err,result){
  if(!err)
  {
      //req.flash('success_msg', 'You are registered and can now login');
      res.redirect("/login");
      console.log("Inserting into Db worked");
  }
  else
  {
      console.log(err);

  }

});

});

app.get("/address",function (request, response) {
  response.render("address.ejs");
});

app.get("/entities",function (request, response) {
  response.render("entities.ejs");
});
app.get("/forgetpassword",function (request, response) {
  response.render("forgetpassword.ejs");
});

app.get("/HomeDisplay",function (request, response) {
  response.render("HomeDisplay.ejs");
});
app.get("/LatLon",function (request, response) {
  response.render("LatLon.ejs");
});
app.get("/nearestlocations",function (request, response) {
  response.render("nearestlocations.ejs");
});

app.get("/prototype",function (request, response) {
  response.render("prototype.ejs");
});
app.get("/route",function (request, response) {
  response.render("route.ejs");
});

// 5 handle an http POST request to the new-entry URI 
app.post("/forgetpassword", function (request, response) {
	console.log(request.query.email);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 's528744@nwmissouri.edu',
  from: 'noreply@example.com',
  subject: 'Password Recovery mail',
  text: 'Hai your new password is abc123'
};
sgMail.send(msg);
response.send("sample.ejs","email has been sent");
response.render("forgetpassword.ejs");
});




app.use(function (request, response) {
  response.status(404).render("404.ejs");
});


 //Listen for an application http request on port 8081 
 app.set('port',3005 );
app.listen(app.set('port'), function () {
  console.log('Listening on http://127.0.0.1:' + app.get('port'));
});


module.exports = app;


