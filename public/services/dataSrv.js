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
			return $http.post('/api/editProfile', editedCredentials, {
				headers: {
					Authorization: 'Bearer '+ AuthSrv.getToken()
				}
			});
		}
		var changePassword = function(old, password){
			return $http.post('/api/changePassword', {
				oldPassword : old,
				newPassword : password
			}, {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}
		var resetPassword = function(userMobileNumber, password){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/resetPassword', {
					mobileNumber : userMobileNumber,
					newPassword : password
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
			else {
				throw err;
			}
		}

		var postNews = function(newsTitle, newsText, viewer){
				var currentUser = AuthSrv.currentUser();
				if(currentUser.level > 2){
					return $http.post('/api/postNews', {
						title : newsTitle,
						text : newsText,
						viewerLevel : viewer
					}, {
						headers : {
							Authorization: "Bearer " + AuthSrv.getToken()
						}
					});
				}
				else {
					throw err;
				}
		}

		var getUsersList = function(){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.get('/api/usersList', {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var downloadUsersList = function(){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.get('/api/downloadUsersList', {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var changeLevel = function(userMobileNumber, newLevel){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/changeLevel', {
					mobileNumber : userMobileNumber,
					level : newLevel
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var createProject = function(name, description, selectionPhases){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/createProject', {
					projectName : name,
					projectDescription : description,
					selectionPhases : selectionPhases
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		return {
			getProfile : getProfile,
			editProfile : editProfile,
			changePassword : changePassword,
			resetPassword : resetPassword,
			postNews : postNews,
			getUsersList : getUsersList,
			downloadUsersList : downloadUsersList,
			changeLevel : changeLevel,
			createProject : createProject
		};
	}
})();
