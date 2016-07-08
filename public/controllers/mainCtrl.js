app.controller('mainCtrl', function($scope, $location, MainSrv){

	$scope.signIn = function(){
		MainSrv.setMobileNumber($scope.mobileNumber);
		$location.url('/account');
	}
	$scope.signUp = function(){
		$location.url('/signUp');
	} 
});