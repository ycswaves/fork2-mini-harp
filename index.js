var connect = require('connect')
  , serveStatic = require('serve-static');

module.exports = function(path){
  var app = connect();

  app.use(function(request, response, next){
    var url = request.url.split('/');
    if(url[1] == 'current-time'){
      response.write(new Date().toISOString());
      response.end();
    } else {
      next();
    }
  }).use(serveStatic(path));

  return app;
}