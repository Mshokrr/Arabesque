var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('News');
var Project = mongoose.model('Project');
var Participation = mongoose.model('Participation');
var InterviewSlot = mongoose.model('InterviewSlot');

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
	User.findById(req.body.userID).exec(function(err, user){
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
			res.status(200).json({
				"message" : "Success"
			});
		}
	});
}

module.exports.changePassword = function(req, res){
	User.findById(req.body.userID).exec(function(err, user){
		if (err){
			console.log(err);
			res.status(500).json(err);
		}
		else {
			try{
				user.changePassword(req.body.oldPassword, req.body.newPassword);
				res.status(200).json({
					"message" : "Success"
				});
			}
			catch(err){
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

	Participation.find({ projectID : req.body.projectID, userID : req.body.userID }, function(err, results){
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
					User.findById(req.body.userID).exec(function(err, user){
						if(err){
							console.log(err);
							res.status(500).json(err);
						}
						else{
							var participant = new Participation();
							participant.projectID = req.body.projectID;
							participant.projectName = req.body.projectName;
							participant.userID = user._id;
							participant.userMobileNumber = user.mobileNumber;
							participant.userName = user.firstName + " " + user.lastName;
							participant.userEmail = user.email;
							participant.userLevel = user.level;
							participant.selectionPhases = project.selectionPhases;
							participant.workshopNaming = project.workshopNaming;
							if(req.body.firstPref !== null && req.body.secondPref !== null){
								participant.workshop = {};
								participant.workshop.prefs = [];
								participant.workshop.selected = null;
								participant.workshop.prefs.push(req.body.firstPref);
								participant.workshop.prefs.push(req.body.secondPref);
								participant.workshop.all = Array.from(new Set(project.firstPrefWorkshops.concat(project.secondPrefWorkshops)));
							}
							else{
								participant.workshop = null;
							}
							participant.phaseIndex = 0;
							participant.userAcademicYear = req.body.academicYear;
							participant.save(function(err){
								if(err){
									console.log(err);
									res.status(500).json(err);
								}
								else{
									user.academicYear = req.body.academicYear;
									user.save(function(err){
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
			});
		}
	});
}

module.exports.getParticipations = function(req, res){
	Participation.find({ userID : req.params.userID }, function(err, results){
		if(err){
			console.log(err);
			res.status(500).json(err);
			}
			else{
				res.send(results);
			}
	});
}

module.exports.getParticipantById = function(req, res){
    Participation.findById(req.params.participationID).exec(function(err, participation){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.send(participation);
      }
    });
}

module.exports.cancelParticipation = function(req, res){
	Participation.findById(req.body.participationID).exec(function(err, participant){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			participant.clearInterviewSlot();
			participant.remove(function(err){
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
	});
}

module.exports.getInterviewSlots = function(req, res){
	InterviewSlot.find({ projectID : req.params.projectID , phaseName : req.params.phase , capacity : { $gt : 0 }}, function(err, results){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			res.send(results);
		}
	});
}

module.exports.reserveInterviewSlot = function(req, res){
	Participation.findById(req.body.participationID).exec(function(err, participant){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			InterviewSlot.findById(req.body.slotID).exec(function(err, slot){
				if(err){
					console.log(err);
					res.status(500).json(err);
				}
				else{
					try{
						slot.reserve();
						slot.save(function(err){
							if(err){
								console.log(err);
								res.status(500).json(err);
							}
							else{
								participant.interviewSlot = req.body.slotID;
								participant.save(function(err){
									if(err){
										console.log(err);
										res.status(500).json(err);
									}
									else{
										res.status(200).json({
											"message" : "Slot reserved."
										});
									}
								});
							}
						});
					}
					catch(err){
						res.status(500).json(err);
					}
				}
			});
		}
	});
}

module.exports.getInterviewSlotById = function(req, res){
	InterviewSlot.findById(req.params.slotID).exec(function(err, slot){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			res.send(slot);
		}
	});
}

module.exports.cancelReservation = function(req, res){
	Participation.findById(req.body.participationID).exec(function(err, participation){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
			participation.clearInterviewSlot();
			participation.interviewSlot = null;
			participation.save(function(err){
				if(err){
					console.log(err);
					res.status(500).json(err);
				}
				else{
					res.status(200).json({
						"message" : "Success"
					});
				}
			});
		}
	});
}
