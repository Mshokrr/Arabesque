app.controller('manageProjectsCtrl', function($scope, $location, profileData, AuthSrv){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
  })();

  (function navbarResolution(){
    $('#nav-news').hide();
  })();

  profileData.getAllProjects()
  .success(function(data){
    $scope.projects = data;
  })
  .error(function(err){
    console.log(err);
    $scope.error = err.message;
  });

  $scope.toggleProject = function(project){
    console.log(project);
    profileData.toggleProjectStatus(project._id)
    .error(function(err){
        console.log(err.message);
    });
  }

  $scope.backToAccount = function(){
    $('#nav-news').show();
    $location.url('/account');
  }

});
