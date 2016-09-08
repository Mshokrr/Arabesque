var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWTSECRET,
	userProperty: 'payload'
});

var authCtrl = require('./controllers/authentication');
var profileCtrl = require('./controllers/profile');
var adminCtrl = require('./controllers/admin');
var memberCtrl = require('./controllers/member');
var pictureCtrl = require('./controllers/picture')
var contactCtrl = require('./controllers/contact');

module.exports = function(app){

	app.get('/', function (req,res){
		res.sendFile(__dirname + "/public/index.html");
	});

	app.get('/api/profile', auth, profileCtrl.profileRead);
	app.post('/api/register', authCtrl.register);
	app.post('/api/login', authCtrl.login);
	app.post('/api/editProfile', profileCtrl.editProfile);
	app.post('/api/changePassword', profileCtrl.changePassword);
	app.post('/api/resetPassword', adminCtrl.resetPassword);
	app.post('/api/usersList', memberCtrl.usersList);
	app.get('/api/downloadUsersList', memberCtrl.downloadUsersList);
	// app.get('/api/downloadUsersList', function(req, res){
	// 	console.log("attempting to download a file");
	// 	var file = __dirname + '/config/passport.js';
	// 	res.download(file);
	// });
	app.post('/api/promoteUser', memberCtrl.promoteUser);
	app.post('/api/upload', pictureCtrl.uploadPicture);
	app.post('/api/postNews', adminCtrl.postNews);
	app.get('/api/getNews', profileCtrl.getNews);
	app.post('/api/contactDevs', contactCtrl.sendEmail);

}
