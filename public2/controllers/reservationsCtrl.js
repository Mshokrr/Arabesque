app.controller('reservationsCtrl', function($scope, $location, profileData, MainSrv, AuthSrv){

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
      profileData.getReservations($scope.slot._id)
      .success(function(data){
        $scope.reservers = data;
        console.log(data);
        $scope.noReservers = ($scope.reservers.length === 0);
      })
      .error(function(err){
        console.log(err);
        $scope.error = err.message;
      });
    })
    .error(function(err){
      console.log(err);
    });
  }

  refresh();

});
