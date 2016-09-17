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
  selectionPhase: String,
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
      var index = project.selectionPhases.indexOf(this.selectionPhase);
      if(project.selectionPhases.length === index){
        this.accepted = true;
        this.rejected = false;
      }
      else{
        this.selectionPhase = project.selectionPhases[index+1];
      }
    }
  });
}

participationSchema.methods.addComment = function(comment){
  this.comments.push(comment);
}

participationSchema.methods.rejectParticipant = function(){
  this.rejected = true;
  this.accepted = false;
}

mongoose.model('Participation', participationSchema);
