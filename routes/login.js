'use strict';

var loginPage = function(request, response){

    if(request.session.user){
        response.redirect("/");
        return;
    }

    response.render("login.hbs");
}

exports.loginPage = loginPage;