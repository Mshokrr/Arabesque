app.controller('accountCtrl', function($scope, $location, AuthSrv, profileData){

  (function navbarResolution(){
    $('ul#nav > li').hide();
    $('#nav-news').show();
    $('#nav-account').show();
    $('#nav-contact').show();

    $('ul#nav-mobile > li').hide();
    $('#nav-mobile-news').show();
    $('#nav-mobile-account').show();
    $('#nav-mobile-contact').show();
  })();

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
      $location.url("/");
    }
  })();

  $(document).ready(function(){
    $('.modal').modal();
  });

  var refresh = function(){
    profileData.getProfile()
    .success(function(data){
      $scope.user = data;
      $scope.newUser = data;
      $scope.admin = ($scope.user.level > 2);
      $scope.member = ($scope.user.level > 1);
    })
    .error(function(err){
      console.log(err);
    });
  }

  refresh();

  $scope.editProfile = function(){
    $('#editProfileModal').modal('open');
  }

  $scope.changePassword = function(){
    $scope.invalidPassword = false;
    $scope.passwordMismatch = false;
    $scope.changePasswordError = false;
    $('#changePasswordModal').modal('open');
  }

  $scope.saveEdit = function(){
    $('#editProfileModal').modal('close');
    profileData.editProfile($scope.user)
    .success(function(){
      refresh();
    })
    .error(function(err){
      console.log(err);
    });
  }

  $scope.cancelEdit = function(){
    $('#editProfileModal').modal('close');
    refresh();
  }

  $scope.checkPassword = function(){
    $scope.invalidPassword = false;
    if($scope.password !== undefined){
      $scope.passwordMismatch = false;
      if($scope.password.length < 6){
        $scope.invalidPassword = true;
      }
      else{
        if($scope.confirmPassword!== undefined && $scope.password !== $scope.confirmPassword){
          $scope.passwordMismatch = true;
        }
      }
    }
  }

  $scope.saveChangePassword = function(){
    if(!($scope.invalidPassword || $scope.passwordMismatch)){
      $('#changePasswordModal').modal('close');
      profileData.changePassword($scope.user._id, $scope.oldPassword, $scope.password)
      .success(function(){
        refresh();
      })
      .error(function(err){
        console.log(err);
        $scope.changePasswordError = true;
      });
    }
  }

  $scope.resetPassword = function(){
    $scope.resetPasswordError = false;
    $('#resetPasswordModal').modal('open');
  }

  $scope.savePasswordReset = function(){
    $scope.userMobileNumberInvalid = false;
    $scope.userPasswordInvalid = false;
    var flag = false;
    if(isNaN($scope.userMobileNumber) || $scope.userMobileNumber.length !== 11 ||
      $scope.userMobileNumber.substring(0,2) !== "01"){
      $scope.userMobileNumberInvalid = true;
      flag = true;
    }
    if($scope.userPassword.length < 6){
      $scope.userPasswordInvalid = true;
      flag = true;
    }
    if(!flag){
      profileData.resetPassword($scope.userMobileNumber, $scope.userPassword)
      .success(function(){
        $('#resetPasswordModal').modal('close');
      })
      .error(function(err){
        console.log(err);
      });
    }
  }

  $scope.cancelChangePassword = function(){
    $('#changePasswordModal').modal('close');
  }

  $scope.signOut = function(){
    AuthSrv.logout();
    $location.url('/');
  }

});
