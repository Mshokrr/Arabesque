app.controller('dashboardCtrl', function($scope, $location, $http, AuthSrv){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
  })();

  $scope.goToToday = function(){
    //
  }

  $scope.goToAccount = function(){
    $location.url('/account');
  }

  $scope.goToProjects = function(){
    ////
  }

  $scope.goToGallery = function(){
    //$location.url('')
  }

  $scope.goToAccountSettings = function(){
    $location.url('/accountSettings');
  }

  $scope.logOut = function(){
    AuthSrv.logout();
    $location.url('/');
  }


$scope.contactDevs = function(){
  $location.url('/contactDevs');
}


  $(document).ready(function(){

    $(".button-collapse").sideNav({
      menuWidth: 350,
      closeOnClick: true
    });

  });



});
