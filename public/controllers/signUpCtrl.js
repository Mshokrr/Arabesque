app.controller('signUpCtrl', function($scope, $location, AuthSrv){

    // Address and university and faculty and academic year are not mandatory fields for sign up
    // check with ahmed

    $scope.fillingError = false;
    $scope.apiError = false;

    checkFields = function(){

        $scope.mobileNumberInvalid = false;
        $scope.passwordInvalid = false;
        $scope.passwordShort = false;
        $scope.confirmPasswordInvalid = false;
        $scope.firstNameInvalid = false;
        $scope.lastNameInvalid = false;
        $scope.emailInvalid = false;

        var flag = false;
        if ($scope.mobileNumber === undefined || isNaN($scope.mobileNumber) || $scope.mobileNumber.length !== 11){
            flag = true;
            $scope.mobileNumberInvalid = true;
        }
        var password = $scope.password;
        if (password === undefined) {
            flag = true;
            $scope.passwordInvalid = true;
        } else {
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
        return flag;
    }
    $scope.continue = function (){
        $scope.fillingError = checkFields();
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
