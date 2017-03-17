app.controller('adminCtrl', function($scope, profileData){

  $(document).ready(function(){
    $('.modal').modal();
    // $('select').material_select();
  });

  $scope.postNews = function(){
    $scope.titleEmpty = false;
    $scope.contentEmpty = false;
    $scope.viewersEmpty = false;
    $('#postNewsModal').modal('open');
  }

  var checkNewsFields = function(){
    $scope.titleEmpty = false;
    $scope.contentEmpty = false;
    $scope.viewersEmpty = false;
    var flag = false;
    if($scope.newsTitle === undefined){
      $scope.titleEmpty = true;
      flag = true;
    }
    if($scope.newsContent === undefined){
      $scope.contentEmpty = true;
      flag = true;
    }
    if($scope.viewersData.selected === null){
      flag = true;
      $scope.viewersEmpty = true;
    }
    return flag;
  }

  $scope.savePostNews = function(){
    if(!checkNewsFields()){
      profileData.postNews($scope.newsTitle, $scope.newsContent, $scope.viewersData.selected)
      .error(function(err){
        console.log(err);
      })
      .success(function(){
        $('#postNewsModal').modal('close');
        $scope.postNewsSucess = true;
        $scope.titleEmpty = false;
        $scope.contentEmpty = false;
      });
    }
  }

  $scope.viewersData = {
    selected : null,
    options : [
      {level: '0', name: 'Public'},
      {level: '1', name: 'Private'},
      {level: '2', name: 'Members'},
      {level: '3', name: 'Admins'}
    ]
  };

  $scope.changeLevel = function(){
    $scope.userMobileNumber = "";
    $scope.userLevel = 1;
    $scope.mobileNumberInvalid = false;
    $('#changeLevelModal').modal('open');
  }

  $scope.saveChangeLevel = function(){
    if(isNaN($scope.userMobileNumber) || $scope.userMobileNumber.length !== 11 ||
      $scope.userMobileNumber.substring(0,2) !== "01"){
        $scope.mobileNumberInvalid = true;
    }
    else{
      profileData.changeLevel($scope.userMobileNumber, $scope.userLevel)
      .success(function(){
        $('#changeLevelModal').modal('close');
      })
      .error(function(err){
        console.log(err);
      });
    }
  }

});
