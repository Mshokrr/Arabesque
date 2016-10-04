app.controller('createInterviewSlotCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.member = ($scope.user.level > 1);
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.project = MainSrv.getSelectedProject();

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.project === undefined) {
      $location.url("/");
    }
  })();

  $scope.phases = {
    selected : null,
    options : $scope.project.selectionPhases
  }

  $scope.checkFields = function(){
    $scope.errShow = false;
    $scope.success = false;
    var flag = false;
    if($scope.phases.selected === null){
      flag  = true;
      $scope.error = "Please specify the selection phase";
    }
    if($scope.date === undefined){
      flag = true;
      $scope.error = "Please specify the date of the slot";
    }
    if($scope.info === undefined || $scope.info === ""){
      flag = true;
      $scope.error = "Please add information to this slot, time and location should be in the information for guidance";
    }
    if($scope.capacity === undefined || $scope.capacity < 1){
      flag = true;
      $scope.error = "Please specify the capacity of this slot";
    }
    return flag;
  }

  $scope.createSlot = function(){
    $scope.errShow = $scope.checkFields();
    if(!$scope.errShow){
      profileData.createInterviewSlot($scope.project, $scope.phases.selected, $scope.date, $scope.info, $scope.capacity)
      .success(function(){
        $scope.success = true;
      })
      .error(function(err){
        console.log(err);
        $scope.errShow = true;
        $scope.error = err.message;
      });
    }
  }

  $scope.back = function(){
    $location.url('/projects');
  }

});
