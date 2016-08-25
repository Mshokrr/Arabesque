var mongoose = require('mongoose');
var User = mongoose.model('User');
var Inspire = mongoose.model('Inspire');
var League = mongoose.model('League');
var Orchestra = mongoose.model('Orchestra');

module.exports.usersList = function(req, res){
	var memberLevel = req.body.level;
	User.find({ level: { $lt: memberLevel }}, function(err, results){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		if (results) {
			console.log("-> Request for users list is granted");
			res.send(results);
		}
	});
}
module.exports.promoteUser = function(req, res){
	var userMobileNumber = req.body.mobileNumber;
	User.findOne({mobileNumber : userMobileNumber}, function(err, user){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			console.log(user);
			try{
				user.promote();
				res.status(200).json({
					"message" : "Success"
				});
			}
			catch(err){
				res.status(401).json(err);
			}
		}
	});
}

module.exports.acceptParticipant = function(req, res){
	var participantMobileNumber = req.body.mobileNumber;
	var project = req.body.project;
	if (project === 'Inspire'){
		Inspire.find({mobileNumber : participantMobileNumber}, function(err, result){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}
			else{
				try{
					result.acceptParticipant();
				}
				catch(err){
					res.status(401).json(err);
				}
			}
		});
	}
	if (project === 'League'){
		League.find({mobileNumber : participantMobileNumber}, function(err, result){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}
			else{
				try{
					result.acceptPhase();
				}
				catch(err){
					res.status(401).json(err);
				}
			}
		});
	}
	if (project === 'Orchestra'){
		Orchestra.find({mobileNumber : participantMobileNumber}, function(err, result){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}
			else{
				try{
					result.acceptPhase();
				}
				catch(err){
					res.status(401).json(err);
				}
			}
		});
	}
	else{
		res.status(401).json({
			"message" : "An Error occured, this user might not no longer be a participant or an internal server error occured"
		});
	}
}
module.exports.rejectParticipant = function(req, res){
	var participantMobileNumber = req.body.mobileNumber;
	var project = req.body.project;
	if(project === 'Inspire'){
		Inspire.remove({mobileNumber : participantMobileNumber}, function(err){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}
			else{
				console.log("-> Removed"+participantMobileNumber+" from project");
				res.status(200).json({
					"message" : "Success"
				});
			}
		});
	}
	if(project === 'League'){
		League.remove({mobileNumber : participantMobileNumber}, function(err){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}
			else{
				console.log("-> Removed"+participantMobileNumber+" from project");
				res.status(200).json({
					"message" : "Success"
				});
			}
		});
	}
	if(project === 'Orchestra'){
		Orchestra.remove({mobileNumber : participantMobileNumber}, function(err){
			if(err){
				console.log(err);
				res.status(500).json(err);
			}
			else{
				console.log("-> Removed"+participantMobileNumber+" from project");
				res.status(200).json({
					"message" : "Success"
				});
			}
		});
	}
}
