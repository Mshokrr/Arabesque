var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interviewSchema = new mongoose.Schema({
  projectID: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  projectName: {
    type: String,
    ref: 'Project'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  phaseName: String,
  date: Date,
  capacity: Number,
  vacancies: Number
});

interviewSchema.methods.reserveSlot = function(userID){
  this.users.push(userID);
  this.vacancies --;
}

interviewSchema.methods.cancelReservation = function(userID){
  var index = this.users.indexOf(userID);
  this.users.splice(index, 1);
}

mongoose.model('Interview', interviewSchema);
