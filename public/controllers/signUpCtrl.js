app.controller('signUpCtrl', function($scope, $location, MainSrv){

	$scope.cancelSignUp = function (){
		$location.url('/');
	}
});