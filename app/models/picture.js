var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pictureSchema = new mongoose.Schema({

  uploaderID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  uploaderName: {type: String, required: true},

  img: {

    filepath: String,
    filename: String,
    size: Number,
    type: String

  },

  description: String,
  dateUploaded: String,

  //the gallery where the picture is going to be stored/viewed
  gallery: {
    galleryID: {type: Schema.Types.ObjectId, ref: "Gallery", required: true},
    galleryName: String
  }

});

mongoose.model('Picture', pictureSchema);
