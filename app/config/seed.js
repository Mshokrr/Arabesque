var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

var usersConfig = require('./usersDatabaseConfig.js');
var users = require('../data/users.json');

module.exports.seedUsers = function(req, res){

  for (var i = 0; i < users.length; i++){
    var user = new User();
    user.mobileNumber = users[i].mobileNumber;
    user.setPassword("123456");
    user.level = users[i].level;
    user.firstName = users[i].firstName;
    user.lastName = users[i].lastName;
    user.email = users[i].email;
    user.address = users[i].address;
    user.university = users[i].university;
    user.faculty = users[i].faculty;
    user.academicYear = users[i].academicYear;
    user.save(function(err){
      if(err){
        console.log(err);
        res.status(500).json(err);
        return;
      }
    });
  }
  res.send(users);
}

module.exports.seedProjects = function(req, res){

}
