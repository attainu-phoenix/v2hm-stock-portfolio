'use strict';

var vPPage = function(request, response) {

    var DB = request.app.locals.DB;

    DB.collection("portfolio").find({}).toArray(function(error, portfolio){

        if(error) {
            console.log("Error connecting to Portfolio Collection");
        }

        var data = {
            portfolio: portfolio
        };
        
        response.render("virtualpage.hbs", data);
    })
}

exports.vPPage = vPPage;
