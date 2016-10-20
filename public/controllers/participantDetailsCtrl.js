app.controller('participantDetailsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
      $location.url("/");
    }
  })();

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.member = ($scope.user.level > 1);
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.participant = MainSrv.getSelectedParticipant();
  $scope.project = MainSrv.getSelectedProject();

  var refresh = function(){

    $scope.projectWorkshops = $scope.project.allWorkshops;
    $scope.noWorkshops = ($scope.projectWorkshops.length === 0);
    profileData.getParticipantById($scope.participant._id)
    .success(function(data){
      $scope.participant = data;
      if($scope.participant.accepted){
        $scope.status = "Accepted";
        $scope.pending = false;
      }
      else{
        if($scope.participant.rejected){
          $scope.status = "Rejected";
          $scope.pending = false;
        }
        else{
          $scope.status = "Pending";
          $scope.pending = true;
        }
      }
      $scope.showWorkshops = ($scope.participant.accepted && !$scope.noWorkshops);
      $scope.noInterviewSlot = ($scope.participant.interviewSlot === null);
      if(!$scope.noInterviewSlot){
        profileData.getInterviewSlotById($scope.participant.interviewSlot)
        .success(function(slot){
          $scope.reservedSlot = slot;
        })
        .error(function(err){
          $scope.error = err.message;
          console.log(err);
        });
      }
    }).error(function(err){
      $scope.error = err.message;
      console.log(err);
    });
  }

  refresh();

  $scope.acceptPhase = function(participant){
    profileData.acceptPhase(participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
      $scope.error = err.message;
    });
  }

  $scope.rejectParticipant = function(participant){
    profileData.rejectParticipant(participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
      $scope.error = err.message;
    });
  }

  $scope.resetAcceptance = function(participant){
    profileData.resetAcceptance(participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
      $scope.error = err.message;
    });
  }

  $scope.setWorkshop = function(participant){
    profileData.setWorkshop(participant._id, participant.workshop.selected)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.addComment = function(){
    var commenterName = $scope.user.firstName + " " + $scope.user.lastName;
    profileData.addComment($scope.participant._id, commenterName, $scope.commentText)
    .success(function(){
      refresh();
    })
    .error(function(err){
      $scope.error = err.message;
      console.log(err);
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
    $location.url('/participants');
  }


});
