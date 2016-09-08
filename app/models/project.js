var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
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

projectSchema.methods.turnOff = function(){
  if(this.isOn === false){
    throw Error("Project is already off");
  }
  else{
    this.isOn = false;
  }
}

projectSchema.methods.turnOn = function(){
  if(this.isOn === true){
    throw Error("Project is already on");
  }
  else{
    this.isOn = true;
  }
}

mongoose.model('Project', projectSchema);
