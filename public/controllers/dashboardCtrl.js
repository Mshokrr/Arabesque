app.controller('dashboardCtrl', function($scope, $location, $http, AuthSrv, profileData){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
  })();

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.admin = ($scope.user.level > 2);
    $scope.member = ($scope.user.level > 1);
  })
  .error(function(err){
    console.log(err);
  });

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

  $scope.goToCreateProject = function(){
    $location.url('/createProject')
  }

  $scope.goToAccountSettings = function(){
    $location.url('/accountSettings');
  }

  $scope.goToAdminArea = function(){
    $location.url('/admin');
  }

  $scope.goToMembersArea = function(){
    $location.url('/member');
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
