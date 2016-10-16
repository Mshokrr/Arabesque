var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Participation = mongoose.model('Participation');
var InterviewSlot = mongoose.model('InterviewSlot');

module.exports.usersList = function(req, res){
    if(req.payload.level < 2){
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
            res.send(results);
        }
      });
    }
}

module.exports.getParticipants = function(req, res){
  if (req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else{
    Participation.find({ projectID : req.params.projectID }, function(err, results){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.send(results);
      }
    });
  }
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
        try{
          if(participation.phaseIndex < participation.selectionPhases.length - 1){
            participation.phaseIndex++;
          }
          else{
            if(participation.phaseIndex === participation.selectionPhases.length - 1){
              participation.accepted = true;
              participation.rejected = false;
            }
          }
          participation.clearInterviewSlot();
          participation.interviewSlot = null;
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
        catch(err){
          console.log(err);
          res.status(500).json(err);
        }
      }
    });
  }
}

module.exports.resetAcceptance = function(req, res){
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
        participation.resetAcceptance();
        participation.interviewSlot = null;
        participation.save(function(err){
          if(err){
            console.log(err);
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Undone"
            });
          }
        });
      }
    });
  }
}

module.exports.setWorkshop = function(req, res){
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
        participation.workshop.selected = req.body.workshop;
        participation.markModified('workshop');
        participation.save(function(err){
          if(err){
            console.log(err);
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Workshop set"
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
        participation.interviewSlot = null;
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
        participation.addComment(req.body.userName, req.body.comment);
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

module.exports.createInterviewSlot = function(req, res){
  if(req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else {
    var interview = new InterviewSlot();
    interview.projectID = req.body.projectID;
    interview.projectName = req.body.projectName;
    interview.phaseName = req.body.phaseName;
    interview.date = req.body.date;
    interview.info = req.body.info;
    interview.capacity = req.body.capacity;
    interview.save(function(err){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.status(200).json({
          "message" : "Slot created"
        });
      }
    });
  }
}

module.exports.getInterviewSlots = function(req, res){
  if(req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else{
    InterviewSlot.find({ projectID : req.params.projectID }, function(err, results){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.send(results);
      }
    });
    }
}

module.exports.deleteSlot = function(req, res){
  if(req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else{
    InterviewSlot.findById(req.body.slotID).exec(function(err, slot){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        Participation.find({ interviewSlot : req.body.slotID }, function(err, results){
          if(err){
            console.log(err);
            res.status(500).json(err);
          }
          else{
            for (var i = 0; i < results.length; i++){
              results[i].interviewSlot = null;
              results[i].save();
            }
          }
        });
        slot.remove();
        res.status(200).json({
          "message" : "Success"
        });
      }
    });
  }
}

module.exports.getReservations = function(req, res){
  if(req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else{
    Participation.find( { interviewSlot : req.params.slotID }, function(err, results){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.send(results);
      }
    });
  }
}

module.exports.editInterviewSlot = function(req, res){
  console.log("attempt to edit");
  if(req.payload.level < 2){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not a member"
    });
  }
  else{
    InterviewSlot.findById(req.body.slotID).exec(function(err, slot){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        slot.date = req.body.date;
        slot.info = req.body.info;
        slot.capacity = req.body.capacity;
        slot.save(function(err){
          if(err){
            console.log(err);
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Edit successful"
            });
          }
        });
      }
    });
  }
}
