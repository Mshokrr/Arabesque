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
  nextPhase: String,
  rejected: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Participation', participationSchema);
