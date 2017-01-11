app.controller('mainCtrl', function($scope, $location, AuthSrv){
  
  $scope.signIn = function(){
    var loginUser = {
      mobileNumber : $scope.mobileNumber,
      password : $scope.password
    }
    AuthSrv.login(loginUser)
    .success(function(){
      // go to account
      console.log("login");
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.signUp = function(){
    // go to sign up
  }

});
