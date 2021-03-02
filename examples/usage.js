var FINANCEWS = require('finance-webscraper');

var tsla = new FINANCEWS('tsla');

tsla.marketwatch.getArticles(function (err, data) {
  console.log(err)
  console.log(data)
})

tsla.finviz.getHomePageHeadLines(function (err, data) {
  console.log(err)
  console.log(data)
})