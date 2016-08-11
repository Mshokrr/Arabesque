(function() {
	app.service('profileData', profileData);

	profileData.$inject = ['$http', 'AuthSrv', '$window'];

	function profileData($http, AuthSrv){
		var getProfile = function() {
			return $http.get('api/profile', {
				headers: {
					Authorization: 'Bearer '+ AuthSrv.getToken()
				}
			});
		}

		var editProfile = function(newFirstName, newLastName, newEmail, newAddress, newUniversity, newFaculty, newAcademicYear) {
			var editedCredentials = {
				firstName : newFirstName,
				lastName : newLastName,
				email : newEmail,
				address : newAddress,
				university : newUniversity,
				faculty : newFaculty,
				academicYear : newAcademicYear
			}
			return $http.post('/api/editProfile', editedCredentials);
		}
		var changePassword = function(old, password){
			return $http.post('/api/changePassword', {
				oldPassword : old,
				newPassword : password
			});
		}
		var resetPassword = function(userMobileNumber, password){
			var currentUser = AuthSrv.currentUser();
			console.log(currentUser.level);
			if(currentUser.level > 2){
				return $http.post('/api/resetPassword', {
					mobileNumber : userMobileNumber,
					newPassword : password
				});
			}
			else {
				throw err;
			}
		}

		return {
			getProfile : getProfile,
			editProfile : editProfile,
			changePassword : changePassword,
			resetPassword : resetPassword
		};
	}
})();
