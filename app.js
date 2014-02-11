
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);

var model = require('./models/models.js');
var modelData = require('./data/data.js');

app.post('/Update', express.bodyParser(), function(req,res){
	console.log(req);

	function GetStatusOfEvents(bosses, servers){
		for (var i = 0; i < servers.length; i++){
			var get_options = {
			  host: 'https://api.guildwars2.com',
			  port: '80',
			  path: '/v1/events.json?world_id=' + server[i].ID,
			  method: 'GET'
			};

			var get_req = http.request(get_options, function(res) {
				var jsonStr = '';
				res.on('data', function (chunk) {
					jsonStr += chunk;
					console.log(jsonStr);
				});
			});
		}
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});