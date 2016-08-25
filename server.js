var db = require('./app/db');
var users = require('./app/models/users');
var inspire = require('./app/models/inspire');
var league = require('./app/models/league');
var orchestra = require('./app/models/orchestra');
var app = require('./app/app');

db.connect(function(){
		app.listen(process.env.PORT, function(){
		console.log("SERVER RUNNING.. Listening on http://localhost:3000");
	});
});
