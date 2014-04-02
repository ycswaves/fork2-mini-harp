module.exports = makeLess;
var path = require('path')
  , fs = require('fs')
  , less = require('less');

function makeLess (root) {
  return function (req, res, next){
    var requestFilePath = (root+req.url);

    if(path.extname(req.url) == '.css'){
      var cssExists = fs.exists(requestFilePath, function (exists){
        if(exists){
          serveFile(requestFilePath, 'css', res, next);
        }
        else { return false; }
      });

      if(!cssExists){ //if css not exist, then look for less
        var lessFilePath = requestFilePath.replace(/css$/,'less');
        fs.exists(lessFilePath, function (exists){
          if(exists){
            serveFile(lessFilePath, 'less', res, next);
          }
          else { next(); }
        });
      }
      else { next(); }
    }
    else { // if neither css or less exists
      next();
    }
  }
}

function serveFile (filePath, fileType, res, next){
  fs.readFile(filePath, {encoding:'utf8'}, function (err, data){
    if (err) {
      next();
    } else {
      var stylesheet;
      if (fileType == 'less'){
        less.render(data, function(e, css){
          if(e){
            next();
          }
          else{
            stylesheet = css;
          }
        });
      }
      else{
        stylesheet = data;
      }
      res.setHeader('Content-Length', stylesheet.length);
      res.setHeader('Content-Type', 'text/css; charset=UTF-8');
      res.write(stylesheet);
      res.end();
    }
  });
}