var app = require('./app/app');
var db = require('./app/db');
var users = require('./app/users');

db.connect(function(){
		app.listen(process.env.PORT, function(){
		console.log("SERVER RUNNING.. Listening on http://localhost:3000");
	});
});
