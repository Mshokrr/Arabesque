app.controller('dashboardCtrl', function($scope, $location, $http, AuthSrv){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
  })();

  $scope.active = "today";

  $scope.showAccountBtn = function(){
    $scope.showAccount = true;
  }

  $(document).ready(function(){

    // $('ul.tabs').tabs();

    $(".button-collapse").sideNav({
      menuWidth: 350,
      closeOnClick: true
    });



  });



});
