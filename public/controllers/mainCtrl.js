app.controller('mainCtrl', function($scope, $location, MainSrv){

	$scope.signIn = function(){
		var user = {};
		user.mobileNumber = $scope.mobileNumber;
		user.password = $scope.password;
		user.firstName = 'Mohamed';
		user.lastName = 'Shokr';
		user.email = 'mohamedshokrr@gmail.com';
		user.university = 'GUC';
		user.faculty = 'Media Engineering And Technology';
		user.academicYear = 3;
		user.address = "Heliopolis, Cario, Egypt";
		MainSrv.setUser(user);
		console.log(user);
		$location.url('/account');
	}
	$scope.signUp = function(){
		$location.url('/signUp');
	} 
});