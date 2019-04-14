'use strict';

var DB;

var mongoClient = new mongodb.MongoClient('mongodb://localhost:27017/marketdata', {useNewUrlParser: true});
mongoClient.connect(function(err) {
    if(err) {
        console.log("Error connecting to MongoDB");
    } else {
        console.log("Connection to MongoDB database blog established");
    }
    DB = mongoClient.db("marketdata");
});

// User's portfolio
app.get("/virtualpage", function(request, response){
    DB.collection("portfolio").find({}).toArray(function(error, allHoldings){
        if(error) {
            response.send("Error fetching blog portfolio");
        } else {
            var data1 = {
                allHoldings: allHoldings
            };
            response.render("virtualpage.hbs", data1);
        }
    });
});


// Creating Portfolio data
app.post("/virtualpage", function(request, response){
    var data2 = {
        scripp: request.body.scripp,
        CMP: request.body.CMP
    };

    // Insert the data in the DB.
    DB.collection("portfolio").insertOne(data2, function(error, result) {

        if(error) {
            response.send("Error creating your portfolio");
            return;
        } else {
            response.redirect("/add?success=true");
        }

    });

});

// User's watchlist
app.get("/virtualpage", function(request, response){
    DB.collection("watchlist").find({}).toArray(function(error, allList){
        if(error) {
            response.send("Error fetching blog portfolio");
        } else {
            var data3 = {
                allList: allList
            };
            response.render("virtualpage.hbs", data3);
        }
    });
});


// Creating Watchlist data
app.post("/virtualpage", function(request, response){
    var data4 = {
        scripp: request.body.scripp,
        CMP: request.body.CMP
    };

    // Insert the data in the DB.
    DB.collection("watchlist").insertOne(data4, function(error, result) {

        if(error) {
            response.send("Error creating your watchlist");
            return;
        } else {
            response.redirect("/add?success=true");
        }

    });

});