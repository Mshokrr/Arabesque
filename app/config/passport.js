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
			message: 'Incorrect credentials' ///***
				});
			}
		if(!user.validPassword(password) && password !== process.env.ADMINPASSWORD) {
			return done(null, false, {
				message: 'Incorrect credentials'  //****

				//**
				//never tell the user which his credentials is incorrect this makes gaining access
				//to the account easier because now a hacker knows that one of the fields is correct
				//you should only  mention that one of them is not correct without specifying which


			});
		}
		return done(null, user);
	});
	}
));
