app.controller('adminCtrl', function($scope, $location, profileData, AuthSrv){
  $scope.resetPasswordArea = false;
  $scope.resetPasswordError = false;
  profileData.getProfile()
		.success(function(data){
			$scope.user = data;
      $scope.admin = ($scope.user.level > 2);
		})
		.error(function(err){
			console.log(err);
		});

  $scope.resetPassword = function(){
  	$scope.resetPasswordArea = true;
  }
  $scope.savePasswordReset = function(){
		try{
			profileData.resetPassword($scope.userMobileNumber, $scope.newPassword).error(function(err){
        console.log(err);
        $scope.resetPasswordError = true;
      });
		} catch(err){
			console.log(err);
		}
		$scope.resetPasswordArea = false;
	}
  $scope.discardPasswordReset = function(){
		$scope.resetPasswordArea = false;
	}
  $scope.backToAccount = function(){
    $location.url('/account');
  }
});
