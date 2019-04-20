'use strict'

// npm packages
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var session = require("express-session");

// Modules
var signuppage = require("./routes/signup.js");
var signuppost = require("./routes/signuppost.js");
var loginpage = require("./routes/login.js");
var loginpost = require("./routes/loginPost.js");
var homepage = require("./routes/homepage.js");
var aboutus = require("./routes/aboutus.js");
var whystocks = require("./routes/whystocks.js")
var vppage = require("./routes/virtualpage.js")
var vPortfolioSearch = require("./routes/virtualportfoliopost.js");
var vWatchlistSearch = require("./routes/virtualwatchlistpost.js");

var app = express();


// Setting Handlebars Template Engine
app.set("view engine", "hbs");

// bodyParser for form data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Static files
app.use(express.static('public'))

// Setting express session
app.use(session({secret: "catkey"}));



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

// Login Page Post Route
app.post("/login", loginpost.loginPost);

//Sign up page Route
app.get("/signup", signuppage.signupPage);

//Signup Post Route
app.post("/signup", signuppost.signupPost);

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

// Watchlist Page POST route
app.post("/virtualpage/watchlist", vWatchlistSearch.postWatchlistRoute);

// Delete Route for Portfolio
app.delete("/delete-portfolio", function(request, response) {

    var itemsToBeDeleted = request.body.itemsToBeDeleted;
    console.log(itemsToBeDeleted);

    var objectIds = [];
    for(var i = 0; i < itemsToBeDeleted.length; i++) {
        objectIds.push( mongodb.ObjectID(itemsToBeDeleted[i]) );
    }

    DB.collection("portfolio").deleteMany({_id: {$in: objectIds} }, function(error) {

        if(error) {
            response.send("error deleting items");
        } else {
            response.send("all is well");
        }
    });
});


// Delete Route for Watchlist
app.delete("/delete-watchlist", function(request, response) {

    // var DB = request.app.locals.DB;

    var itemsToBeDeleted2= request.body.itemsToBeDeleted2;
    console.log(itemsToBeDeleted2);

    var objectIds = [];
    for(var i = 0; i < itemsToBeDeleted2.length; i++) {
        objectIds.push( mongodb.ObjectID(itemsToBeDeleted2[i]) );
    }
    DB.collection("watchlist").deleteMany({_id: {$in: objectIds} }, function(error) {

        if(error) {
            response.send("error deleting items");
        } else {
            response.send("all is well");
        }
    });
});

// Logout Route
app.get("/logout", function(request, response){
    
    request.session.user = null;
    response.redirect("/login");
})

app.listen(3000);