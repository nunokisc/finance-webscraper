var fs = require('fs');
var libPath = __dirname + '/modules';

var FINANCEWS = function (ticker) {
  var _this = this;

  if (!ticker) {
    throw new Error('ticker is a required argument.');
  }

  this.ticker = ticker;

  // Add all the modules
  var files = fs.readdirSync(libPath);
  var i = 0;
  var len = files.length;
  while (i < len) {
    var name = files[i].replace('.js', '');
    var Item = require(libPath + '/' + name);
    _this[name] = new Item(this.ticker);
    i++;
  }
};

module.exports = FINANCEWS;