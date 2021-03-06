var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function (req, res) {

    User.findOne({mobileNumber : req.body.mobileNumber}, function(err, result) {
        if(err){
            res.status(500).json({
                "message" : "An error occured in the database, please contact the technical team"
            });
        }
        if(result){
            console.log(result);
            console.log("-> ERR! User already Exists");
            res.status(401).json({
                "message" : "User already exists"
            });
        }

        else{
            var user = new User();
            user.mobileNumber = req.body.mobileNumber;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.address = req.body.address;
            user.university = req.body.university;
            user.faculty = req.body.faculty;
            user.academicYear = req.body.academicYear;
            user.level = 1;
            user.setPassword(req.body.password);

            user.save(function(err){
                if(err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                else{
                    var token;
                    token = user.generateJwt();
                    console.log(token);
                    res.status(200);
                    res.json({
                        "token": token
                    });
                }
            });
        }
    });
}

module.exports.checkAvailableUser = function(req, res){
  User.findOne({mobileNumber : req.params.mobileNumber}, function(err, result){
    if(err){
      res.status(500).json({
          "message" : "An error occured in the database, please contact the technical team"
      });
    }
    if(result){
      res.status(401).json({
          "message" : "User already exists"
      });
    }
    else {
      res.status(200).json({
        "message" : "Mobile number available for registering"
      });
    }
  });
}

module.exports.login = function (req, res){

    passport.authenticate('local', function(err, user, info){
        var token;
        if(err){
            res.status(404).json(err);
            return;
        }
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }
        else {
            res.status(401).json(info);
        }
    })(req, res);
}
