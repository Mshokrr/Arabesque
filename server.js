var db = require('./app/db');
var users = require('./app/models/users');
var app = require('./app/app');

db.connect(function(){
		app.listen(process.env.PORT, function(){
		console.log("SERVER RUNNING.. Listening on http://localhost:3000");
	});
});
