app.controller('accountCtrl', function($scope, $location, MainSrv){
	$scope.mobileNumber = MainSrv.getMobileNumber();
});