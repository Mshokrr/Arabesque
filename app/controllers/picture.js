var mongoose = require('mongoose');
var Picture  = mongoose.model('Picture');
var Gallery = mongoose.model('Gallery');
var moment  = require('moment-timezone');
var fs = require('file-system');

// var multer = require('multer');

// var upload = multer({dest: '../../public/uploads'});

module.exports.uploadPicture = function(req, res){

  //parse request and extract relevant data
  var image = req.body.image;
  var galleryName = req.body.gallery.galleryName;
  var userLevel = req.body.user.level;
  var userName = req.body.user.firstName + " " + req.body.user.lastName;
  var userID = req.body.user._id;
  var desc = req.body.description;
  var galleryInfo = req.body.gallery;

  //only allow level 3 users to upload pictures
  if(userLevel === 3){

    var uploadedImage = new Picture();

    uploadedImage.uploaderID = userID;
    uploadedImage.uploaderName = userName;
    uploadedImage.description = desc;
    uploadedImage.dateUploaded = moment().tz("Africa/Cairo").format();
    uploadedImage.gallery = galleryInfo;

    //image path here
    uploadedImage.img.data = fs.readFileSync();
    uploadedImage.img.contentType = "image/" + req.body.filename.split('.').pop(); //gets img extension

    //save image to the pictures collection
    uploadedImage.save();

    //add the image ID to the gallery
    Gallery.findById(galleryInfo.galleryID, function(error, res){

      if(error){
        console.log(error);
      }

      else{
        res.addPicture(uploadedImage);
      }

    });



  }

  else{
    console.log('User not allowed to upload photos');
  }
}
