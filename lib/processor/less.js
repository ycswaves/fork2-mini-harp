module.exports = makeLess;
var path = require('path')
  , fs = require('fs')
  , less = require('less');

function makeLess (root) {
  return function (req, res, next){
    var requestFilePath = (root+req.url)
      , lessFilePath = requestFilePath.replace(/css$/,'less');

    fs.readFile(lessFilePath, {encoding:'utf8'}, function (err, data){
      if (err) {
        next();
      } else {
        var stylesheet;
        less.render(data, function(e, css){
          if(e){
            next();
          }
          else{
            res.setHeader('Content-Length', css.length);
            res.setHeader('Content-Type', 'text/css; charset=UTF-8');
            res.write(css);
            res.end();
          }
        });
      }
    });
  }
}

function serveFile (filePath, fileType, res, next){

}