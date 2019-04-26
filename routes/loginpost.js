'use strict'

var loginPost = function(request, response) {

    var DB = request.app.locals.DB;

    var userID = {
        email: request.body.email,
        password: request.body.password
    };

    DB.collection("userDetails").findOne(userID, function(error, user){
        if(error) {
            response.redirect("/login?Error:DATABASE-ERROR");
            return;
        } 
        if(!user){
            response.redirect("/login?Error:Please-enter-correct-EmailId&Password-OR-SignUp-if-new-user");
            return;
        }
        request.session.user = user;
        response.redirect("/virtualpage");
    })
}

exports.loginPost = loginPost;