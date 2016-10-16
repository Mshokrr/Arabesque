var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var InterviewSlot = mongoose.model('InterviewSlot');
var Project = mongoose.model('Project');

var participationSchema = new mongoose.Schema({
  projectID: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  interviewSlot: {
    type: Schema.Types.ObjectId,
    ref: 'InterviewSlot',
    default: null
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
  userAcademicYear: String,
  selectionPhases: [String],
  phaseIndex: Number,
  workshopNaming : String,
  workshop: Object,
  accepted: Boolean,
  rejected: Boolean,
  comments: {
    type: [String],
    default: []
  }
});

participationSchema.methods.clearInterviewSlot = function(){
  InterviewSlot.findById(this.interviewSlot).exec(function(err, slot){
    if(err){
      throw new Error("Invalid Slot");
    }
    else{
      slot.cancelReservation();
      slot.save();
    }
  });
}

participationSchema.methods.resetAcceptance = function(){
  this.accepted = false;
  this.rejected = false;
  this.clearInterviewSlot();
}

participationSchema.methods.addComment = function(userName, comment){
  this.comments.push(userName + " - " + comment);
}

participationSchema.methods.rejectParticipant = function(){
  this.rejected = true;
  this.accepted = false;
  this.clearInterviewSlot();
}

mongoose.model('Participation', participationSchema);
