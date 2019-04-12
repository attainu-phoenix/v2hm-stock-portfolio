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



//signup credential

var userDB = [
    {username: "dpkshrivastava10@gmail.com", password: "dpkshrivastava"},
    { username: "mohdsammi", password: "sammi"},
    { username: "monish", password: "monish"}
    ];
    
    app.get("/signup", function(request, respond){
        response.render("signup.hbs");
    });
    
    app.post("/login", function(request, respond){
    
        var username = request.body.username;
        var password = request.password.password;
    
        for( var i = 0; i < userDB.length; i++){
    
            if(userDB[i].username == username && userDB[i].password == password){
    
                response.render("virtualpage.hbs");
            }
        }
        
            response.send("Sorry Invalid Credintial");
        
    });

app.listen(3000);