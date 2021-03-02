var fs = require('fs');
var libPath = __dirname + '/modules';

var FINANCEWS = function () {
    var _this = this;

    // Add all the modules
    var files = fs.readdirSync(libPath);
    var i = 0;
    var len = files.length;
    while (i < len) {
        var name = files[i].replace('.js', '');
        var Item = require(libPath + '/' + name);
        _this[name] = new Item(this.config);
        i++;
    }
};

module.exports = FINANCEWS;