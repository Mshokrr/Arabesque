var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('News');

var userID = null;
var userMobileNumber = null;


module.exports.profileRead = function(req, res){

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
