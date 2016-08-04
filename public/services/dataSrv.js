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
			console.log("About to modify information");
			var editedCredentials = {
				firstName : newFirstName,
				lastName : newLastName,
				email : newEmail,
				address : newAddress,
				university : newUniversity,
				faculty : newFaculty,
				academicYear : newAcademicYear
			}
			console.log(editedCredentials);
			$http.post('/api/editProfile', {
				headers: {
					Authorization: 'Bearer '+ AuthSrv.getToken()
				}
			}, editedCredentials);
		}

		return {
			getProfile : getProfile,
			editProfile : editProfile
		};
	}
})();