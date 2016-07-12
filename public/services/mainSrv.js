app.factory('MainSrv', function($http){
	return {
		setMobileNumber: function(value){
			this.selectedMobileNumber = value;
		},
		getMobileNumber: function(){
			return this.selectedMobileNumber;
		},

		setSignedUpUser: function(value){
			this.selectedSignedUpUser = value;
		},
		getSignedUpUser: function(){
			return this.selectedSignedUpUser;
		}
	};
});