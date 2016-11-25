var express = require('express');
var ssi = require('node-ssi'),
  path = require("path"),
  fs = require("fs");
var app = express();
var root = "http://rr0.org";
var parser 		= new ssi(__dirname, "", "");

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path) {
    'use strict';
    res.set('x-timestamp', Date.now());
  }
};
app.use(express.static('/', options));

// Handle server side includes for html files
app.use(function(req,res,next) {
  var filename 	= __dirname+(req.path == "/" ? "/index.shtml" : req.path);

  if(fs.existsSync(filename)) {
    var results = parser.compileFile(filename, function(err, output) {
      "use strict";
      res.send(output);
    });
  } else {
    next();
  }
});
/*app.use(function (req, res, next) {
  'use strict';
  var p;
  if (req.path.charAt(req.path.length - 1) === "/") {
    p = req.path + "index.html";
  } else if (req.path.indexOf('.') < 0) {
    p = req.path + "/index.html";
  } else {
    p = req.path;
  }
  var filename = __dirname + p;

  if (fs.existsSync(filename)) {
    var contents = fs.readFileSync(filename, {encoding: "utf8"});
    var parsed = parser.parse(filename, contents);
    if (filename.indexOf('.css') > 0) {
      res.writeHead(200, {'Content-Type': 'text/css'});
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
    }
    res.write(parsed.contents);
    res.end();
  } else {
    next();
  }
});*/

app.listen(process.env.PORT || 8080);

/*app.use(serveStatic('.', {'index': ['index.html', 'index.shtml']}));
 var server = app.listen(8080, function() {
 console.log('Listening on port %d', server.address().port);
 });*/

/*var http = require('http');
 http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.write('Hello Node.js!\n');
 if ('host' in req.headers) {
 var host = req.headers['host'];
 res.write('Vhost is ' + host.split(':')[0] + '\n');
 } else {
 res.write('No vhost specified\n');
 }
 res.end();
 }).listen(8080);*/