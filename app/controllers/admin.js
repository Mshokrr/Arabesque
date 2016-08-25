var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.resetPassword = function(req, res){
	var nonAdminUserMobileNumber = req.body.mobileNumber;
	console.log("-> ADMIN: Setting Password for "+nonAdminUserMobileNumber);
	User.findOne({'mobileNumber' : nonAdminUserMobileNumber}).exec(function(err, user){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		else{
				console.log("-> New password is "+req.body.newPassword);
				user.resetPassword(req.body.newPassword);
				console.log("-> ADMIN: Password reset for "+nonAdminUserMobileNumber);
				res.status(200).json({
					"message" : "Password reset completed"
				});
		}
	});
}
