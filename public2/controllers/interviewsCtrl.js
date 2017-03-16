app.controller('interviewsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

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

  $scope.deleteSlot = function(slot){
    $scope.selectedSlot = slot;
    $('#confirmDeleteModal').modal('open');
  }

  $scope.editSlot = function(slot){
    $scope.selectedSlot = slot;
    $('#editSlotModal').modal('open');
  }

  $scope.reservations = function(slot){
    // $scope.selectedSlot = slot;
    // profileData.getReservations($scope.selectedSlot._id)
    // .success(function(data){
    //   $scope.reservations = data;
    //   $scope.noReservations = ($scope.reservations.length === 0);
    //   $('#reservationsModal').modal('open');
    // })
    // .error(function(err){
    //   console.log(err);
    // });
  }

  $scope.cancelReservation = function(reserver){
    profileData.cancelReservation(reserver._id)
    .success(function(){
      $('#reservationsModal').modal('close');
      $scope.reservations($scope.selectedSlot);
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.createSlot = function(){
    $('#createSlotModal').modal('open');
  }

  $scope.back = function(){
    $location.url('/projects');
  }

  $scope.confirmDeleteSlot = function(){
    profileData.deleteSlot($scope.selectedSlot._id)
    .success(function(){
      refresh();
      $('#confirmDeleteModal').modal('close');
    })
    .error(function(err){
      console.log(err);
    });
  }

});
