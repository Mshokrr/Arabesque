app.controller('participantsCtrl' , function($scope, $location, profileData, AuthSrv, MainSrv){

  $scope.project = MainSrv.getSelectedProject();

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.project === undefined) {
      $location.url("/");
    }
  })();

  $scope.projectNameUrl = encodeURIComponent($scope.project.name.trim());

  $scope.noWorkshops = ($scope.project.allWorkshops.length === 0);
  $scope.accepted = [];
  $scope.rejected = [];
  $scope.pending = [];



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
    profileData.getParticipants($scope.project._id)
    .success(function(data){
      $scope.participants = data;
      $scope.accepted = [];
      $scope.rejected = [];
      $scope.pending = [];
      for (var i = 0; i < $scope.participants.length; i++){
        if($scope.participants[i].accepted){
          $scope.accepted.push($scope.participants[i]);
        }
        else{
          if($scope.participants[i].rejected){
            $scope.rejected.push($scope.participants[i]);
          }
          else{
            $scope.pending.push($scope.participants[i]);
          }
        }
      }
    })
    .error(function(err){
      console.log(err);
    })
  }

  refresh();

  // Not needed for now
  // $scope.getParticipantsNumber = function(){
  //   // modal for paricipants number
  //   profileData.getParticipantsNumber($scope.project._id)
  //   .success(function(data){
  //     $scope.participantsNumber = data;
  //   })
  // }

  $scope.getWorkshopStats = function(){
    $('#workshopStatsModal').modal('open');
    profileData.getWorkshopStats($scope.project._id)
    .success(function(data){
      $scope.workshopStats = data;
    })
    .error(function(err){
      $scope.workshopStatsError = true;
    });
  }

  $scope.dismissWorkshopStats = function(){
    $('#workshopStatsModal').modal('close');
  }

  $scope.acceptPhase = function(participant){
    $scope.acceptedError = false;
    profileData.acceptPhase(participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
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

  $scope.rejectParticipant = function(participant){
    $scope.rejectedError = false;
    profileData.rejectParticipant(participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.resetAcceptance = function(participant){
    profileData.resetAcceptance(participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.viewDetails = function(participant){
    MainSrv.setSelectedParticipant(participant);
    $location.url('/participantDetails');
  }

  $scope.clearComments = function(){
    profileData.clearComments($scope.project._id)
    .success(function(){
      refresh();
      $scope.success = true;
    })
    .error(function(err){
      console.log(err);
    })
  }

  $scope.back = function(){
    $location.url('/projects');
  }

});
