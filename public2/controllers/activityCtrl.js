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
  
});
