app.controller('reserveInterviewSlotCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  $scope.participant = MainSrv.getSelectedParticipant();

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.member = ($scope.user.level > 1);
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.participant === undefined) {
      $location.url("/");
    }
  })();

  var refresh = function(){
    $scope.errShow = false;
    profileData.getParticipantById($scope.participant._id)
    .success(function(data){
      $scope.participant = data;
      $scope.pending = !($scope.participant.accepted || $scope.participant.rejected);
      $scope.slotReserved = !($scope.participant.interviewSlot === null);
      if($scope.slotReserved){
        profileData.getInterviewSlotById($scope.participant.interviewSlot)
        .success(function(slot){
          $scope.reservedSlot = slot;
        })
        .error(function(err){
          $scope.errShow = true;
          $scope.error = err.message;
          console.log(err);
        });
      }
      else{
        profileData.getInterviewSlots($scope.participant)
        .success(function(data){
          $scope.slots = data;
          $scope.noSlots = ($scope.slots.length === 0);
        })
        .error(function(err){
          $scope.errShow = true;
          $scope.error = err.message;
          console.log(err);
        });
      }
    })
    .error(function(err){
      $scope.errShow = true;
      $scope.error = err.message;
      console.log(err);
    });
  }

  refresh();

  $scope.reserveSlot = function(slot){
    profileData.reserveInterviewSlot($scope.participant._id, slot._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
      $scope.error = err.message;
      $scope.errShow = true;
    });
  }

  $scope.cancelReservation = function(){
    profileData.cancelReservation($scope.participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
      $scope.error = err.message;
      $scope.errShow = true;
    });
  }

  $scope.back = function(){
    $location.url('/activity');
  }
});
