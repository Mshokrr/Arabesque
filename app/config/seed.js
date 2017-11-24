var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Participation = mongoose.model('Participation');

var users = require('../data/users.json');
var orchestra = require('../data/orchestra18_updated.json');

module.exports.seedUsers = function(req, res){
  for (var i = 0; i < users.length; i++){
    var user = new User();
    user.mobileNumber = "0" + users[i].mobileNumber.toString();
    user.level = 1;
    user.setPassword("123456");
    var nameArray = users[i].name.split(" ");
    var firstName = nameArray[0];
    var lastNameArray = nameArray.slice(1, nameArray.length);
    var lastName = lastNameArray.join(" ");
    user.firstName = firstName;
    if(lastName === undefined || lastName === ""){
      user.lastName = " ";
    }
    else{
      user.lastName = lastName;
    }
    user.email = users[i].email;
    user.save(function(err){
      if(err){
        console.log(err);
      }
    });
  }
  res.status(200).json({
    "message" : "done"
  });
}

function addUserAccount(array, index){
  if (index == 0){
    console.log("done adding!");
    return;
  }
  else {
    console.log("index: " + index);
    var mobileNumber = "0" + orchestra[index].mobileNumber.toString();
    User.findOne({mobileNumber : mobileNumber}, function(err, result){
      if (err) {
        console.log("err in db");
        return;
      }
      if (result) {
        console.log("user already exists");
        addUserAccount(array, index - 1);
      }
      else {
        console.log("adding user");
        var user = new User();
        user.mobileNumber = mobileNumber;
        user.level = 1;
        user.setPassword("123456");
        var nameArray = orchestra[index].name.split(" ");
        var firstName = nameArray[0];
        var lastNameArray = nameArray.slice(1, nameArray.length);
        var lastName = lastNameArray.join(" ");
        user.firstName = firstName;
        if(lastName === undefined || lastName === ""){
          user.lastName = " ";
        }
        else{
          user.lastName = lastName;
        }
        user.email = orchestra[index].email;
        user.save(function(err){
          if(err){
            console.log("error adding user");
            console.log(err);
            addUserAccount(array, index - 1);
          }
          else {
            console.log("added user");
            addUserAccount(array, index - 1);
          }
        });
      }
    });
  }
}

function seedOrchestraPartcipants(index){
  if (index == 0){
    console.log("done adding participants");
    return;
  }
  else {
    console.log("index: " + index);
    var mobileNumber = "0" + orchestra[index].mobileNumber.toString();
    User.findOne({mobileNumber : mobileNumber}, function(err, user){
      if (err) {
        console.log("error in db");
        seedOrchestraPartcipants(index - 1);
      }
      if (user){
        Participation.find({ projectID : "5a11e208e9cc6442245dc65c" , userID : user._id }, function(err, results){
          if (err){
            console.log("error in db");
            seedOrchestraPartcipants(index - 1);
          }
          if (results) {
            console.log("already a participant");
            seedOrchestraPartcipants(index - 1);
          }
          else {
            Project.findById("5a11e208e9cc6442245dc65c").exec(function(err, project){
              if (err){
                console.log("error in db");
                seedOrchestraPartcipants(index - 1);
              }
              else {
                var participant = new Participation();
                participant.projectID = project._id;
                participant.projectName = project.name;
                participant.userID = user._id;
                participant.userMobileNumber = user.mobileNumber;
                participant.userName = user.firstName + " " + user.lastName;
                participant.userEmail = user.email;
                participant.userLevel = user.level;
                participant.selectionPhases = project.selectionPhases;
                participant.workshopNaming = project.workshopNaming;
                if((orchestra[index].firstPreference !== undefined && orchestra[index].secondPreference !== undefined)
                && (orchestra[index].firstPreference !== null && orchestra[index].secondPreference !== null)
                && (orchestra[index].firstPreference !== "" && orchestra[index].secondPreference !== "")){
  								participant.workshop = {};
  								participant.workshop.prefs = [];
  								participant.workshop.selected = null;
  								participant.workshop.prefs.push(orchestra[index].firstPreference);
  								participant.workshop.prefs.push(orchestra[index].secondPreference);
  								participant.workshop.all = Array.from(new Set(project.firstPrefWorkshops.concat(project.secondPrefWorkshops)));
  							}
  							else{
  								participant.workshop = null;
  							}
                participant.phaseIndex = 0;
                participant.userAcademicYear = user.academicYear;
                participant.save(function(err){
  								if(err){
  									console.log("error in db");
                    seedOrchestraPartcipants(index - 1);
  								}
  								else{
  									console.log("Success");
                    seedOrchestraPartcipants(index - 1);
  								}
  							});
              }
            });
          }
        });
      }
      else {
        console.log("user not found");
        seedOrchestraPartcipants(index - 1);
      }
    });
  }
}

module.exports.addAccounts = function(req, res){
  addUserAccount(orchestra, orchestra.length - 1);
  res.status(200).json({
    "message" : "done"
  });
}

module.exports.addOrchestraParticipants = function(req, res){
  seedOrchestraPartcipants(orchestra, orchestra.length - 1);
  res.status(200).json({
    "message" : "done"
  });
}
