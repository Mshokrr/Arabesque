var mongoose = require('mongoose');

var orchestraSchema = new mongoose.Schema({

  mobileNumber: {
    type: String,
    ref: 'User',
    unique: true
  },
  selectionPhase: {
    type: String,
    enum: ['audition', 'interview', 'participant']
  }

});

orchestraSchema.methods.acceptPhase = function(){
  if(this.selectionPhase === 'audition'){
    this.selectionPhase === 'interview';
  }
  if(this.selectionPhase === 'interview'){
    this.selectionPhase === 'participant';
  }
  if (this.selectionPhase === 'participant'){
    throw(new Error("This user is already a participant"));
  }
}

mongoose.model('Orchestra', orchestraSchema);
