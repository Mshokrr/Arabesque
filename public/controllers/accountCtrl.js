app.controller('accountCtrl', function($scope, $location, MainSrv){

	$scope.finishedLoading = ($scope.user === undefined);
	
	$scope.user = MainSrv.getUser();

	$scope.logOut = function(){
		$location.url('/');
	}
});