app.controller('participantsCtrl' , function($scope, $location, profileData, AuthSrv, MainSrv){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
  })();

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

  var refresh = function (){
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
      console.log($scope.pending);
      $scope.noPending = ($scope.pending.length === 0);
      $scope.noAccepted = ($scope.accepted.length === 0);
      $scope.noRejected = ($scope.rejected.length === 0);
    })
    .error(function(err){
      console.log(err);
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
    });
  }

  $scope.rejectParticipant = function(participant){
    $scope.rejectedError = false;
    console.log(participant);
    profileData.rejectParticipant(participant._id)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
      $scope.pendingError = true;
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
    });
  }

  $scope.back = function(){
    $location.url('/projects');
  }

});
