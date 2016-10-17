var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

var users = require('../data/users.json');

module.exports.seedUsers = function(req, res){
  for (var i = 0; i < users.length; i++){
    var user = {};
    //var user = new User();
    user.mobileNumber = "0" + users[i].mobileNumber.toString();
    user.level = 1;
    var nameArray = users[i].name.split(" ");
    var firstName = nameArray[0];
    var lastNameArray = nameArray.slice(1, nameArray.length);
    var lastName = lastNameArray.join(" ");
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = users[i].email;
  }
  res.status(200).json({
    "message" : "done"
  });
}
