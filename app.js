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
	request.flash('success_msg', 'you are registered');
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
app.get("/forgotpassword",function (request, response) {
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


