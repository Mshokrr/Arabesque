var mongoose = require('mongoose');

var leagueSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    ref: 'User',
    unique: true
  },
  selectionPhase: {
    type: String,
    enum: ['test', 'discussion', 'participant']
  }
});

orchestraSchema.methods.acceptPhase(){
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

mongoose.model('League', leagueSchema);
