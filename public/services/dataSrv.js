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

		var deleteNews = function(newsID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/deleteNews', {
					newsID : newsID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
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

		var getProjects = function(){
			return $http.get('/api/getProjects', {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}

		var getAllProjects = function(){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.get('/api/getAllProjects', {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var toggleProjectStatus = function(projectID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/toggleProjectStatus', {
					projectID : projectID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var editProject = function(projectInfo){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/editProject', projectInfo, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var addPhase = function(projectID, phase){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/addPhase', {
					projectID : projectID,
					phase : phase
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var participateInProject = function(projectID, projectName){
			return $http.post('/api/participateInProject', {
				projectID : projectID,
				projectName : projectName
			}, {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}
		var getParticipations = function(){
			return $http.get('/api/getParticipations', {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}

		var cancelParticipation = function(participation){
			return $http.post('/api/cancelParticipation',{
				projectID : participation.projectID,
				userID : participation.userID
			}, {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}

		return {
			getProfile : getProfile,
			editProfile : editProfile,
			changePassword : changePassword,
			resetPassword : resetPassword,
			postNews : postNews,
			deleteNews : deleteNews,
			getUsersList : getUsersList,
			downloadUsersList : downloadUsersList,
			changeLevel : changeLevel,
			createProject : createProject,
			getProjects : getProjects,
			getAllProjects : getAllProjects,
			toggleProjectStatus : toggleProjectStatus,
			editProject : editProject,
			addPhase: addPhase,
			participateInProject : participateInProject,
			getParticipations : getParticipations,
			cancelParticipation : cancelParticipation
		};
	}
})();
