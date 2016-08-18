var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getUsersList = function(req, res){
  User.find().toArray(function(err, users){
    if (err){
      console.log("mongoose detected error");
      console.log(err);
    }
    else {
      console.log(users);
      try{
        res.send(users);
      }
      catch(err){
        console.log(err);
      }
    }
  });
}
