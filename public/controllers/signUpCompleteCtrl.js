app.controller('signUpCompleteCtrl', function($scope, $location, MainSrv){

	$scope.goToAccount = function (){
		$location.url('/account');
	}

	// $scope.goToDashboard = function (){
	// 	$location.url('/acc');
	// }

});
