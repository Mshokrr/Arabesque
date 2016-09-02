var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
  userName: String,
  title: String,
  text: String,
  viewers: {
    type: String,
    enum: ['public', 'private', 'members', 'admins']
  }
});

newsSchema.methods.setText = function(text){
  this.text = text;
}

newsSchema.methods.setViewers = function(viewers){
  this.viewers = viewers;
}

mongoose.model('News', newsSchema);
