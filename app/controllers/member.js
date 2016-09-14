var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.usersList = function(req, res){
    var memberLevel = req.payload.level;
    if(memberLevel < 2){
      res.status(401).json({
        "message" : "UnauthorizedError: You are not a member"
      });
    }
    else{
      User.find({ level: { $lt: memberLevel }}, function(err, results){
          if(err){
              console.log(err);
              res.status(500).json(err);
          }
          if (results) {
              console.log("-> Request for users list is granted");
              res.send(results);
          }
      });
    }
}

module.exports.downloadUsersList = function(req, res){
  // User.findAndStreamCsv({}).pipe(fs.createWriteStream('./arabesque-users.csv'));
}
