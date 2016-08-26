var mongoose = require('mongoose');
var Picture  = mongoose.model('Picture');
var fs = require('file-system');
var multer = require('multer');

// var upload = multer({dest: '../../public/uploads'});

module.exports.uploadPicture = function(req, res){

  var image = req.body.image;
  var galleryName = req.body.galleryName;
  var userLevel = req.body.user.level;
  var userName = req.body.user.firstName + " " + req.body.user.lastName;
  var userID = req.body.user.id;
  var desc = req.body.description;


  //only allow level 3 users to upload pictures
  if(userLevel === 3){

    var uploadedImage = new Picture();
    uploadedImage.uploaderID = userID;
    uploadedImage.uploaderName = userName;
    uploadedImage.description = desc;
    uploadedImage.dateUploaded = new Date();

  }

  else{
    console.log('User not allowed to upload photos');
  }
}
