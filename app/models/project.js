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
  firstPrefWorkshops: {
    type: [String],
    default: []
  },
  secondPrefWorkshops: {
    type: [String],
    default: []
  },
  isOn: {
    type: Boolean,
    default: false
  }

});

projectSchema.methods.addPhase = function(phase){
  this.selectionPhases.push(phase);
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
