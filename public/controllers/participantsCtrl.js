app.controller('participantsCtrl' , function($scope, $location, profileData, AuthSrv, MainSrv){


  (function navbarResolution(){
    $('#nav-news').hide();
  })();

  // Javascript for parallax effect
  var yPos, header;
  var parallax = function(){
    yPos = window.pageYOffset;
    header = document.getElementById('participantsHeader');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);

  $scope.project = MainSrv.getSelectedProject();
  $scope.accepted = [];
  $scope.rejected = [];
  $scope.pending = [];

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.project === undefined) {
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

  var refresh = function (){

    $scope.projectWorkshops = $scope.project.allWorkshops;
    $scope.noWorkshops = ($scope.projectWorkshops.length === 0);
    $scope.countInWorkshops = [];
    $scope.countInFirstPref = [];
    $scope.countInSecondPref = [];
    if(!$scope.noWorkshops){
      for(var n = 0; n < $scope.projectWorkshops.length; n++){
        $scope.countInWorkshops.push(0);
        $scope.countInFirstPref.push(0);
        $scope.countInSecondPref.push(0);
      }
    }
    $scope.participants = [];
    $scope.accepted = [];
    $scope.rejected = [];
    $scope.pending = [];
    profileData.getParticipants($scope.project._id)
    .success(function(data){
      $scope.participants = data;
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
      for(var j = 0; j < $scope.projectWorkshops.length; j++){
        for (var k = 0; k < $scope.accepted.length; k++){
          if($scope.accepted[k].workshop !== null){
            if($scope.projectWorkshops[j] === $scope.accepted[k].workshop.selected){
            $scope.countInWorkshops[j]++;
            }
          }
        }
      }
      for(var x = 0; x < $scope.projectWorkshops.length; x++){
        for(var y = 0; y < $scope.pending.length; y++){
          if($scope.pending[y].workshop !== null){
            if($scope.projectWorkshops[x] === $scope.pending[y].workshop.prefs[0]){
            $scope.countInFirstPref[x]++;
            }
            if($scope.projectWorkshops[x] === $scope.pending[y].workshop.prefs[1]){
            $scope.countInSecondPref[x]++;
            }
          }
        }
      }
      $scope.noPending = ($scope.pending.length === 0);
      $scope.noAccepted = ($scope.accepted.length === 0);
      $scope.noRejected = ($scope.rejected.length === 0);
    })
    .error(function(err){
      console.log(err);
      $scope.errorShow = true;
      $scope.error = err.message;
    });
  }

  refresh();

  $scope.acceptPhase = function(participant){
    $scope.acceptedError = false;
    profileData.acceptPhase(participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
      $scope.pendingError = true;
      $scope.errorShow = true;
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
      $scope.errorShow = true;
      $scope.error = err.message;
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
      $scope.pendingError = true;
      $scope.errorShow = true;
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
      $scope.pendingError = true;
      $scope.errorShow = true;
      $scope.error = err.message;
    });
  }

  $scope.participantDetails = function(participant){
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
      $scope.errorShow = true;
      $scope.error = err.message;
    })
  }

  $scope.back = function(){
    $location.url('/projects');
  }

});
