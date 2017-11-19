var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

var users = require('../data/users.json');
var orchestra = require('../data/orchestra18.json');


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

module.exports.addAccounts = function(req, res){
  addUserAccount(orchestra, orchestra.length - 1);
  res.status(200).json({
    "message" : "done"
  });
}
