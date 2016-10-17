var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

var users = require('../data/users.json');

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
