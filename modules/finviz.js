var Finviz = function () { };

Finviz.prototype.getArticles = function (ticker, callback) {
  const url = 'https://finviz.com/quote.ashx?t=' + ticker;
  const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36";

  axios.get(url, { headers: { 'User-Agent': userAgent } }).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
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

  }).catch(function (e) {
    callback(e);
  });
}

Finviz.prototype.getAnalists = function (ticker, callback) {
  const url = 'https://finviz.com/quote.ashx?t=' + ticker;
  const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36";

  axios.get(url, { headers: { 'User-Agent': userAgent } }).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
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

  }).catch(function (e) {
    callback(e);
  });
}

Finviz.prototype.getHomePageHeadLines = function (ticker, callback) {
  const url = 'https://finviz.com/';
  const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36";

  axios.get(url, { headers: { 'User-Agent': userAgent } }).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
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

  }).catch(function (e) {
    callback(e);
  });
}


module.exports = Finviz;