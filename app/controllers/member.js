var mongoose = require('mongoose');
var User = mongoose.model('User');
var Participation = mongoose.model('Participation');

module.exports.usersList = function(req, res){
    var memberLevel = req.payload.level;
    if(memberLevel < 2){
      res.status(401).json({
        "message" : "UnauthorizedError: You are not a member"
      });
    }
    else{
      User.find({ level: { $lt: 4 }}, function(err, results){
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

module.exports.acceptPhase = function(req, res){
  if (req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else{
    Participation.findById(req.body.participationID).exec(function(err, participation){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        participation.acceptPhase();
        participation.save(function(err){
          if(err){
            console.log(err);
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Accepted"
            });
          }
        });
      }
    });
  }
}

module.exports.rejectParticipant = function(req, res){
  if (req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else{
    Participation.findById(req.body.participationID).exec(function(err, participation){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        participation.rejectParticipant();
        participation.save(function(err){
          if(err){
            console.log(err);
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Rejected"
            });
          }
        });
      }
    });
  }
}

module.exports.addComment = function(req, res){
  if (req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else{
    Participation.findById(req.body.participationID).exec(function(err, participation){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        participation.addComment(req.body.comment);
        participation.save(function(err){
          if(err){
            console.log(err);
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Comment added"
            });
          }
        });
      }
    });
  }
}
