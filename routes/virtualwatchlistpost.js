'use strict';

var postWatchlistRoute = function(request, response) {

    var DB = request.app.locals.DB;

    var name1 = request.body.name1;

    var watchlist = {
        name1: name1,
        // CMP: CMP
    }

    DB.collection("watchlist").insertOne(watchlist, function(error, result) {

        if(error) {
            console.log("Error adding scripp to Watchlist collection");
        }

        response.redirect("/virtualpage");
    })

}

exports.postWatchlistRoute = postWatchlistRoute;

