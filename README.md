# finance-webscraper

Node.js API to webscrape stock info from finance sources. Work in progress...

[![NPM](https://nodei.co/npm/finance-webscraper?mini=true)](https://npmjs.org/package/finance-webscraper)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/nunokisc/finance-webscraper)


# Installation

```
npm install finance-webscraper
```

# Usage

### Implemented
```js
ticker.marketwatch
- .getArticles

ticker.finviz
- .getArticles
- .getAnalists
- .getHomePageHeadLines
```

### Example

```js
var FINANCEWS = require('finance-webscraper');
var tsla = new FINANCEWS('tsla');

tsla.marketwatch.getArticles(function (err, data) {
  console.log(err)
  console.log(data)
})
```



## License

Licensed under the Apache license, version 2.0 (the "license"); You may not use this file except in compliance with the license. You may obtain a copy of the license at:

    http://www.apache.org/licenses/LICENSE-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the license is distributed on an "as is" basis, without warranties or conditions of any kind, either express or implied. See the license for the specific language governing permissions and limitations under the license.