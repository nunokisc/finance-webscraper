var utils = require('../lib/utils');

var Marketwatch = function (ticker) {
  this.ticker = ticker;
  this.url = 'https://www.marketwatch.com/investing/stock/' + ticker;
};

Marketwatch.prototype.getArticles = function (callback) {
  utils.modem(this.url, function (err, response) {
    if (err)
      callback(err)
    const html = response.data;
    const $ = utils.processor.load(html);
    const articles = $('.element .element--article');
    const articlesScraped = [];

    articles.each(function () {

      let headline = $(this).find('.article__content > .article__headline  > .link').text().trim();
      let link = $(this).find('.article__content > .article__headline > .link').attr('href');
      let timestamp = $(this).find('.article__content > .article__details > .article__timestamp').attr('data-est');
      let author = $(this).find('.article__content > .article__details > .article__provider').text().trim() || $(this).find('.article__content > .article__details > .article__author').text().trim();
      let image = $(this).find('.article__figure > .figure__image > img').attr('data-srcset');
      if (headline !== "")
        articlesScraped.push({
          'headline': headline,
          'link': link,
          'timestamp': timestamp,
          'author': author,
          'image': image
        })
    });

    let sortedArticlesScraped = articlesScraped.sort((function (a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp)
    }))

    callback(undefined, sortedArticlesScraped)

  })
}

module.exports = Marketwatch;