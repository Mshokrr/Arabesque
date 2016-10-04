app.controller('mainCtrl', function($scope, $location, $window, $http, AuthSrv, profileData){

	(function autoLogin(){
		if (AuthSrv.isLoggedIn())
		$location.url('/account');
	})();

	(function navbarResolution(){
    $('#nav-about').show();
    $('#nav-projects').show();
    $('#nav-news').show();
		$('#nav-gallery').show();
		$('#nav-account').show();
  })();

	// Javascript for parallax effect
	var yPos, header, projectsHeader;
	var parallax = function(){
		yPos = window.pageYOffset;
		header = document.getElementById('home');
		projectsHeader = document.getElementById('projectsHomeHeader');
		if(header !== null){
			header.style.top = yPos * 0.5 + 'px';
		}
		if(projectsHeader !== null){
			projectsHeader.style.top = (yPos - 1200) * 0.3 + 'px';
		}
	}
	window.addEventListener('scroll', parallax);

	$scope.loginErrorTrigger = false;

	var loginUser = {
		mobileNumber : '',
		password : ''
	}

	$scope.signIn = function(){
		loginUser.mobileNumber = $scope.mobileNumber;
		loginUser.password = $scope.password;
		AuthSrv.login(loginUser)
		.error(function(err){
			$scope.loginErrorTrigger = true;
			$scope.loginError = err.message;
		})
		.then(function(){
			$location.url('/account');
		});
	}
	$scope.signUp = function(){
		$location.url('/signUp');
		$window.scrollTo(0,0);
	}

	$(document).ready(function(){

		var projects = document.getElementById('#projects');
		$(projects).on('scroll', function(){
			this.fadeIn();
		})

	});



});
