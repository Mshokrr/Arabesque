var mongoose = require('mongoose');


var pictureSchema = new mongoose.Schema({

  uploaderID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  uploaderName: {type: String, ref: 'User', required: true},
  img: {data: Buffer, contentType: String},
  description: String,
  dateUploaded: Date


});


pictureSchema.methods.uploadPicture = function(galleryName, picture){



}

mongoose.model('Picture', pictureSchema);
