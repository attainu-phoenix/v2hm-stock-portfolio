'use strict'

// npm packages
var mongodb = require("mongodb");
var fs = require("fs");

var DB;

var DB_URL = process.env.DB_URL || "mongodb://localhost:27017/marketdata";

var mongoClient = new mongodb.MongoClient(DB_URL, {useNewUrlParser: true});
mongoClient.connect(function(err) {
    if(err) {
        return console.log("Error connecting to MongoDB");
    }
    
    console.log("DB connection established");
    var DB = mongoClient.db("marketdata");
    
    fs.readFile("data.csv", "utf-8", function(error, fileData) {
        if(error) { return console.log("error reading file"); }

        fileData = fileData.split("\n");

        var sharePrices = [];

        for(var i = 1; i < fileData.length - 1; i++) {
            var stockData = fileData[i].split(",");
            var name = stockData[0];
           
            var currentPrice = stockData[5];
           

            sharePrices.push({
                name: name,
                
                currentPrice: parseFloat(currentPrice)
                
            });

        }

        DB.collection("bhavdata").deleteMany({}, function(error){
            if(error) { return console.log("error deleting data"); }

            console.log("deleted data.. now inserting...")

            DB.collection("bhavdata").insertMany(sharePrices, function(error){
                if(error) {
                    console.log("error inserting data to DB");
                } else {
                    console.log("data inserted succesfully");
                }
            });

        });

    });

});