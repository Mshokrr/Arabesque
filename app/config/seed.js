var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');


module.exports.seedUsers = function(req, res){

  var oldUsers = require("../data/users.json");

  for (var i = 0; i < oldUsers.length; i++){
    var user = new User();
    user.mobileNumber = oldUsers[i].mobileNumber;
    user.setPassword(oldUsers[i].password);
    user.level = oldUsers[i].level;
    user.firstName = oldUsers[i].firstName;
    user.lastName = oldUsers[i].lastName;
    user.email = oldUsers[i].email;
    user.address = oldUsers[i].address;
    user.university = oldUsers[i].university;
    user.faculty = oldUsers[i].faculty;
    user.academicYear = oldUsers[i].academicYear;
    user.save(function(err){
      if(err){
        console.log(err);
        res.status(500).json(err);
        return;
      }
    });
  }
  res.send(oldUsers);
}

module.exports.seedProjects = function(req, res){

}
