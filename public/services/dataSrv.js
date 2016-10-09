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

		var createProject = function(name, description, selectionPhases, workshops){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/createProject', {
					projectName : name,
					projectDescription : description,
					selectionPhases : selectionPhases,
					workshops : workshops
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

		var editWorkshops = function(projectID, firstPref, secondPref){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/editWorkshops', {
					projectID : projectID,
					firstPref : firstPref,
					secondPref : secondPref
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var participateInProject = function(projectID, projectName, firstPref, secondPref, academicYear){
			return $http.post('/api/participateInProject', {
				projectID : projectID,
				projectName : projectName,
				firstPref : firstPref,
				secondPref : secondPref,
				academicYear : academicYear
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
				participationID : participation._id
			}, {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}

		var getParticipants = function(projectID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.get('/api/getParticipants/'+projectID, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var getParticipantById = function(participantID){
			return $http.get('/api/getParticipantById/'+participantID, {
	      headers : {
	        Authorization: "Bearer " + AuthSrv.getToken()
	      }
	    });
		}

		var acceptPhase = function(participationID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.post('/api/acceptPhase', {
					participationID : participationID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var resetAcceptance = function(participationID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.post('/api/resetAcceptance', {
					participationID : participationID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var setWorkshop = function(participationID, workshop){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.post('/api/setWorkshop', {
					participationID : participationID,
					workshop : workshop
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var rejectParticipant = function(participationID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.post('/api/rejectParticipant', {
					participationID : participationID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var addComment = function(participationID, userName, comment){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.post('/api/addComment', {
					participationID : participationID,
					userName : userName,
					comment : comment
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var clearComments = function(projectID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/clearComments', {
					projectID : projectID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var clearRejectedParticipants = function(projectID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/clearRejectedParticipants', {
					projectID : projectID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var rejectPendingParticipants = function(projectID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 2){
				return $http.post('/api/rejectPendingParticipants', {
					projectID : projectID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var createInterviewSlot = function(project, phase, date, info, capacity){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.post('/api/createInterviewSlot', {
					projectID : project._id,
					projectName : project.name,
					phaseName :	phase,
					date : date,
					info : info,
					capacity : capacity
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var getInterviewSlots = function(participation){
			var projectID = participation.projectID;
			var phase = participation.selectionPhases[participation.phaseIndex];
			return $http.get('/api/getInterviewSlots/'+projectID+'/'+phase, {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}

		var reserveInterviewSlot = function(participationID, slotID){
			return $http.post('/api/reserveInterviewSlot', {
				participationID : participationID,
				slotID : slotID
			}, {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}

		var getInterviewSlotById = function(slotID){
			return $http.get('/api/getInterviewSlotById/'+slotID, {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}

		var cancelReservation = function(participationID){
			return $http.post('/api/cancelReservation', {
				participationID : participationID
			}, {
				headers : {
					Authorization: "Bearer " + AuthSrv.getToken()
				}
			});
		}

		var getAllInterviewSlots = function(projectID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.get('/api/getAllInterviewSlots/'+projectID, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var deleteSlot = function(slotID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.post('/api/deleteSlot', {
					slotID : slotID
				}, {
					headers : {
						Authorization: "Bearer " + AuthSrv.getToken()
					}
				});
			}
		}

		var getReservations = function(slotID){
			var currentUser = AuthSrv.currentUser();
			if(currentUser.level > 1){
				return $http.get('/api/getReservations/'+slotID, {
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
			editWorkshops : editWorkshops,
			participateInProject : participateInProject,
			getParticipations : getParticipations,
			cancelParticipation : cancelParticipation,
			getParticipants : getParticipants,
			getParticipantById : getParticipantById,
			acceptPhase : acceptPhase,
			resetAcceptance : resetAcceptance,
			setWorkshop : setWorkshop,
			rejectParticipant : rejectParticipant,
			addComment : addComment,
			clearComments : clearComments,
			clearRejectedParticipants : clearRejectedParticipants,
			rejectPendingParticipants : rejectPendingParticipants,
			createInterviewSlot : createInterviewSlot,
			getInterviewSlots : getInterviewSlots,
			reserveInterviewSlot : reserveInterviewSlot,
			getInterviewSlotById : getInterviewSlotById,
			cancelReservation : cancelReservation,
			getAllInterviewSlots : getAllInterviewSlots,
			deleteSlot : deleteSlot,
			getReservations : getReservations
		};
	}
})();
