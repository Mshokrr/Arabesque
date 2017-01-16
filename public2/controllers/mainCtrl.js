app.controller('mainCtrl', function($scope, $location, AuthSrv){

  (function navbarResolution(){
    $('ul#nav > li').hide();
    $('#nav-about').show();
    $('#nav-projects').show();
    $('#nav-news').show();
    $('#nav-signIn').show();
    $('#nav-contact').show();

    $('ul#nav-mobile > li').hide();
    $('#nav-mobile-about').show();
    $('#nav-mobile-projects').show();
    $('#nav-mobile-news').show();
    $('#nav-mobile-signIn').show();
    $('#nav-mobile-contact').show();
  })();

  (function autoLogin(){
    if (AuthSrv.isLoggedIn()) {
      $location.url("/account");
    }
  })();

  $(document).ready(function(){
    $('.modal').modal();
  });

  $scope.signIn = function(){
    var loginUser = {
      mobileNumber : $scope.mobileNumber,
      password : $scope.password
    }
    AuthSrv.login(loginUser)
    .success(function(){
      $location.url('/account');
    })
    .error(function(err){
      $scope.loginError = err.message;
    });
  }

  $scope.signUp = function(){
    $location.url('/signUp');
  }

});
