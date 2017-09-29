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


app.use("/",function (request, response) {
  response.render("index.ejs");
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


