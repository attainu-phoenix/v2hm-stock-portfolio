'use strict';

var vPPage = function(request, response) {

    if(!request.session.user) {
        response.redirect("/login");
        return;
    }

    var DB = request.app.locals.DB;

    // Fetch the portfolio first
    DB.collection("portfolio").find({}).toArray(function(error, portfolio){

        if(error) {
            console.log("Error connecting to Portfolio Collection");
        }

        var data = {
            portfolio: portfolio,
            user: request.session.user
        };

        // Fetch the watchlist
        DB.collection("watchlist").find({}).toArray(function(error, watchlist){

            if(error) {
                console.log("Error connecting to Watchlist Collection");
            }
            data.watchlist = watchlist;
            response.render("virtualpage.hbs", data);
        });
    });
}

exports.vPPage = vPPage;