'use strict'

// npm packages
var express = require("express");


// Modules
var signuppage = require("./routes/signup.js");
var loginpage = require("./routes/login.js");
var homepage = require("./routes/homepage.js");
var aboutus = require("./routes/aboutus.js");
var whystocks = require("./routes/whystocks.js")
var vppage = require("./routes/virtualpage.js")

var app = express();


// Setting Handlebars Template Engine
app.set("view engine", "hbs");

// Static files
app.use(express.static('public'))


var DB;

var mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/marketdata', {useNewUrlParser: true});
mongoClient.connect(function(err) {
    if(err) {
        console.log("Error connecting to MongoDB");
    } else {
        console.log("Connection to MongoDB database blog established");
        DB = mongoClient.db("marketdata");
        app.locals.DB = DB;
    }
    
});


//Login Page Route
app.get("/login", loginpage.loginPage);


//Sign up page Route
app.get("/signup", signuppage.signupPage);

// Home Page Route
app.get("/", homepage.homePage);

// AboutUs Page Route
app.get("/aboutus", aboutus.aboutUs);


// Whystocks Page Route
app.get("/whystocks", whystocks.whyStocks);

// Virtual Portfolio Page Route
app.get("/virtualpage", vppage.vPPage);

app.listen(3000);