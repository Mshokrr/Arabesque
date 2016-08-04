var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res){

	console.log("-> API call arrived to server, getting profile information");
	if(!req.payload._id){
		res.status(401).json({
			"message": "Unauthorized Error: private profile."
		});
	}
	else {
		User.findById(req.payload._id).exec(function(err, user){
			res.status(200).json(user);
		});
	}
}

module.exports.editProfile = function(req, res){
	console.log(req.payload.firstName);
	console.log("-> Attempting to modify information");

	console.log("-> Modifying information for "+req.payload.mobileNumber);

	// User.findById(req.payload._id).exec(function(err, user){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	else{
	// 		user.firstName = req.body.firstName;
	// 		user.lastName = req.body.lastName;
	// 		user.email = req.body.email;
	// 		user.address = req.body.address;
	// 		user.university = req.body.university;
	// 		user.faculty = req.body.faculty;
	// 		user.academicYear = req.body.academicYear;
	// 		user.visits.$inc();
	// 		user.save();
	// 	}
	// });
}