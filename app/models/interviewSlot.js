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

mongoose.model('InterviewSlot', interviewSlotSchema);
