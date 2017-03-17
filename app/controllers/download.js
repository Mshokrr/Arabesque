var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Participation = mongoose.model('Participation');
var InterviewSlot = mongoose.model('InterviewSlot');
var json2csv = require('json2csv');
var fs = require('fs');

module.exports.downloadUsersList = function(req, res){
  var fields = ['mobileNumber', 'level', 'firstName', 'lastName', 'email', 'address', 'university', 'faculty', 'academicYear'];
  User.find({ level: { $lt: 4 }}, function(err, results){
      if(err){
          console.log(err);
          res.status(500).json(err);
      }
      if (results) {
        var csv = json2csv({ data: results, fields: fields });
        fs.writeFile('downloads/users.csv', csv, function(err) {
          if (err) {
            res.status(500).json(err);
          }
          else{
            res.download('downloads/users.csv');
          }
      });
    }
  });
}

module.exports.downloadParticipations = function(req, res){
  var fields = ['mobileNumber', 'name', 'email', 'academicYear', 'selectionPhase', 'firstPref', 'secondPref', 'workshop', 'status'];
  Participation.find({ projectName : req.params.projectName }, function(err, results){
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    else{
      var participationJSON = [];
      for (var i = 0; i < results.length; i++){
        participationJSON[i] = {};
        participationJSON[i].mobileNumber = results[i].userMobileNumber;
        participationJSON[i].name = results[i].userName;
        participationJSON[i].email = results[i].userEmail;
        participationJSON[i].academicYear = results[i].userAcademicYear;
        participationJSON[i].selectionPhase = results[i].selectionPhases[results[i].phaseIndex];
        participationJSON[i].firstPref = results[i].workshop.prefs[0];
        participationJSON[i].secondPref = results[i].workshop.prefs[1];
        if(results[i].workshop.selected === null){
          participationJSON[i].workshop = "Not assigned";
        }
        else{
          participationJSON[i].workshop = results[i].workshop.selected;
        }
        participationJSON[i].workshop = results[i].workshop.selected;
        if(results[i].accepted){
          participationJSON[i].status = "Accepted";
        }
        else{
          if(results[i].rejected){
            participationJSON[i].status = "Rejected";
          }
          else{
            participationJSON[i].status = "Pending";
          }
        }
        console.log(participationJSON[i]);
      }
      var csv = json2csv({ data: participationJSON, fields: fields });
      fs.writeFile('downloads/'+req.params.projectName+'.csv', csv, function(err) {
        if (err) {
          res.status(500).json(err);
        }
        else{
          res.download('downloads/'+req.params.projectName+'.csv');
        }
      });
    }
  });
}

module.exports.downloadInterviewReservations = function(req, res){
  var fields = ['name', 'mobileNumber', 'email', 'academicYear'];
  Participation.find( { interviewSlot : req.params.slotID }, function(err, results){
    if(err){
      console.log(err);
      res.status(500).json(err);
    }
    if(results){
      console.log(results);
      var resultsJSON = [];
      for(var i = 0; i < results.length; i++){
        resultsJSON[i] = {
          "name" : results[i].userName,
          "mobileNumber" : results[i].userMobileNumber,
          "email" : results[i].userEmail,
          "academicYear" : results.userAcademicYear
        }
      }
      var csv = json2csv({ data: resultsJSON, fields: fields });
      fs.writeFile('downloads/'+req.params.slotID+'.csv', csv, function(err) {
        if (err) {
          res.status(500).json(err);
        }
        else{
          res.download('downloads/'+req.params.slotID+'.csv');
        }
    });
    }
  });

}
