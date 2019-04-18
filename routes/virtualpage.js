'use strict';

var vPPage = function(request, response) {

    if(!request.session.user){
        response.send("Please Login to Continue");
        response.redirect("/login.hbs");
    }
    var DB = request.app.locals.DB;

    DB.collection("portfolio").find({}).toArray(function(error, portfolio){

        if(error) {
            console.log("Error connecting to Portfolio Collection");
        }

        var data = {
            portfolio: portfolio,
            user: request.session.user
        };
        
        response.render("virtualpage.hbs", data);
    });

}

exports.vPPage = vPPage;
