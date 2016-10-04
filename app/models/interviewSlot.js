var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interviewSlotSchema = mongoose.Schema({
  projectID : {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  projectName: {
    type: String,
    ref: 'Project'
  },
  phaseName: String,
  date: Date,
  info: String,
  capacity: Number
});


interviewSlotSchema.methods.reserve = function(){
  if(this.capacity <= 0){
    throw new Error("Sorry, this slot is full");
  }
  else{
    this.capacity--;
  }
}

interviewSlotSchema.methods.cancelReservation = function(){
  this.capacity++;
}

mongoose.model('InterviewSlot', interviewSlotSchema);
