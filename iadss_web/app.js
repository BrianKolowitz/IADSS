
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var study = require('./routes/study');
var http = require('http');
var path = require('path');
var orm_map = require('./orm_map');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(orm_map.iadss_map); // has to be before app.use(app.router);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));
app.engine('html', require('ejs').renderFile);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(request, response) {
    response.render('index.html')
});

app.get('/api/users', user.list);
app.get('/api/studies', study.query);
app.get('/api/studies/:studyId', study.get);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
