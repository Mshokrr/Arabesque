app.controller('activityCtrl', function($scope, $location, profileData, AuthSrv){

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
    header = document.getElementById('activityHeader');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);

  profileData.getParticipations()
  .success(function(data){
    $scope.participations = data;
  })
  .error(function(err){
    console.log(err);
    $scope.error = err.message;
  });

  $scope.cancelParticipation = function(participation){
    profileData.cancelParticipation(participation)
    .success(function(){
      profileData.getParticipations()
      .success(function(data){
        $scope.participations = data;
      })
      .error(function(err){
        console.log(err);
        $scope.error = err.message;
      });
    }).error(function(err){
      console.log(err);
      $scope.error = err.message;
    })
  }

  $scope.backToAccount = function(){
    $location.url('/account');
  }
});
