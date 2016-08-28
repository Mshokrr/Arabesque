app.controller('signUpCtrl', function($scope, $location, $window, AuthSrv){

  // Address and university and faculty and academic year are not mandatory fields for sign up
  // check with ahmed

  $scope.fillingError = false;
  $scope.apiError = false;

  $scope.checkFields = function(firstStage){

    //firstStage is true when it should check the fields in the first stage
    //false for second stage

    $scope.mobileNumberInvalid = false;
    $scope.passwordInvalid = false;
    $scope.passwordShort = false;
    $scope.confirmPasswordInvalid = false;
    $scope.firstNameInvalid = false;
    $scope.lastNameInvalid = false;
    $scope.emailInvalid = false;

    var flag = false;

    if(firstStage){

      if ($scope.firstName === undefined){
        flag = true;
        $scope.firstNameInvalid = true;
      }

      if ($scope.lastName === undefined){
        flag = true;
        $scope.lastNameInvalid = true;
      }

      if ($scope.email === undefined){
        flag = true;
        $scope.emailInvalid = true;
      }

      if ($scope.mobileNumber === undefined || isNaN($scope.mobileNumber) || $scope.mobileNumber.length !== 11){
        flag = true;
        $scope.mobileNumberInvalid = true;
      }

      //only show the second stage if there is nothing wrong with the first one

      if(!flag){

        var firstStage = document.getElementById('stageOne');
        var secondStage = document.getElementById('stageTwo');

        $(function(){

          $(firstStage).slideUp(500);
          $(secondStage).slideDown(500);
        //  $window.scrollTo(0,0);
        });

      }

    }

    //check second stage fields only
    
    else{

      var password = $scope.password;

      if (password === undefined) {
        flag = true;
        $scope.passwordInvalid = true;
      }

      else {
        if (password.length < 8){
          flag = true;
          $scope.passwordInvalid = true;
        }
      }

      var confirmPassword = $scope.confirmPassword;

      if (confirmPassword !== password && password !== undefined){
        flag = true;
        $scope.confirmPasswordInvalid = true;
      }

    }

    var completedIncorrectly = false;
    return flag;


  }


  $scope.continue = function (){

    //check second stage for errors
    $scope.fillingError = $scope.checkFields(false);

    if(!$scope.fillingError){
      var signedUpUser = {
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
      AuthSrv.register(signedUpUser)
      .error(function(err){
        console.log(err);
        $scope.apiError = true;
        $scope.signUpError = err.message;
      })
      .then(function (){
        $location.url('/signUpComplete');
      });
    }
  }
  $scope.cancelSignUp = function (){
    $location.url('/');
  }
});
