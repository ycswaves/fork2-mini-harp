module.exports = makeJade;
var path = require('path')
  , fs = require('fs')
  , jade = require('jade');

function makeJade (root) {
  return function (req, res, next){
    var requestFilePath = (root+req.url)
      , jadeFilePath = requestFilePath.replace(/html$/,'jade');

    fs.readFile(jadeFilePath, {encoding:'utf8'}, function (err, data){
      if (err) {
        next();
      } else {
        var html = jade.renderFile(jadeFilePath);
        res.setHeader('Content-Length', html.length);
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.write(html);
        res.end();
      }
    });
  }
}
