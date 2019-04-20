'use strict'

var loginPost = function(request, response) {

    var DB = request.app.locals.DB;

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
}

exports.loginPost = loginPost;
