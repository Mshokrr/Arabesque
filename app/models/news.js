var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
  userName: String,
  title: String,
  text: String,
  viewerLevel: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

newsSchema.methods.setText = function(text){
  this.text = text;
}

newsSchema.methods.setViewers = function(viewerlevel){
  this.viewerLevel = viewerLevel;
}

mongoose.model('News', newsSchema);
