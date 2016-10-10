app.controller('editInterviewSlotCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.member = ($scope.user.level > 1);
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.slot = MainSrv.getSelectedSlot();

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.slot === undefined) {
      $location.url("/");
    }
  })();

  var refresh = function(){
      profileData.getInterviewSlotById($scope.slot._id)
      .success(function(slot){
        $scope.slot = slot;
      })
      .error(function(err){
        console.log(err);
        $scope.error = err.message;
      });
  }

  refresh();

  $scope.checkFields = function(){
    var flag = false;
    $scope.error = "";
    $scope.success = false;
    if($scope.newDate === undefined){
      $scope.error = "Please specify the new date";
      flag = true;
    }
    if($scope.newInfo === undefined || $scope.newInfo === ""){
      $scope.error = "Please add information to this slot, time and location should be in the information for guidance";
      flag = true;
    }
    if($scope.newCapacity === undefined){
      $scope.error = "Please specify how many places left in this slot";
      flag = true;
    }
    return flag;
  }

  $scope.save = function(){
    if(!$scope.checkFields()){
      profileData.editInterviewSlot($scope.slot._id, $scope.newDate, $scope.newInfo, $scope.newCapacity)
      .success(function(){
        $scope.success = true;
        refresh();
      })
      .error(function(err){
        console.log(err);
        $scope.error = err.message;
      });
    }
  }

  $scope.back = function(){
    $location.url('/manageInterviewSlots');
  }

});
