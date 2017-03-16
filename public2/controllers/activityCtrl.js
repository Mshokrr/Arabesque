app.controller('activityCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
      $location.url("/");
    }
  })();

  var refresh = function(){
    profileData.getProfile()
    .success(function(data){
      $scope.user = data;
      $scope.member = ($scope.user.level > 1);
      profileData.getParticipations($scope.user._id)
      .success(function(data){
        $scope.participations = data;
        $scope.noParticipations = ($scope.participations.length === 0);
        if(!$scope.noParticipations){
          $scope.reservedInterview = [];
          for(var i = 0; i < $scope.participations.length; i++){
            $scope.reservedInterview.push(!($scope.participations[i].interviewSlot === null));
          }
        }
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

  $scope.reserveInterviewSlot = function(participant){
    $scope.selectedParticipant = participant;
    if($scope.reservationMade = ($scope.selectedParticipant.interviewSlot !== null)){
      profileData.getInterviewSlotById($scope.selectedParticipant.interviewSlot)
      .success(function(slot){
        $scope.reservedSlot = slot;
        $('#interviewModal').modal('open');
      })
      .error(function(err){
        console.log(err);
      });
    }
    else {
      profileData.getInterviewSlots($scope.selectedParticipant)
      .success(function(data){
        $scope.slots = data;
        $scope.noSlots = ($scope.slots.length === 0);
        $('#interviewModal').modal('open');
      })
      .error(function(err){
        console.log(err);
      });
    }
  }

  $scope.reserveSlot = function(slot){
    profileData.reserveInterviewSlot($scope.selectedParticipant._id, slot._id)
    .success(function(){
      $('#interviewModal').modal('close');
      $scope.feedback = "Interview Reserved!"
      $('#reservationFeedbackModal').modal('open');
      refresh();
    })
    .error(function(err){
      $scope.feedback = "An Error Occured!"
      $('#reservationFeedbackModal').modal('open');
      console.log(err);
    });
  }

  $scope.cancelReservation = function(){
    $scope.cancelReservation = function(){
      profileData.cancelReservation($scope.selectedParticipant._id)
      .success(function(){
        $('#interviewModal').modal('close');
        refresh();
      })
      .error(function(err){
        console.log(err);
      });
    }
  }

  $scope.done = function(){
    $('#interviewModal').modal('close');
  }

  $scope.cancelParticipation = function(participation){
    profileData.cancelParticipation(participation)
    .success(function(){
      refresh();
    }).error(function(err){
      console.log(err);
      $scope.error = err.message;
    })
  }

});
