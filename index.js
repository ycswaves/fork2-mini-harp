var connect = require('connect')
  , serveStatic = require('serve-static')
  , serveJade = require('./lib/processor/jade.js')
  , serveLess = require('./lib/processor/less.js');

module.exports = function(path){
  var app = connect();

  app.use(function(request, response, next){
    var url = request.url.split('/');
    if(url[1] == 'current-time'){
      response.write(new Date().toISOString());
      response.end();
    }
    else if(url[1] == ''){
      request.url = request.url+'index.html';
      next();
    }
    else {
      next();
    }
  }).use(serveStatic(path))
    .use(serveJade(path))
    .use(serveLess(path));

  return app;
}

function serveRoot(request, response, next){
  request.url = request.url+'index.html';
}