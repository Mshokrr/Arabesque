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
			console.log("attempting to send api call to change password");
			return $http.post('/api/changePassword', {
				oldPassword : old,
				newPassword : password
			}).success(function(data){
				console.log("changed password el mafrood");
			});
		}

		return {
			getProfile : getProfile,
			editProfile : editProfile,
			changePassword : changePassword
		};
	}
})();
