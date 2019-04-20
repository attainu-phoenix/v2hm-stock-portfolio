'use strict'

var signupPost = function(request, response) {

    var DB = request.app.locals.DB;

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
    })
}

exports.signupPost = signupPost;