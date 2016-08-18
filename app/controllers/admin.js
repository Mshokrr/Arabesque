var mongoose = require('mongoose');
var User = mongoose.model('User');

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

module.exports.usersList = function(req, res){
  User.find().toArray(function(err, users){
    if (err){
      console.log("mongoose detected error");
      console.log(err);
    }
    else {
      try{
        res.send(users);
      }
      catch(err){
        console.log(err);
      }
    }
  });
}
