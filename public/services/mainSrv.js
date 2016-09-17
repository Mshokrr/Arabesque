app.factory('MainSrv', function($http){
	return {
		setSelectedProject: function(value){
			this.selectedProject = value;
		},
		getSelectedProject: function(){
			return this.selectedProject;
		}
	};
});
