'use strict';

var delete_watchlist = function(request, response) {

    // var DB = request.app.locals.DB;

    var itemsToBeDeleted2 = request.body.itemsToBeDeleted2;
    console.log(itemsToBeDeleted2);

    var objectIds = [];
    for(var i = 0; i < itemsToBeDeleted2.length; i++) {
        objectIds.push( mongodb.ObjectID(itemsToBeDeleted2[i]) );
    }
    DB.collection("watchlist").deleteMany({_id: {$in: objectIds} }, function(error) {

        if(error) {
            response.send("error deleting items");
        } else {
            response.send("all is well");
        }
    });
}

exports.delete_watchlist = delete_watchlist;