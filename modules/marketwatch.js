var Marketwatch = function () { };

Marketwatch.prototype.getArticles = function (ticker, callback) {
  const url = 'https://www.marketwatch.com/investing/stock/' + ticker;
  const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36";

  axios.get(url, { headers: { 'User-Agent': userAgent } }).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
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

  }).catch(function (e) {
    callback(e);
  });
}


module.exports = Marketwatch;