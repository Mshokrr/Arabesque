var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: String,
  selectionPhases: {
    type: [String],
    default: []
  },
  isOn: {
    type: Boolean,
    default: true
  }

});

projectSchema.methods.addPhase = function(selectionPhase){
  this.selectionPhases.push(selectionPhase);
}

projectSchema.methods.toggleStatus = function(){
  if(this.isOn === true){
    this.isOn = false;
  }
  else {
    this.isOn = true;
  }
  this.save();
}

mongoose.model('Project', projectSchema);
