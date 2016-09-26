app.controller('dashboardCtrl', function($scope, $location, $http, AuthSrv, profileData){

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
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

  $scope.goToActivity = function(){
    $location.url('/activity');
  }

  $scope.goToAccount = function(){
    $('#nav-news').show();
    $location.url('/account');
  }

  $scope.goToProjects = function(){
    $location.url('/projects');
  }

  $scope.goToGallery = function(){
    //$location.url('')
  }

  $scope.goToCreateProject = function(){
    $location.url('/createProject')
  }

  $scope.goToManageProjects = function(){
    $location.url('/manageProjects');
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
