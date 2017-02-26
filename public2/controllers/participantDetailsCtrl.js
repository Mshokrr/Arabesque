app.controller('participantDetailsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  $scope.participant = MainSrv.getSelectedParticipant();
  $scope.project = MainSrv.getSelectedProject();

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.participant === undefined) {
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



  var refresh = function(){

    $scope.noWorkshops = ($scope.project.allWorkshops.length === 0);
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
          console.log(err);
        });
      }
    })
    .error(function(err){
      console.log(err);
    });
  }

  refresh();

  $scope.acceptPhase = function(){
    profileData.acceptPhase($scope.participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.rejectParticipant = function(){
    profileData.rejectParticipant($scope.participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.resetAcceptance = function(){
    profileData.resetAcceptance($scope.participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.setWorkshop = function(){
    profileData.setWorkshop($scope.participant._id, $scope.participant.workshop.selected)
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
    });
  }

  $scope.back = function(){
    $location.url("/participants");
  }

});
