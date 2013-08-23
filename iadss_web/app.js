
/**
 * Module dependencies.
 */
var routes = require('./routes');
var user = require('./routes/user');
var study = require('./routes/study');
var image = require('./routes/image');
var http = require('http');
var path = require('path');
var orm_map = require('./orm_map');

var express = require('express');
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

app.get('/api/user', user.query);
app.get('/api/user/:userId', user.get);


app.get('/api/study', study.query);
app.get('/api/study/:studyId', study.get);
app.post('/api/study', study.add);
app.put('/api/study/:studyId', study.edit);
app.delete('/api/study/:studyId', study.delete);

app.get('/api/study/:studyId/image/:imageId', image.get);
app.post('/api/study/:studyId/image', image.add);
app.put('/api/study/:studyId/image/:imageId', image.edit);
app.delete('/api/study/:studyId/image/:imageId', image.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
