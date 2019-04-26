'use strict';

var delete_portfolio = function(request, response) {

    var DB = request.app.locals.DB;

    var itemsToBeDeleted = request.body.itemsToBeDeleted;
    console.log(itemsToBeDeleted);

    var userStockNames = [];
    for(var i = 0; i < itemsToBeDeleted.length; i++) {
        userStockNames.push( mongodb.ObjectID(itemsToBeDeleted[i]) );
    }

    DB.collection("portfolio").deleteMany({name: {$in: userStockNames} }, function(error) {

        if(error) {
            response.send("error deleting items");
        } else {
            response.send("all is well");
        }
    });

}

exports.delete_portfolio = delete_portfolio;