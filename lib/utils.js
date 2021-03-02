var axios = require('axios');
var cheerio = require('cheerio');
const userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36";

module.exports = {
  modem: function (url, callback) {
    axios.get(url,
      {
        headers:
        {
          'User-Agent': userAgent
        }
      }
    ).then(response => {
      callback(undefined, response)
    }).catch(function (e) {
      callback(e);
    });
  },
  processor: function () {
    return cheerio;
  }
}