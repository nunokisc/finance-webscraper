var utils = require('../lib/utils');

var Finviz = function (ticker) {
  this.ticker = ticker;
  this.url = 'https://finviz.com/quote.ashx?t=' + ticker;
  this.homePageUrl = 'https://finviz.com/';
};

Finviz.prototype.getArticles = function (callback) {
  utils.modem(this.url, function (err, response) {
    if (err)
      callback(err)

    const html = response.data;
    const $ = utils.processor.load(html);
    const analists = $('#news-table > tbody > tr');
    const articlesScraped = [];

    analists.each(function (index, element) {

      let date = $($(element).find('td')[0]).text();
      let headline = $(element).find('td').find('.news-link-left > a').text();
      let link = $(element).find('td').find('.news-link-left > a').attr('href');
      let source = $(element).find('td').find('span').text().trim();
      if (date !== "")
        articlesScraped.push({
          'date': date,
          'headline': headline,
          'link': link,
          'source': source || ''
        })
    });

    callback(undefined, articlesScraped)

  })
}

Finviz.prototype.getAnalists = function (callback) {
  utils.modem(this.url, function (err, response) {
    if (err)
      callback(err)

    const html = response.data;
    const $ = utils.processor.load(html);
    const analists = $('.fullview-ratings-outer > tbody > tr > td > table > tbody > tr');
    const analistsScraped = [];

    analists.each(function (index, element) {

      let date = $($(element).find('td')[0]).text();
      let op = $($(element).find('td')[1]).text();
      let who = $($(element).find('td')[2]).text();
      let change = $($(element).find('td')[3]).text();
      let price = $($(element).find('td')[4]).text();
      if (date !== "")
        analistsScraped.push({
          'date': date,
          'op': op,
          'who': who,
          'change': change,
          'price': price || ''
        })

    });

    callback(undefined, analistsScraped)

  })
}

Finviz.prototype.getHomePageHeadLines = function (callback) {
  utils.modem(this.homePageUrl, function (err, response) {
    if (err)
      callback(err)

    const html = response.data;
    const $ = utils.processor.load(html);
    const articles = $('tr > td > table.t-home-table > tbody > tr');
    const articlesScraped = [];

    articles.each(function () {

      let dateFirst = $(this).find('.nn-home-first > .nn-date').text().trim();
      let headlineFirst = $(this).find('.nn-home-first > td > a').text().trim();
      let linkFirst = $(this).find('.nn-home-first > td > a').attr('href');
      if (headlineFirst !== "")
        articlesScraped.push({
          'headline': headlineFirst,
          'link': linkFirst,
          'date': dateFirst,
        })

      let headline = $(this).find('.nn-home > td > a').text().trim();
      let date = $(this).find('.nn-home > .nn-date').text().trim();
      let link = $(this).find('.nn-home > td > a').attr('href');
      if (headline !== "")
        articlesScraped.push({
          'headline': headline,
          'link': link,
          'date': date,
        })
    });

    callback(undefined, articlesScraped)

  })
}

module.exports = Finviz;