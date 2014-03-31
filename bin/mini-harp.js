#!/usr/bin/env node
var createMiniHarp = require("mini-harp")
  , parseArgs = require('minimist')
  , args = parseArgs(process.argv.slice(2))
  , port = args.port || 4000
  , root = (typeof args._[0] === 'undefined')?
            process.cwd() : process.cwd() + '/' + args._[0]
  , app = createMiniHarp(root)
  , serveStatic = require('serve-static');


console.log("Starting mini-harp on http://localhost: %d, path: %s",port,root);
app.use(function(request, response, next){
  var url = request.url.split('/');
  if(url[1] == 'current-time'){
    response.write(new Date().toISOString());
    response.end();
  } else {
    next();
  }
}).use(serveStatic(root))
.listen(port);
