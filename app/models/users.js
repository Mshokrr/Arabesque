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
		type: String
	},
	level: Number,
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function (password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}
userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return (this.hash === hash);
}
userSchema.methods.changePassword = function(oldPassword, password){
	console.log("-> HASH: "+this.hash);
	if (!this.validPassword(oldPassword)){
		throw err;
	}
	else {
		this.setPassword(password);
		console.log("-> HASH: "+this.hash);
		this.save();
	}
}
userSchema.methods.resetPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	this.save();
}
userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		mobileNumber: this.mobileNumber,
		level: this.level,
		// The following fields should not be included in the jwt
		// firstName: this.firstName,
		// lastName: this.lastName,
		// email: this.email,
		// address: this.address,
		// university: this.university,
		// faculty: this.faculty,
		// academicYear: this.academicYear,
		exp: parseInt(expiry.getTime() / 1000),

	}, process.env.JWTSECRET);
}

mongoose.model('User', userSchema);
