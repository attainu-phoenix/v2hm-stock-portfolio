'use strict'

// Function for home page route

var homePage = function(request, response) {

    response.render("homepage.hbs");
};

exports.homePage = homePage;

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('5280d30436664906abefe8b3110761d1');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  sources: 'the-times-of-india',
  q: 'sensex',
  category: 'business',
  language: 'en',
  country: 'India'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
  q: 'sensex',
  sources: 'the-times-of-india',
  domains: 'timesofindia.indiatimes.com, moneycontrol.com',
  from: '2019-04-03',
  to: '2019-04-04',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
// To query sources
// All options are optional
newsapi.v2.sources({
  category: 'business',
  language: 'en',
  country: 'india'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      sources: [...]
    }
  */
});
