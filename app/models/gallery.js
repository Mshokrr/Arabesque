var mongoose = require('mongoose');
var moment = require('moment-timezone');
var Schema = mongoose.Schema;

var gallerySchema = new mongoose.Schema({

  galleryName: {type: String, required: true},
  createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  pictures: [ {type: Schema.Types.ObjectId, ref: 'Picture'} ],
  size: {type: Number, default: 0, min: 0},
  lastUpdated: String //string because timezone lib returns strings

});


gallerySchema.methods.addPicture = function(image){

  console.log('Image ' + image._id + 'added to gallery');
  this.pictures.push(image._id);
  this.size++;
  this.lastUpdated = moment().tz("Africa/Cairo").format();
}


gallerySchema.methods.deletePicture = function(image){

  this.size--;
  this.lastUpdated = moment().tz("Africa/Cairo").format();
}

mongoose.model('Gallery', gallerySchema);
