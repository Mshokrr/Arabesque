var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('News');

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

module.exports.postNews = function(req, res){

  var news = new News();

  news.userName = req.body.firstName + " " + req.body.lastName;
  news.title = req.body.title;
  news.text = req.body.text;
  news.viewerLevel = req.body.viewerLevel;


  news.save(function(err){
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    else{
      res.status(200).json({
        "message" : "Posted successfully"
      });
    }
  });
}

module.exports.promoteUser = function(req, res){
    var userMobileNumber = req.body.mobileNumber;
    User.findOne({mobileNumber : userMobileNumber}, function(err, user){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            console.log(user);
            try{
                user.promote();
                res.status(200).json({
                    "message" : "Success"
                });
            }
            catch(err){
                res.status(401).json(err);
            }
        }
    });
}
