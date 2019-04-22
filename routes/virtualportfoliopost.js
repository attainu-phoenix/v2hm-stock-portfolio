'use strict';

var postPortfolioRoute = function(request, response) {

	// TODO: Check if user is logged in or not here.

    var DB = request.app.locals.DB;
    var name = request.body.name;

    var portfolio = {
        name: name,
        CMP: 10.0,
		user: request.session.user._id
    }

    DB.collection("portfolio").insertOne(portfolio, function(error, result) {

        if(error) {
            console.log("Error adding scripp to portfolio collection");
        }

        response.redirect("/virtualpage");
    })

}

exports.postPortfolioRoute = postPortfolioRoute;

