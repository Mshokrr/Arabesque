app.factory('MainSrv', function($http){
	return {
		setMobileNumber: function(value){
			this.selectedMobileNumber = value;
		},
		getMobileNumber: function(){
			return this.selectedMobileNumber;
		},

		setUser: function(value){
			this.selectedUser = value;
		},
		getUser: function(){
			return this.selectedUser;
		}
	};
});