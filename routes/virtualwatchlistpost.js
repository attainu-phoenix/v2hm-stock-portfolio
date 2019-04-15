'use strict';

var postWatchlistRoute = function(request, response) {

    var DB = request.app.locals.DB;

    var name = request.body.name;

    var watchlist = {
        name: name,
        // CMP: CMP
    }

    DB.collection("watchlist").insertOne(portfolio, function(error, result) {

        if(error) {
            console.log("Error adding scripp to portfolio collection");
        }

        var data1 = {
            watchlist: watchlist
        }

        response.render("virtualpage.hbs", data1);
    })

}

exports.postWatchlistRoute = postWatchlistRoute;

