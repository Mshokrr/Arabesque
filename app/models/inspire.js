var mongoose = require('mongoose');

var inspireSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    ref: 'User',
    unique: true
  },
  selectionPhase: {
    type: String,
    enum: ['pending', 'participant']
  }
});

inspireSchema.methods.acceptParticipant = function(){
    if (this.selectionPhase === 'pending'){
      this.selectionPhase = 'participant';
    }
    if (this.selectionPhase === 'participant'){
      throw(new Error("This user is already a participant"));
    }
}

mongoose.model('Inspire', inspireSchema);
