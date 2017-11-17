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
//app.use(flash());

app.get("/",function (request, response) {
  response.render("index.ejs");
});

app.get("/login",function (request, response) {
	//req.flash('success_msg', 'you are registered');
	//request.flash('success_msg', 'you are registered');
  response.render("login",{
    errorMessage: ""});
    
});

app.get("/login/find",function(req,res){
  console.log(req.body);
  signupmodel.find({emailid:"test3@gmail.com"}, [], {} , function(err, results){
  //res.render("allTasks", {tasks: results, dateFormater: moment});
    console.log(results);
  });
});

app.post("/login/find",function(req,res){
  console.log('Inputted data are');
  //console.log(req.body.emailid);
  var inputEmailid = req.body.emailid;
  
 current = inputEmailid;
  var inputPassword = req.body.password;
  console.log(inputEmailid);
  console.log(inputPassword);
 

  signupmodel.find({emailid:inputEmailid,password:inputPassword}, function(err, results){
  //res.render("allTasks", {tasks: results, dateFormater: moment});
  
  if(!results.length){
    // $("#abc").html("incorrect password");
      console.log("Inside no results loop");
        res.render('login',{
          errorMessage: "Please Enter Valid Entries"
        });
      } else if(results.length>0){
        console.log("Inside results fetching loop");
        res.redirect('/HomeDisplay');
        console.log(results);
        console.log(results[0].firstname);
       
      }
    });

   
  //console.log(results);
    //res.render("HomeDisplay",{signup:results});
 });
 // res.render("HomeDisplay")
//});

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
  response.render("HomeDisplay",{
    user:current
  });
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
	//console.log(request.body);
	//console.log(request.query);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: request.body.email,
  from: 'noreply@example.com',
  subject: 'Password Recovery mail',
  text: 'Hai your new password is abc123'
};
console.log("mail has been sent to"+request.body.email);
sgMail.send(msg);
//response.send("sample.ejs","email has been sent");
response.render("forgetpassword.ejs");
});




app.use(function (request, response) {
  response.status(404).render("404.ejs");
});


 //Listen for an application http request on port 8081 
 app.set('port',3006 );
app.listen(app.set('port'), function () {
  console.log('Listening on http://127.0.0.1:' + app.get('port'));
});


module.exports = app;


