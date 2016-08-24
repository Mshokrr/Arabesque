var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new localStrategy({
		usernameField: 'mobileNumber'
	},
	function(username, password, done){
	User.findOne({mobileNumber: username}, function(err, user){
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null, false, {
			message: 'User was not found'
				});
			}
		if(!user.validPassword(password)) {
			return done(null, false, {
				message: 'Incorrect Password'
			});
		}
		return done(null, user);
	});
	}
));
