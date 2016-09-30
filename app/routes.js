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
var seedScripts = require('./config/seed.js');


module.exports = function(app){

	app.get('/', function (req,res){
		res.sendFile(__dirname + "/public/index.html");
	});
	app.get('/db/seedUsers', seedScripts.seedUsers);
	app.get('/api/profile', auth, profileCtrl.profileRead);
	app.post('/api/register', authCtrl.register);
	app.post('/api/login', authCtrl.login);
	app.post('/api/editProfile', auth, profileCtrl.editProfile);
	app.post('/api/changePassword', auth, profileCtrl.changePassword);
	app.post('/api/resetPassword', auth, adminCtrl.resetPassword);
	app.get('/api/usersList', auth, memberCtrl.usersList);
	app.get('/api/downloadUsersList', auth, memberCtrl.downloadUsersList);
	app.post('/api/changeLevel', auth, adminCtrl.changeLevel);
	app.post('/api/upload', auth, pictureCtrl.uploadPicture);
	app.post('/api/postNews', auth, adminCtrl.postNews);
	app.post('/api/deleteNews', auth, adminCtrl.deleteNews);
	app.get('/api/getNews/:viewerLevel', profileCtrl.getNews);
	app.post('/api/contactDevs', auth, contactCtrl.sendEmail);
	app.post('/api/createProject', auth, adminCtrl.createProject);
	app.post('/api/toggleProjectStatus', auth, adminCtrl.toggleProjectStatus);
	app.post('/api/editProject', auth, adminCtrl.editProject);
	app.post('/api/addPhase', auth, adminCtrl.addPhase);
	app.post('/api/editWorkshops', auth, adminCtrl.editWorkshops);
	app.get('/api/getProjects', auth, profileCtrl.getProjects);
	app.get('/api/getAllProjects', auth, adminCtrl.getAllProjects);
	app.post('/api/participateInProject', auth, profileCtrl.participateInProject);
	app.get('/api/getParticipations', auth, profileCtrl.getParticipations);
	app.post('/api/cancelParticipation', auth, profileCtrl.cancelParticipation);
	app.get('/api/getParticipants/:projectID', auth, memberCtrl.getParticipants);
	app.get('/api/getParticipantById/:participationID', auth, memberCtrl.getParticipantById);
	app.post('/api/acceptPhase', auth, memberCtrl.acceptPhase);
	app.post('/api/resetAcceptance', auth, memberCtrl.resetAcceptance);
	app.post('/api/setWorkshop', auth, memberCtrl.setWorkshop);
	app.post('/api/rejectParticipant', auth, memberCtrl.rejectParticipant);
	app.post('/api/addComment', auth, memberCtrl.addComment);
	app.post('/api/clearComments', auth, adminCtrl.clearComments);
	app.post('/api/clearRejectedParticipants', auth, adminCtrl.clearRejectedParticipants);
	app.post('/api/rejectPendingParticipants', auth, adminCtrl.rejectPendingParticipants);
	app.post('/api/createInterviewSlot', auth, memberCtrl.createInterviewSlot);
}
