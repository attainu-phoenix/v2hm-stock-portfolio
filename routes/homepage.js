'use strict'
var requestLib = require('request');

// Function for home page route
var homePage = function(request, response) {
    requestLib('https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=Please obtain api key from news.org and paste it in your code editor before running the program',{ json: true }, function (error, responseText, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', responseText && responseText.statusCode); // Print the response status code if a response was received
    console.log('body:', body);  // Print the HTML
    var articles = {
        articles:body
    }
    response.render("homepage.hbs", articles);
    });

};

exports.homePage = homePage;

