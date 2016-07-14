app.controller('mainCtrl', function($scope, $location, MainSrv){

	var availableUser = {};
	availableUser.mobileNumber = '01007203969';
	availableUser.password = 'arabesque';
	availableUser.firstName = 'Mohamed';
	availableUser.lastName = 'Shokr';
	availableUser.email = 'mohamedshokrr@gmail.com';
	availableUser.university = 'GUC';
	availableUser.faculty = 'Media Engineering And Technology';
	availableUser.academicYear = 3;
	availableUser.address = "Heliopolis, Cario, Egypt";

	$scope.signIn = function(){
		MainSrv.setUser(availableUser);
		$location.url('/account');
	}
	$scope.signUp = function(){
		$location.url('/signUp');
	} 
});