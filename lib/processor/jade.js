module.exports = makeJade;
var path = require('path')
  , fs = require('fs')
  , jade = require('jade');

function makeJade (root) {
  return function (req, res, next){
    var requestFilePath = (root+req.url);

    if(path.extname(req.url) == '.html'){
      var htmlExists = fs.exists(requestFilePath, function (exists){
        if(exists){
          serveFile(requestFilePath, 'html', res, next);
        }
        else { return false; }
      });

      if(!htmlExists){ //if html not exist, then look for jade
        var jadeFilePath = requestFilePath.replace(/html$/,'jade');
        fs.exists(jadeFilePath, function (exists){
          if(exists){
            serveFile(jadeFilePath, 'jade', res, next);
          }
          else { next(); }
        });
      }
      else { next(); }
    }
    else { // if neither html or jade exists
      next();
    }
  }
}

function serveFile (filePath, fileType, res, next){
  fs.readFile(filePath, {encoding:'utf8'}, function (err, data){
    if (err) {
      next();
    } else {
      var html = (fileType == 'jade')? jade.renderFile(filePath) : data;
      res.setHeader('Content-Length', html.length);
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.write(html);
      res.end();
    }
  });
}