app.controller('accountCtrl', function($scope, $location, profileData, AuthSrv){

	$scope.finishedLoading = ($scope.user === undefined);
	
	profileData.getProfile()
		.success(function(data){			
			$scope.user = data;
		})
		.error(function(err){
			console.log(err);
		});

	$scope.goToAccountSettings = function(){
		$location.url('/accountSettings');
	}
	$scope.logOut = function(){
		AuthSrv.logout();
		$location.url('/');
	}
});