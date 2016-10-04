var db = require('./app/db');
var users = require('./app/models/users');
var picture = require('./app/models/picture');
var gallery = require('./app/models/gallery');
var news = require('./app/models/news.js');
var project = require('./app/models/project.js');
var interviewSlot = require('./app/models/interviewSlot.js');
var participation = require('./app/models/participation.js');

var app = require('./app/app');

db.connect(function(){
		app.listen(process.env.PORT, function(){
		console.log("SERVER RUNNING.. Listening on http://localhost:3000");
	});
});
