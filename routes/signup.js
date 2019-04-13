'use strict';

var signupPage = function(request, response){

    response.render("signup.hbs");
}

exports.signupPage = signupPage;



/* var userDB = [
{username: "dpkshrivastava10@gmail.com", password: "dpkshrivastava"},
{ username: "mohdsammi", password: "sammi"},
{ username: "monish", password: "monish"}
];

app.get("/signup", function(request, response){
    response.render("signup.hbs");
});

app.post("/login", function(request, response){

    var username = request.body.username;
    var password = request.password.password;
}) */