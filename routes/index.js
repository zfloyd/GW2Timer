var modelData = require('../data/data.js');

exports.index = function(req, res){
  res.render('index', { title: 'Guild Wars 2 Timer', Bosses: modelData.Bosses, Servers: modelData.Servers });
};

var http = require('http');