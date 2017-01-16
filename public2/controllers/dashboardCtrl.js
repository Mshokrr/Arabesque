app.controller('dashboardCtrl', function($scope, $location, AuthSrv){

  $(document).ready(function(){
    $(".button-collapse").sideNav();
  });

  $scope.logOut = function(){
    AuthSrv.logout();
    $location.url('/');
  }

})
