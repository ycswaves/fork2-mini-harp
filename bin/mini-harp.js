#!/usr/bin/env node
var createMiniHarp = require("mini-harp")
  , parseArgs = require('minimist')
  , args = parseArgs(process.argv.slice(2))
  , port = args.port || 4000
  , root = (typeof args._[0] === 'undefined')?
            process.cwd() : process.cwd() + '/' + args._[0]
  , app = createMiniHarp(root);


console.log("Starting mini-harp on http://localhost: %d",port);
app.listen(port);
