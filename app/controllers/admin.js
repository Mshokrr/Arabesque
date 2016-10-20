var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('News');
var Project = mongoose.model('Project');
var Participation = mongoose.model('Participation');

module.exports.resetPassword = function(req, res){

    var nonAdminUserMobileNumber = req.body.mobileNumber;

    console.log("-> ADMIN: Setting Password for "+nonAdminUserMobileNumber);

    if(req.payload.level < 3){
      res.status(401).json({
        "message" : "UnauthorizedError: You are not an admin"
      });
    }
    else {
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
}

module.exports.postNews = function(req, res){

  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }

  else{

    var news = new News();

    news.userName = req.payload.firstName + " " + req.payload.lastName;
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

}

module.exports.deleteNews = function(req, res){

  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else{
    News.findById(req.body.newsID).remove().exec(function(err){
      if (err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.status(200).json({
          "message" : "News deleted successfully"
        });
      }
    });
  }
}

module.exports.changeLevel = function(req, res){
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    })
  }
  else{
    var userMobileNumber = req.body.mobileNumber;
    var newLevel = req.body.level;
    User.findOne({mobileNumber : userMobileNumber}, function(err, user){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            try{
                user.changeLevel(newLevel);
                res.status(200).json({
                    "message" : "Success"
                });
            }
            catch(err){
                console.log(err);
                res.status(401).json(err);
            }
        }
    });
  }
}

module.exports.createProject = function(req, res){

  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else {
    var project = new Project();
    project.name = req.body.projectName;
    project.description = req.body.projectDescription;
    project.selectionPhases = req.body.selectionPhases;
    project.workshopNaming = req.body.workshopNaming;
    project.firstPrefWorkshops = req.body.workshops;
    project.secondPrefWorkshops = req.body.workshops;
    project.allWorkshops = req.body.workshops;

    project.save(function(err){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.status(200).json({
          "message" : "Project was created!"
        });
      }
    });
  }
}

module.exports.toggleProjectStatus = function(req, res){
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else {
    Project.findById(req.body.projectID).exec(function(err, project){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        project.toggleStatus();
        res.status(200).json({
          "message" : "Success"
        });
      }
    });
  }
}

module.exports.editProject = function(req, res){
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else {
    Project.findById(req.body.projectID).exec(function(err, project){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        var newDescription = req.body.projectDescription;
        project.description = newDescription;
        project.save(function(err){
          if(err){
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Success"
            });
          }
        });
      }
    });
  }
}

module.exports.addPhase = function(req, res){
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else{
    Project.findById(req.body.projectID).exec(function(err, project){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        project.addPhase(req.body.phase);
        project.save(function(err){
          if(err){
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Success"
            });
          }
        });
      }
    });
  }
}

module.exports.editWorkshops = function(req, res){
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else{
    Project.findById(req.body.projectID).exec(function(err, project){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        project.firstPrefWorkshops = req.body.firstPref;
        project.secondPrefWorkshops = req.body.secondPref;
        project.allWorkshops = project.allWorkshops.concat(req.body.firstPref);
        project.allWorkshops = project.allWorkshops.concat(req.body.secondPref);
        project.allWorkshops = Array.from(new Set(project.allWorkshops));
        project.save(function(err){
          if(err){
            console.log(err);
            res.status(500).json(err);
          }
          else{
            res.status(200).json({
              "message" : "Success"
            });
          }
        });
      }
    });
  }
}

module.exports.getAllProjects = function(req, res){
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else {
  	Project.find({}, function(err, projects){
  		if(err){
  			console.log(err);
  			res.status(500).json(err);
  		}
  		else{
  			res.send(projects);
  		}
  	});
  }
}

module.exports.clearComments = function(req, res){
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else {
    Participation.find({projectID : req.body.projectID}, function(err, results){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        for(var i = 0; i < results.length; i++){
          results[i].comments = [];
          results[i].save(function(err){
            if(err){
              console.log(err);
              res.status(500).json(err);
              return;
            }
          });
        }
        res.status(200).json({
          "message" : "Comments cleared"
        });
      }
    });
  }
}

module.exports.clearRejectedParticipants = function(req, res){
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else{
    Participation.remove({ projectID : req.body.projectID, accepted : false , rejected : true }, function(err){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        res.status(200).json({
          "message" : "Deleted successfully"
        });
      }
    });
  }
}

module.exports.rejectPendingParticipants = function(req, res){
  console.log("3");
  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    });
  }
  else{
    Participation.find({ projectID : req.body.projectID, accepted : false , rejected : false }, function(err, results){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        console.log(results);
        for (var i = 0; i < results.length; i++){
          results[i].rejected = true;
          results[i].save();
        }
        res.status(200).json({
          "message" : "Deleted successfully"
        });
      }
    });
  }
}
