
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , wines = require('./routes/wine')
  , fs = require('fs')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.engine('html', function (path, options, fn) {
      if ('function' == typeof options) {
        fn = options, options = {};
      }
      fs.readFile(path, 'utf8', fn);
    })

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/wines', wines.findAll);


app.get("/wines/:id", wines.findById);

app.get('*', function(req,res){
	res.render('index.html', {layout:null});
});


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
