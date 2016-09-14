app.controller('projectsCtrl', function($scope, $location, profileData, AuthSrv){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
  })();

  (function navbarResolution(){
    $('#nav-news').hide();
  })();

  profileData.getProjects()
  .success(function(data){
    $scope.projects = data;
  })
  .error(function(err){
    console.log(err);
    $scope.error = err.message;
  });


  $scope.backToAccount = function(){
    $('#nav-news').show();
    $location.url('/account');
  }

});
