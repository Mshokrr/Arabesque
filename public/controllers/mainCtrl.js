app.controller('mainCtrl', function($scope, $location, AuthSrv){

	$scope.loginErrorTrigger = false;

	var loginUser = {
		mobileNumber : '',
		password : ''
	}

	$scope.signIn = function(){
		loginUser.mobileNumber = $scope.mobileNumber;
		loginUser.password = $scope.password;
		AuthSrv.login(loginUser)
		.error(function(err){
			$scope.loginErrorTrigger = true;
			$scope.loginError = err.message;
		})
		.then(function(){
			$location.url('/account');
		});
	}
	$scope.signUp = function(){
		$location.url('/signUp');
	} 
});