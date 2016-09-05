var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('News');
var Inspire = mongoose.model('Inspire');
var League = mongoose.model('League');
var Orchestra = mongoose.model('Orchestra');

var userID = null;
var userMobileNumber = null;


module.exports.profileRead = function(req, res){

	console.log("-> API call arrived to server, getting profile information");
	if(!req.payload._id){
		res.status(401).json({
			"message": "Unauthorized Error: private profile."
		});
	}
	else {
		userID = req.payload._id;
		userMobileNumber = req.payload.mobileNumber;
		User.findById(req.payload._id).exec(function(err, user){
			res.status(200).json(user);
		});
	}
}

module.exports.editProfile = function(req, res){

	console.log("-> Attempting to modify information");
	console.log("-> Modifying information for "+userMobileNumber);

	User.findById(userID).exec(function(err, user){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			user.firstName = req.body.firstName;
			user.lastName = req.body.lastName;
			user.email = req.body.email;
			user.address = req.body.address;
			user.university = req.body.university;
			user.faculty = req.body.faculty;
			user.academicYear = req.body.academicYear;
			user.save();
			console.log("-> Modified information for "+userMobileNumber);
			res.status(200).json({
				"message" : "Success"
			});
		}
	});
}
module.exports.changePassword = function(req, res){

	console.log("-> Attempting to change password");
	console.log("-> Changing Password for "+userMobileNumber);
	User.findById(userID).exec(function(err, user){
		if (err){
			console.log(err);
			res.status(500).json(err);
		}
		else {
			try{
				user.changePassword(req.body.oldPassword, req.body.newPassword);
				console.log("-> Changed Password for "+userMobileNumber);
				res.status(200).json({
					"message" : "Success"
				});
			}
			catch(err){
				console.log("-> Failed change password attempt, incorrect old password");
				res.status(401).json({
					"message" : "incorrect password"
				});
			}
		}
	});
}

module.exports.getNews = function(req, res){
	console.log("-> Getting latest news");
	News.find({}, function(err, news){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			res.send(news);
		}
	});
}

module.exports.participateInProject = function(req, res){
	var project = req.body.project;
	if (project === 'Inspire'){
		if(Inspire.count({}) > 99){
			console.log("-> ERR! Inspire project is at full capacity");
			res.status(401).json({
				"message" : "Sorry, the project is fully booked"
			});
		}
		var inspireParticipant = new Inspire();
		inspireParticipant.mobileNumber = userMobileNumber;
		inspireParticipant.selectionPhase = 'pending';
		inspireParticipant.save(function(err){
			if (err){
				console.log(err);
				res.status(500).json(err);
			}else{
				console.log("-> Participation successful for "+userMobileNumber);
				res.status(200).json({
					"message": "Sucess! Your request to participate is sent"
				});
			}
		});
	}
	if (project === 'League'){
		var leagueParticipant = new League();
		leagueParticipant.mobileNumber = userMobileNumber;
		leagueParticipant.selectionPhase = 'test';
		leagueParticipant.save(function(err){
			if (err){
				console.log(err);
				res.status(500).json(err);
			}else{
				console.log("-> Participation successful for "+userMobileNumber);
				res.status(200).json({
					"message": "Sucess! Your request to participate is sent"
				});
			}
		});
	}
	if (project === 'Orchestra'){
		var orchestraParticipant = new Orchestra();
		orchestraParticipant.mobileNumber = userMobileNumber;
		orchestraParticipant.selectionPhase = 'audition';
		orchestraParticipant.save(function(err){
			if (err){
				console.log(err);
				res.status(500).json(err);
			}else{
				console.log("-> Participation successful for "+userMobileNumber);
				res.status(200).json({
					"message": "Sucess! Your request to participate is sent"
				});
			}
		});
	}
}

module.exports.cancelParticipation = function(req, res){
	var project = req.body.project;
	if(project === 'Inspire'){
		Inspire.remove({mobileNumber : userMobileNumber}, function(err){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}else{
				console.log("-> "+userMobileNumber+" forfeited participation");
				res.status(200).json({
					"message" : "Sucess"
				});
			}
		});
	}
	if(project === 'League'){
		League.remove({mobileNumber : userMobileNumber}, function(err){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}else{
				console.log("-> "+userMobileNumber+" forfeited participation");
				res.status(200).json({
					"message" : "Sucess"
				});
			}
		});
	}
	if(project === 'Orchestra'){
		Orchestra.remove({mobileNumber : userMobileNumber}, function(err){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}else{
				console.log("-> "+userMobileNumber+" forfeited participation");
				res.status(200).json({
					"message" : "Sucess"
				});
			}
		});
	}
}
