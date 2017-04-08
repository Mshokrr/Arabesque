app.controller('signUpCtrl', function($scope, $location, AuthSrv){

  (function navbarResolution(){
    $('ul#nav > li').hide();
    $('#nav-contact').show();

    $('ul#nav-mobile > li').hide();
    $('#nav-mobile-contact').show();
  })();

  $(document).ready(function(){
    $('.modal').modal();
  });

  $scope.checkMobileNumber = function(){
    $scope.userAvailable = false;
    $scope.userAlreadyExists = false;
    if($scope.mobileNumber.length === 11){
      AuthSrv.checkAvailableUser($scope.mobileNumber)
      .success(function(data){
        $scope.userAvailable = true;
      })
      .error(function(err){
        $scope.userAlreadyExists = true;
      });
    }
  }

  $scope.checkPassword = function(){
    $scope.passwordInvalid = false;
    if($scope.password !== undefined){
      $scope.passwordMismatch = false;
      if($scope.password.length < 6){
        $scope.passwordInvalid = true;
      }
      else{
        if($scope.confirmPassword!== undefined && $scope.password !== $scope.confirmPassword){
          $scope.passwordMismatch = true;
        }
      }
    }
  }

  var fillingError = function(){
    $scope.mobileNumberInvalid = false;
    $scope.emailInvalid = false;
    $scope.firstNameInvalid = false;
    $scope.lastNameInvalid = false;
    var flag = false;
    if($scope.email === undefined){
      $scope.emailInvalid = true;
      flag = true;
    }
    if($scope.firstName === undefined){
      $scope.firstNameInvalid = true;
      flag = true;
    }
    if($scope.lastName === undefined){
      $scope.lastNameInvalid = true;
      flag = true;
    }
    if($scope.mobileNumber === undefined || isNaN($scope.mobileNumber)
    || $scope.mobileNumber.length !== 11 || $scope.mobileNumber.substring(0,2) !== "01"){
      $scope.mobileNumberInvalid = true;
      flag = true;
    }
    if($scope.userAlreadyExists || $scope.passwordInvalid || $scope.passwordMismatch){
      flag = true;
    }
    return flag;
  }

  $scope.signUp = function(){
    $scope.signUpComplete = false;
    if(!fillingError()){
      var user = {
        mobileNumber : $scope.mobileNumber,
        password : $scope.password,
        firstName : $scope.firstName,
        lastName : $scope.lastName,
        email : $scope.email,
        address : $scope.address,
        university : $scope.university,
        faculty : $scope.faculty,
        academicYear : $scope.academicYear
      };
      AuthSrv.register(user)
      .success(function(){
        $scope.signUpResponse = "Sign Up Complete!";
        $scope.signUpComplete = true;
        $('#signUpModal').modal('open');
      })
      .error(function(err){
        console.log("didnt register");
        $scope.signUpResponse = "Internal Server Error";
        $scope.signUpComplete = false;
        $('#signUpModal').modal('open');
      });
    }
  }

  $scope.proceed = function(){
    if($scope.signUpComplete){
      $('#signUpModal').modal('close');
      $location.url('/account');
    }
    else{
      $('#signUpModal').modal('close');
    }
  }

  $scope.cancel = function(){
    $location.url("/");
  }

});
