var app = require('./app/app');

app.listen(process.env.PORT, function(){
	console.log("SERVER RUNNING.. Listening on http://localhost:3000");
})