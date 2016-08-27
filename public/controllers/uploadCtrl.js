app.controller('uploadCtrl', function($scope, $location, $http){

  $scope.enableSubmitButton = false;
  $scope.fileSizeError = false;
  var selectedFiles = [];
  var maxAllowedFileSize = 15 * (1024 ** 2) // in bytes (is 15 MB too small?)

  //get files selected
  $scope.getFiles = function($files){

    //filter out pictures that are too large
    selectedFiles = $files.filter(function(a){
      return a.size < maxAllowedFileSize ;
    })

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

      console.dir(selectedFiles);


      //
      // var data =  {
      //
      //   image: selectedFiles[0],
      //
      //   user: {       //test values
      //     _id: 1342354,
      //     firstName: 'ayhaga',
      //     lastName: 'ayhagatanya',
      //     level: 3
      //   },
      //
      //   gallery: {
      //     galleryID: 213423,
      //     galleryName: 'aygallery'
      //   },
      //
      //   description: 'aydescription'
      //
      // }

      //why doesnt this get a response from server controller?
      $http.post('/api/upload', {name: 'yo'});



    }

  }

});
