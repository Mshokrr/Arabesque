var mongoose = require('mongoose');
var User = mongoose.model('User');
var News = mongoose.model('News');
var Project = mongoose.model('Project');

module.exports.resetPassword = function(req, res){

    var nonAdminUserMobileNumber = req.body.mobileNumber;

    console.log("-> ADMIN: Setting Password for "+nonAdminUserMobileNumber);

    if(req.payload.level < 3){
      res.status(401).json({
        "message" : "UnauthorizedError: You are not an admin"
      })
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
    })
  }
  else {
    var projectName = req.body.projectName;
    var projectDescription = req.body.projectDescription;
    var selectionPhases = req.body.selectionPhases;
    var project = new Project();
    project.name = projectName;
    project.description = projectDescription;
    project.selectionPhases = selectionPhases;
    project.selectionPhases.push("accepted");

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
    })
  }
  else {
    Project.findById(req.body.projectID).exec(function(err, project){
      if(err){
        console.log(err);
        res.status(500).json(err);
      }
      else{
        var newName = req.body.projectName;
        var newDescription = req.body.projectDescription;
        var newSelectionPhases = req.body.selectionPhases;
        project.name = newName;
        project.description = newDescription;
        project.selectionPhases = newSelectionPhases;
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

module.exports.getAllProjects = function(req, res){

  if(req.payload.level < 3){
    res.status(401).json({
      "message" : "UnauthorizedError: You are not an admin"
    })
  }
  else {
    console.log("-> Getting Projects");
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
