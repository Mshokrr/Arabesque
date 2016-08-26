var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gallerySchema = new mongoose.Schema({

  galleryName: {type: String, required: true},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  pictures: [ {type: Schema.Types.ObjectId, ref: 'Picture'} ],
  size: {type: Number, default: 0, min: 0},
  lastUpdated: Date

});


gallerySchema.methods.addPicture = function(image){

  console.log(image._id);
  pictures.push(image._id);
  this.size++;
  this.lastUpdated = new Date();
}


gallerySchema.methods.deletePicture = function(image){

  this.size--;
  this.lastUpdated = new Date();
}

mongoose.model('Gallery', gallerySchema);
