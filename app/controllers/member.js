var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.usersList = function(req, res){
	User.find({}, function(err, results){
		if(err){
			console.log(err);
			res.status(500).json(err);
		}
		if (results) {
			console.log(results);
			res.send(results);
		}
	});
}
