'use strict';

var vPPage = function(request, response) {

    var DB = request.app.locals.DB;

    // Fetch the portfolio first
    DB.collection("portfolio").find({}).toArray(function(error, portfolio){

        if(error) {
            console.log("Error connecting to Portfolio Collection");
        }

        var data = {
            portfolio: portfolio
        };
        
        response.render("virtualpage.hbs", data);
        return;
    })


    // Fetch the watchlist
    DB.collection("watchlist").find({}).toArray(function(error, watchlist){

        if(error) {
            console.log("Error connecting to Watchlist Collection");
        }

        var data1 = {
            watchlist: watchlist
        };
       
        response.render("virtualpage.hbs", data1);
        return;
    })
}

exports.vPPage = vPPage;