app.controller('accountSettingsCtrl', function($scope, $location, MainSrv){

	$scope.user = MainSrv.getUser();

	$scope.modifyInformation = false;
	$scope.changePassword = false;

	$scope.goToModifyInformation = function(){
		$scope.modifyInformation = true;
	}
	
	$scope.goToChangePassword = function() {
		$scope.changePassword = true;
	}

	checkChangePasswordFields = function(){
		var flag = false;
		$scope.oldPasswordInvalid = false;
		$scope.newPasswordInvalid = false;
		$scope.confirmPasswordInvalid = false;
		var oldPassword = $scope.oldPassword;
		var newPassword = $scope.newPassword;
		var confirmPassword = $scope.confirmPassword;
		var user = MainSrv.getUser();

		if (oldPassword !== user.password){
			flag = true;
			$scope.oldPasswordInvalid = true;
		}
		if (newPassword === undefined || newPassword.length < 8){
			flag = true;
			$scope.newPasswordInvalid = true;
		}
		if (oldPassword !== undefined && newPassword !== undefined){
			if (confirmPassword !== newPassword){
				flag = true;
				$scope.confirmPasswordInvalid = true;
			}
		}
		return flag;
	}

	$scope.doneChangePassword = function() {
		var error = checkChangePasswordFields();
		if(!error){	//perform change password operation here
			$scope.changePassword = false;
			$scope.oldPassword = undefined;
			$scope.newPassword = undefined;
			$scope.confirmPassword = undefined;
		}
	}
	$scope.cancelChangePassword = function() {
		$scope.changePassword = false;
	}
	$scope.discardChanges = function(){
		$scope.modifyInformation = false;
	}
	$scope.saveChanges = function(){
		$scope.modifyInformation = false;
	}
	$scope.backToAccount = function(){
		$location.url('/account');
	}

});