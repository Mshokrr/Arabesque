app.factory('MainSrv', function(){

	return {
		setSelectedProject: function(value){
			this.selectedProject = value;
		},
		getSelectedProject: function(){
			return this.selectedProject;
		},
		setSelectedParticipant: function(value){
			this.selectedParticipant = value;
		},
		getSelectedParticipant: function(){
			return this.selectedParticipant;
		}
	};

});
