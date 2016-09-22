var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = mongoose.model('Project');

var participationSchema = new mongoose.Schema({
  projectID: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
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
  accepted: Boolean,
  rejected: Boolean,
  comments: {
    type: [String],
    default: []
  }
});

participationSchema.methods.acceptPhase = function(){
  Project.findById(this.projectID).exec(function(err, project){
    if (err){
      throw new Error("Server Error");
    }
    else{
      console.log("length "+project.selectionPhases.length);
      console.log(this.phaseIndex);
      console.log(this.phaseIndex < project.selectionPhases.length);
      if(this.phaseIndex < project.selectionPhases.length){
        this.phaseIndex++;
      }
      else{
        if(this.phaseIndex === project.selectionPhases.length){
          this.accepted = true;
          this.rejected = false;
        }
        else{
          throw new Error("Already accepted");
        }
      }
    }
  });
}
participationSchema.methods.resetAcceptance = function(){
  this.accepted = false;
  this.rejected = false;
}

participationSchema.methods.addComment = function(comment){
  this.comments.push(comment);
}

participationSchema.methods.rejectParticipant = function(){
  this.rejected = true;
  this.accepted = false;
}

mongoose.model('Participation', participationSchema);
