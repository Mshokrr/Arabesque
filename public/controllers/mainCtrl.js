app.controller('mainCtrl', function($scope, $location, $window, $http, AuthSrv, profileData){

	(function autoLogin(){
		if ($window.localStorage['mean-token'] !== undefined)
		$location.url('/dashboard');
	})();

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
			$location.url('/dashboard');
		});
	}
	$scope.signUp = function(){
		$location.url('/signUp');
		$window.scrollTo(0,0);
	}

	$(document).ready(function(){

		var projects = document.getElementById('#projects');
		$(projects).on('scroll', function(){
			this.fadeIn();
		})

	});



});
