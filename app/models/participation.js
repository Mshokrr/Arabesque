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
  selectionPhase: String,
  rejected: {
    type: Boolean,
    default: false
  },
  comments: {
    type: [String],
    default: []
  }
});

mongoose.model('Participation', participationSchema);
