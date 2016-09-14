app.controller('accountSettingsCtrl', function($scope, $location, profileData, AuthSrv){

	//redirect to homepage when no user is logged in and /accountSettings is requested
	(function unauthorizedAccess(){
		if (AuthSrv.getToken() === undefined) {
			$location.url("/");
		}
	})();

	(function navbarResolution(){
    $('#nav-news').hide();
  })();

	// Javascript for parallax effect
	var yPos, header;
	var parallax = function(){
		yPos = window.pageYOffset;
		header = document.getElementById('accountSettingsHeader');
		if(header !== null){
			header.style.top = yPos * 0.5 + 'px';
		}
	}
	window.addEventListener('scroll', parallax);

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
		var fieldsError = checkChangePasswordFields();
		if(!fieldsError){
			console.log("1");
			profileData.changePassword($scope.oldPassword, $scope.newPassword)
			.error(function(err){
				$scope.oldPasswordInvalid = true;
			});
			$scope.oldPassword = undefined;
			$scope.newPassword = undefined;
			$scope.confirmPassword = undefined;
			$scope.changePassword = false;
		}
	}

	$scope.cancelChangePassword = function() {
		$scope.oldPassword = undefined;
		$scope.newPassword = undefined;
		$scope.confirmPassword = undefined;
		$scope.changePassword = false;
	}
	$scope.discardChanges = function(){
		$scope.modifyInformation = false;
	}
	$scope.saveChanges = function(){

		if($scope.firstName === undefined) $scope.firstName = $scope.user.firstName;
		if($scope.lastName === undefined) $scope.lastName = $scope.user.lastName;
		if($scope.email === undefined) $scope.email = $scope.user.email;
		if($scope.address === undefined) $scope.address = $scope.user.address;
		if($scope.university === undefined) $scope.university = $scope.user.university;
		if($scope.faculty === undefined) $scope.faculty = $scope.user.faculty;
		if($scope.academicYear === undefined) $scope.academicYear = $scope.user.academicYear;

		profileData.editProfile($scope.firstName, $scope.lastName, $scope.email, $scope.address, $scope.university, $scope.faculty, $scope.academicYear);

		$scope.user.firstName = $scope.firstName;
		$scope.user.lastName = $scope.lastName;
		$scope.user.email = $scope.email;
		$scope.user.address = $scope.address;
		$scope.user.university = $scope.university;
		$scope.user.faculty = $scope.faculty;
		$scope.user.academicYear = $scope.academicYear;

		$scope.firstName = undefined;
		$scope.lastName = undefined;
		$scope.email = undefined;
		$scope.address = undefined;
		$scope.university = undefined;
		$scope.faculty = undefined;
		$scope.academicYear = undefined;

		$scope.modifyInformation = false;
	}
	$scope.backToAccount = function(){
		$location.url('/account');
		$('#nav-news').show();
	}

});
