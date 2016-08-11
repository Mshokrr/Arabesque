var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWTSECRET,
	userProperty: 'payload'
});

var authCtrl = require('./controllers/authentication');
var profileCtrl = require('./controllers/profile');

module.exports = function(app){

//  app.all('*', function(req,res,next){
//   		res.header("Access-Control-Allow-Origin", "*");
//   		res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   		next();
// 		});

	app.get('/', function (req,res){
			res.sendFile(__dirname + "/public/index.html");
		});

	app.get('/api/profile', auth, profileCtrl.profileRead);
	app.post('/api/register', authCtrl.register);
	app.post('/api/login', authCtrl.login);
	app.post('/api/editProfile', profileCtrl.editProfile);
	app.post('/api/changePassword', profileCtrl.changePassword);
	app.post('/api/resetPassword', profileCtrl.resetPassword);

	}
