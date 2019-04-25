'use strict';

var vPPage = function(request, response) {

    if(!request.session.user) {
        response.redirect("/login");
        return;
    }

    var DB = request.app.locals.DB;

    // Fetch the portfolio first
    DB.collection("portfolio").find({user: request.session.user._id}).toArray(function(error, portfolio){

        if(error) {
            console.log("Error connecting to Portfolio Collection");
        }

        var data = {
            user: request.session.user
        };

        // Fetch the CMP from bhavdata collection
        var userStockNames = [];
        for(var i = 0; i < portfolio.length; i++) {
            userStockNames.push( portfolio[i].name );
        }
        DB.collection("bhavdata").find( {name: {$in: userStockNames} } ).toArray(function(error, bhavData) {
            if(error) { return response.send("error fetching bhav data"); }

            data.portfolio = bhavData;

            // Fetch the watchlist
            DB.collection("watchlist").find({user: request.session.user._id}).toArray(function(error, watchlist){

                if(error) {
                    console.log("Error connecting to Watchlist Collection");
                }
                data.watchlist = watchlist;
                response.render("virtualpage.hbs", data);
            }); // watchlist fetch end

        }); // bhavdata fetch end

    }); // portfolio ends
}

exports.vPPage = vPPage;
