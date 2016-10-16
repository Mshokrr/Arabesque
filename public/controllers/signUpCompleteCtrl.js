app.controller('signUpCompleteCtrl', function($scope, $location, MainSrv){

	$scope.goToAccount = function (){
		$('#nav-news').show();
		$location.url('/account');
	}

});
