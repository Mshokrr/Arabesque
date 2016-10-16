app.controller('manageInterviewSlotsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

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

  var refresh = function(){
    profileData.getAllInterviewSlots($scope.project._id)
    .success(function(data){
      $scope.slots = data;
      $scope.noSlots = ($scope.slots.length === 0);
    })
    .error(function(err){
      $scope.error = err.message;
    })
  }

  refresh();

  $scope.slotReservations = function(slot){
    MainSrv.setSelectedSlot(slot);
    $location.url('/slotReservations');
  }

  $scope.createSlot = function(){
    $location.url('/createInterviewSlot');
  }

  $scope.editSlot = function(slot){
    MainSrv.setSelectedSlot(slot);
    $location.url('/editInterviewSlot');
  }

  $scope.deleteSlot = function(slot){
    profileData.deleteSlot(slot._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
      $scope.error = err.message;
    });
  }

  $scope.back = function(){
    $location.url('/projects');
  }

});
