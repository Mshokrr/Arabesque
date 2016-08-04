var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function (req, res) {

	console.log("-> Registering user");

	var user = new User();
	user.mobileNumber = req.body.mobileNumber;
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.email = req.body.email;
	user.address = req.body.address;
	user.university = req.body.university;
	user.faculty = req.body.faculty;
	user.academicYear = user.academicYear;
	user.level = 1;
	user.setPassword(req.body.password);

	user.save(function(err){
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
			"token": token
		});
	});

}

module.exports.login = function (req, res){

	console.log("-> Logging in");

	console.log("-> " + req.body.mobileNumber + " logging in");

	passport.authenticate('local', function(err, user, info){
		console.log("-> Passport initaiting login");
		var token;
		if(err){
			res.status(404).json(err);
			return;
		}
		if(user){
			console.log("-> Login successful");
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token": token
			});
		}
		else {
			console.log("-> ERR Unauthorized Error!");
			res.status(401).json(info);
		}
	})(req, res);
}