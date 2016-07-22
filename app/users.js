var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	mobileNumber: {
		type: String,
		unique: true,
		required: true
	},
	firstName: {
		type: String,
		unique: true,
		required: true
	},
	lastName: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	address: {
		type: String
	},
	university: {
		type: String
	},
	faculty: {
		type: String
	},
	academicYear: {
		type: Number
	},
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function (password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}
userSchema.methods.validatePassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return (this.hash === hash);
}
userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		mobileNumber: this.mobileNumber,
		firstName: this.firstName,
		lastName: this.lastName,
		exp: parseInt(expiry.getTime() / 1000),

	}, process.env.JWTSECRET);
}

mongoose.model('User', userSchema);
