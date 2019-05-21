var express = require("express");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server

// Require all models

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


var exphbs= require('express-handlebars');

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

// Routes
var routes= require("./routes/routes");

app.use(routes);

app.listen(PORT,function(){
    console.log("Server listening on: " + PORT);
})