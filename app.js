
/**
 * Module dependencies.
 */

var express = require('express');
var form    = require('connect-form');

var app = module.exports = express.createServer(
	form({keepExtensions: true})
	);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {pretty: true});
  app.use(express.cookieSessions({secret: 'rainy'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
//session & cookie
  //app.use(express.cookieParser());
  //app.use(express.SessionCookie, {secret: 'rainy'});
  //app.use(express.session({secret: 'rainy'}));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

require('./routes/index')(app);
require('./routes/adm')(app);
require('./routes/upload')(app);

app.listen(8080);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
