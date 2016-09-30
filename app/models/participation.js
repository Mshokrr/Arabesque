var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = mongoose.model('Project');

var participationSchema = new mongoose.Schema({
  projectID: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  interviewSlot: {
    type: Schema.Types.ObjectId,
    ref: 'InterviewSlot'
  },
  projectName: {
    type: String,
    ref: 'Project',
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userMobileNumber: {
    type: String,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    ref: 'User'
  },
  userEmail: {
    type: String,
    ref: 'User'
  },
  userLevel: Number,
  selectionPhases: [String],
  phaseIndex: Number,
  workshop: Object,
  accepted: Boolean,
  rejected: Boolean,
  comments: {
    type: [String],
    default: []
  }
});

participationSchema.methods.resetAcceptance = function(){
  this.accepted = false;
  this.rejected = false;
}

participationSchema.methods.addComment = function(userName, comment){
  this.comments.push(userName + " - " + comment);
}

participationSchema.methods.rejectParticipant = function(){
  this.rejected = true;
  this.accepted = false;
}

mongoose.model('Participation', participationSchema);
