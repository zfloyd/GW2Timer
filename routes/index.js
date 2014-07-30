var modelData = require('../data/data.js');

exports.index = function(req, res){
	var selectedServers = [];
	for (var i = 0; i < modelData.Servers.length; i++){
		if (modelData.Servers[i].Selected)
			selectedServers.push(modelData.Servers[i]);
	}
	res.render('index', { title: 'Guild Wars 2 Timer', Bosses: modelData.Bosses, Servers: modelData.Servers.sort(function(a, b){ if (a.Name < b.Name) return -1; if (a.Name > b.Name) return 1; return 0;}), SelectedServers: selectedServers .sort(function(a, b){ if (a.ID < b.ID) return 1; if (a.ID > b.ID) return -1; return 0;})});
};

var http = require('http');