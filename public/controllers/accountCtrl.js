app.controller('accountCtrl', function($scope, $location, profileData, AuthSrv){

	$scope.finishedLoading = ($scope.user === undefined);
	$scope.admin = false;
	profileData.getProfile()
		.success(function(data){
			$scope.user = data;
			$scope.admin = ($scope.user.level > 2);
			$scope.member = ($scope.user.level > 1);
		})
		.error(function(err){
			console.log(err);
		});
	$scope.resetPassword = function(){
		$scope.resetPasswordArea = true;
	}

	$scope.discardPasswordReset = function(){
		$scope.resetPasswordArea = false;
	}
	$scope.goToAccountSettings = function(){
		$location.url('/accountSettings');
	}
	$scope.goToAdminPage = function(){
		$location.url('/admin');
	}
	$scope.logOut = function(){
		AuthSrv.logout();
		$location.url('/');
	}
	$scope.getMembersList = function(){
		console.log("1");
		profileData.getUsersList();
	}
});
