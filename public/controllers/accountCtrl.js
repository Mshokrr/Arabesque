app.controller('accountCtrl', function($scope, $location, profileData, AuthSrv){

//redirect to homepage when no user is logged in and /account is requested
  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
      $location.url("/");
    }
  })();

  // remove absent links from navbar
  (function navbarResolution(){
    $('#nav-about').hide();
    $('#nav-projects').hide();
    $('#nav-gallery').hide();
  })();

  // Javascript for parallax effect
  var yPos, header;
  var parallax = function(){
  	yPos = window.pageYOffset;
  	header = document.getElementById('home');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);

  $scope.finishedLoading = ($scope.user === undefined);
  $scope.admin = false;
  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.admin = ($scope.user.level > 2);
    $scope.member = ($scope.user.level > 1);
  })
  .error(function(err){
    console.log(err);
  });
  $scope.resetPassword = function(){
    $scope.resetPasswordArea = true;
  }

  $scope.discardPasswordReset = function(){
    $scope.resetPasswordArea = false;
  }
  $scope.goToAccountSettings = function(){
    $location.url('/accountSettings');
  }
  $scope.goToMembersPage = function(){
    $location.url('/member');
  }
  $scope.goToAdminPage = function(){
    $location.url('/admin');
  }
  $scope.logOut = function(){
    AuthSrv.logout();
    $location.url('/');
  }
});
