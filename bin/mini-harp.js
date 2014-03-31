#!/usr/bin/env node
var createMiniHarp = require("index.js")
  , parseArgs = require('minimist')
  , args = parseArgs(process.argv.slice(2))
  , port = args.port || 4000
  , app = createMiniHarp();

console.log("Starting mini-harp on http://localhost: %d",port);
app.use(function(request,response,next){
  var url = request.url.split('/');
  if(url[1] == 'current-time'){
    response.write(new Date().toISOString());
    response.end();
  } else {
    next();
  }
}).listen(port);
