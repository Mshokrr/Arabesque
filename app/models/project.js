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

projectSchema.methods.turnOff = function(){
  if(this.isOn === false){
    throw Error("Project is already off");
  }
  else{
    this.isOn = false;
    this.save();
  }
}

projectSchema.methods.turnOn = function(){
  if(this.isOn === true){
    throw Error("Project is already on");
  }
  else{
    this.isOn = true;
    this.save();
  }
}

mongoose.model('Project', projectSchema);
