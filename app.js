// Module dependencies.
const http = require("http");
const express = require("express");

const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");


// =========================================================

// create express app 
global.app = express();


// set the root view folder & specify the view engine 
app.set("views", path.join(__dirname, "views"));
//app.engine('ejs', engines.ejs);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/assets/'));


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
app.get("/address",function (request, response) {
  response.render("address.ejs");
});

app.get("/entities",function (request, response) {
  response.render("entities.ejs");
});
app.get("/forgetpassword",function (request, response) {
  response.render("forgotpassword.ejs");
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
	
 //var api_key = 'key-8bb98c339325eae4f48499cb5220a309';
//var domain = 'sandboxfc5e6b22a8aa4fca8f52b390d96e691e.mailgun.org';
//var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
// console.log("haiiiii"+request.query.email);
 //console.log("Byeeeeeeeeee"+request.body.email);
//var data = {
 // from: 'Haritha Kurla <postmaster@sandboxfc5e6b22a8aa4fca8f52b390d96e691e.mailgun.org>',
 // to: 's528766@mail.nwmissouri.edu',
 // subject: "Password Details to login",
 // text: "Your new password is: abcdef"
  
//};
 
//mailgun.messages().send(data, function (error, body) {
  //console.log(body);
//});
//response.send("mail sent to the user");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'dhulipalla.vinuth@gmail.com',
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


// create server by injecting our express app
//var server = http.createServer(app);

 //Listen for an application http request on port 8081 
 app.set('port',3005 );
app.listen(app.set('port'), function () {
  console.log('Listening on http://127.0.0.1:' + app.get('port'));
});


module.exports = app;


