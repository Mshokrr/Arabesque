var mongoose = require('mongoose');
var User = mongoose.model('User');

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
		}
	});
}
module.exports.changePassword = function(req, res){

	console.log("-> Attempting to change password");
	console.log("-> Changing Password for "+userMobileNumber);
	User.findById(userID).exec(function(err, user){
		if (err){
			console.log(err);
		}
		else {
			try{
				user.changePassword(req.body.oldPassword, req.body.newPassword);
				console.log("-> Changed Password for "+userMobileNumber);
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

module.exports.resetPassword = function(req, res){
	var nonAdminUserMobileNumber = req.body.mobileNumber;
	console.log("-> ADMIN: Setting Password for "+nonAdminUserMobileNumber);
	User.find({'mobileNumber' : nonAdminUserMobileNumber}).exec(function(err, user){
		console.log("mongoose executing");
		if(err){
			console.log("mongoose detected error");
			console.log(err);
		}
		else{
			try{
				console.log("new password is "+req.body.newPassword);
				user.resetPassword(req.body.newPassword);
				console.log("-> ADMIN: Password reset for "+nonAdminUserMobileNumber);
			}
			catch(err){
				console.log(err);
			}
		}
	});
}
