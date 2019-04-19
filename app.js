'use strict'

// npm packages
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var session = require("express-session");

// Modules
var signuppage = require("./routes/signup.js");
var loginpage = require("./routes/login.js");
var homepage = require("./routes/homepage.js");
var aboutus = require("./routes/aboutus.js");
var whystocks = require("./routes/whystocks.js")
var vppage = require("./routes/virtualpage.js")
var vPortfolioSearch = require("./routes/virtualportfoliopost.js");
// var vwpage = require("./routes/virtualwatchlistpage.js")
var vWatchlistSearch = require("./routes/virtualwatchlistpost.js");

var app = express();


// Setting Handlebars Template Engine
app.set("view engine", "hbs");

// bodyParser for form data
app.use(bodyParser.urlencoded({ extended: false }))

// Settig Session
app.use(session({secret: "catkey"}));

// Static files
app.use(express.static('public'))


var DB;

var mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/marketdata', {useNewUrlParser: true});
mongoClient.connect(function(err) {
    if(err) {
        console.log("Error connecting to MongoDB");
    } else {
        console.log("DB connection established");
        DB = mongoClient.db("marketdata");
        app.locals.DB = DB;
    }
    
});


//Login Page Route
app.get("/login", loginpage.loginPage);


app.post("/login", function(request, response){

    var userID = {
        email: request.body.email,
        password: request.body.password
    };

    DB.collection("userDetails").findOne(userID, function(error, user){
        if(error) {
            response.send("DB error occurred");
            return;
        } 
        if(!user){
            response.send("invalid user and password");
            return;
        }
        request.session.user = user;
        response.redirect("/");
    })
});

//Sign up page Route
app.get("/signup", signuppage.signupPage);

app.post("/signup", function(request, response){

    var userData = {

        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword
    }

    DB.collection("userDetails").insertOne(userData, function(error){

        if(error){
            response.send("Error signing up");
        } else {
            response.redirect("/");
        }

    });
});

//logout

app.get("/logout", function(request, response){

    request.session.user = null;
    response.redirect("/login");
});

// Home Page Route
app.get("/", homepage.homePage);

// AboutUs Page Route
app.get("/aboutus", aboutus.aboutUs);


// Whystocks Page Route
app.get("/whystocks", whystocks.whyStocks);

// Virtual Portfolio GET Route
app.get("/virtualpage", vppage.vPPage);

// Virtual Portfolio Page POST route for Portfolio
app.post("/virtualpage", vPortfolioSearch.postPortfolioRoute);

// Watchlist GET Route
// app.get("/virtualpage/watchlist", vwpage.vWatchlistPage);


// Watchlist Page POST route
app.post("/virtualpage/watchlist", vWatchlistSearch.postWatchlistRoute);

// Portfolio Delete Route
app.post("/delete/:mongoId", function(request, response){
    response.json({"success": true});
})

app.listen(3000);