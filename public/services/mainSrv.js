app.factory('MainSrv', function($http){
	return {
		setMobileNumber: function(value){
			this.selectedMobileNumber = value;
		}
	};
});