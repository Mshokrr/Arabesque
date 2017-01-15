var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongooseToCsv = require('mongoose-to-csv');

var userSchema = new mongoose.Schema({

    mobileNumber: {
        type: String,
        unique: true,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
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
    if (!this.validPassword(oldPassword)){
        throw err;
    }
    else {
        this.setPassword(password);
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
        firstName: this.firstName,
        lastName: this.lastName,
        // The following fields should not be included in the jwt
        // email: this.email,
        // address: this.address,
        // university: this.university,
        // faculty: this.faculty,
        // academicYear: this.academicYear,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWTSECRET);
}

userSchema.methods.changeLevel = function(level){
    if(level > 3 || level < 1) {
      throw new Error("Invalid level");
    }
    else{
      this.level = level ;
      this.save();
    }
}

userSchema.plugin(mongooseToCsv, {
  headers: 'FirstName LastName MobileNumber Email Level Address University Faculty AcademicYear',
  constraints: {
    'FirstName' : 'firstName',
    'LastName' : 'lastName',
    'MobileNumber' : 'mobileNumber',
    'Email' : 'email',
    'Level' : 'level',
    'Address' : 'address',
    'University' : 'university',
    'Faculty' : 'faculty',
    'AcademicYear' : 'academicYear'
  }
});

mongoose.model('User', userSchema);
