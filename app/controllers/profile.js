var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('News');
var Project = mongoose.model('Project');
var Participation = mongoose.model('Participation');

var userID = null;
var userMobileNumber = null;
var userLevel = null;


module.exports.profileRead = function(req, res){

	if(!req.payload._id){
		res.status(401).json({
			"message": "Unauthorized Error: private profile."
		});
	}
	else {
		userID = req.payload._id;
		userMobileNumber = req.payload.mobileNumber;
    userLevel = req.payload.level;
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
	var viewerLevel = req.params.viewerLevel;
	News.find({ viewerLevel : { $lte : viewerLevel } }, function(err, news){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			res.send(news);
		}
	});
}

module.exports.getProjects = function(req, res){

	console.log("-> Getting Projects");
	Project.find({ isOn : true }, function(err, projects){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			res.send(projects);
		}
	});

}

module.exports.participateInProject = function(req, res){

	console.log(req.body.projectName);

	Participation.find({ projectID : req.body.projectID, userID : userID }, function(err, results){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		if(results.length !== 0){
			res.status(401).json({
				"message" : "You are already a participant"
			});
		}
		else{
			Project.findById(req.body.projectID).exec(function(err, project){
				if(err){
					console.log(err);
					res.status(500).json(err);
				}
				else{
					var selectionPhases = project.selectionPhases;
					var participant = new Participation();
					participant.projectID = req.body.projectID;
					participant.projectName = req.body.projectName;
					participant.userID = userID;
					participant.selectionPhase = selectionPhases[0];
					participant.save(function(err){
						if(err){
							console.log(err);
							res.status(500).json(err);
						}
						else{
							res.status(200).json({
								"message" : "Participation Successfull"
							});
						}
					});
				}
			});
		}
	});
}

module.exports.getParticipations = function(req, res){
	Participation.find({ userID : userID }, function(err, results){
		if(err){
			console.log(err);
			res.status(500).json(err);
			}
			else{
				res.send(results);
			}
	});
}

module.exports.cancelParticipation = function(req, res){
	Participation.remove({userID : req.body.userID, projectID : req.body.projectID}, function(err){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			res.status(200).json({
				"message" : "Cancelled Participation"
			});
		}
	});
}
