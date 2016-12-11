app.controller('activityCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
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
    header = document.getElementById('activityHeader');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);

  var refresh = function(){
    profileData.getProfile()
    .success(function(data){
      $scope.user = data;
      profileData.getParticipations($scope.user._id)
      .success(function(data){
        $scope.participations = data;
        $scope.noParticipations = ($scope.participations.length === 0);
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
    MainSrv.setSelectedParticipant(participant);
    $location.url('/reserveInterviewSlot');
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

  $scope.backToAccount = function(){
    $location.url('/account');
  }
});
