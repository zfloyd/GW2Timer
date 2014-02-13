exports.BossClass = function(name, events){
    this.Name = name;
    this.Events = events;
	this.Visible = true;
}
exports.EventClass = function(id, name){
    this.ID = id;
    this.Name = name;
    this.Status = false;
}

exports.ServerClass = function(id, name){
    this.ID = id;
    this.Name = name;
	this.Bosses = [];
}