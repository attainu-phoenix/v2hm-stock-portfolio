'use strict';

var signupPage = function(request, response){

    if(request.session.user){
        response.redirect("/");
        return;
    }

    response.render("signup.hbs");
}

exports.signupPage = signupPage;


