app.controller('accountSettingsCtrl', function($scope, $location, profileData){

	profileData.getProfile()
		.success(function(data){			
			$scope.user = data;
		})
		.error(function(err){
			console.log(err);
		});

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

		console.log("attempting to save changes");

		if($scope.firstName === undefined) $scope.firstName = $scope.user.firstName;
		if($scope.lastName === undefined) $scope.lastName = $scope.user.lastName;
		if($scope.email === undefined) $scope.email = $scope.user.email;
		if($scope.address === undefined) $scope.address = $scope.user.address;
		if($scope.university === undefined) $scope.university = $scope.user.university;
		if($scope.faculty === undefined) $scope.faculty = $scope.user.faculty;
		if($scope.academicYear === undefined) $scope.academicYear = $scope.user.academicYear;

		profileData.editProfile($scope.firstName, $scope.lastName, $scope.email, $scope.address, $scope.university, $scope.faculty, $scope.academicYear);

		profileData.getProfile()
		.success(function(data){			
			$scope.user = data;
		})
		.error(function(err){
			console.log(err);
		});

		$scope.modifyInformation = false;
	}
	$scope.backToAccount = function(){
		$location.url('/account');
	}

});