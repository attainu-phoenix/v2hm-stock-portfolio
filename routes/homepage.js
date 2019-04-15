'use strict'

// Function for home page route

var homePage = function(request, response) {

    response.render("homepage.hbs");
};

exports.homePage = homePage;

