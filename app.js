
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var https = require('https');
var path = require('path');
var url = require("url");

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

var modelData = require('./data/data.js');

global.gw2JSONInMemory = [];
app.post('/Update', express.bodyParser(), function(req,res){	
	GetStatusOfEvents();
	function GetStatusOfEvents(){	
		if (global.gw2JSONInMemory.length == 3){
			SendResponse(res);
			return;
		}
		for (var i = 0; i < modelData.Servers.length; i++){
			var server = modelData.Servers[i];
			https.get(url.parse('https://api.guildwars2.com/v1/events.json?world_id=' + server.ID), function(extRes) {
				var jsonStr = '';
				extRes.on('data', function (chunk) {
					jsonStr += chunk;						
				});
				extRes.on('end', function () {
					var jsonData = JSON.parse(jsonStr);
					global.gw2JSONInMemory.push({serverID: jsonData.events[0].world_id, JsonData: jsonData});
					if (global.gw2JSONInMemory.length == 3)	{																							
						SendResponse(res);
						setTimeout(ClearCache, 5000);
					}
				});
			});
		}		
	}

	function SendResponse(res){
		for (var i = 0; i < modelData.Servers.length; i++){
			var server = modelData.Servers[i];
			if (server.Bosses.length == 0)
				server.Bosses = JSON.parse(JSON.stringify(modelData.Bosses));
			var dataJson;
			for (var j = 0; j < global.gw2JSONInMemory.length; j++){
				if (global.gw2JSONInMemory[j].serverID == server.ID){
					dataJson = global.gw2JSONInMemory[j].JsonData;
					break;
				}
			}								 
			for (var j = 0; j < dataJson.events.length; j++) {
				for (var b = 0; b < server.Bosses.length; b++){
					var boss = server.Bosses[b];																																																															
					for (var ev = 0; ev < boss.Events.length; ev++){
						var event = boss.Events[ev];
						if (dataJson.events[j].event_id == event.ID){
							event.Status = dataJson.events[j].state == "Active";
							break;
						}
					}
				}
			}		
		}
		res.json(modelData.Servers);
	}
});

function ClearCache(){
	global.gw2JSONInMemory = [];
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});