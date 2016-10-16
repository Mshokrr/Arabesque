var mongoose = require('mongoose');
var Picture  = mongoose.model('Picture');
var Gallery = mongoose.model('Gallery');
var moment  = require('moment-timezone');
var fs = require('file-system');


module.exports.uploadPicture = function(req, res){

  console.log('server controller works');

  console.log(req.body);
  //parse request and extract relevant data


  // var galleryName = data.gallery.galleryName;
  // var userLevel = data.user.level;
  // var userName = data.user.firstName + " " + data.user.lastName;
  // var userID = data.user._id;
  // var desc = data.description;
  // var galleryInfo = data.gallery;

  //only allow level 3 users to upload pictures
  if(userLevel === 3){

    var uploadedImage = new Picture();

    uploadedImage.uploaderID = userID;
    uploadedImage.uploaderName = userName;
    uploadedImage.description = desc;
    uploadedImage.dateUploaded = moment().tz("Africa/Cairo").format();
    uploadedImage.gallery = galleryInfo;

    //test values
    //wil complete once post req works
    uploadedImage.img = {

      filepath: "",
      filename: "",
      size: 1,
      type: ""

    };

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
