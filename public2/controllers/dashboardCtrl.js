app.controller('dashboardCtrl', function($scope, $location, AuthSrv){

  $(document).ready(function(){
    $(".button-collapse").sideNav();
  });

  $scope.goToAccount = function(){
    $location.url('/account');
  }

  $scope.goToActivity = function(){
    $location.url('/activity');
  }

  $scope.goToProjects = function(){
    $location.url('/projects');
  }

  $scope.logOut = function(){
    AuthSrv.logout();
    $location.url('/');
  }

})
