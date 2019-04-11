'use strict'

// npm packages
var express = require("express");


// Modules
var signuppage = require("./routers/signup.js");
var loginpage = require("./routes/login.js");
var homepage = require("./routes/homepage.js");
var aboutus = require("./routes/aboutus.js");
var whystocks = require("./routes/whystocks.js")
var vppage = require("./routes/virtualpage.js")

var app = express();


// Setting Handlebars Template Engine
app.set("view engine", "hbs");

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