app.controller('mainCtrl', function($scope, $location, AuthSrv){

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
