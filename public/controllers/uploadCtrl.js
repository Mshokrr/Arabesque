app.controller('uploadCtrl', function($scope, Upload, $location, $http){

  $scope.enableSubmitButton = false;
  $scope.fileSizeError = false;
  var selectedFiles = [];
  var maxAllowedFileSize = 15 * (1024 ** 2) // in bytes (is 15 MB too small?)

  //get files selected
  $scope.getFiles = function($files){

    //filter out pictures that are too large
    selectedFiles = $files.filter(function(a){
      return a.size < maxAllowedFileSize;
    });

    //display warning that large files will not be uploaded
    $scope.fileSizeError = $files.length !== selectedFiles.length;

    //display upload button if there is a valid file to upload
    if(selectedFiles.length !== 0){
      $scope.enableSubmitButton = true;
    }

  }

  $scope.upload = function(){

    if($scope.enableSubmitButton){

      //disable to prevent clicking again
      $scope.enableSubmitButton = false;
      $scope.uploading =true;

      var file = selectedFiles[0];
      console.dir(file); //correctly logs image data

      //Post request is now being sent but the image object is empty for some reason

      $http.post('/api/upload', {
        test: "anystring",
        image: file
      });

      //$scope.uploading = false;

    }

  }

});
