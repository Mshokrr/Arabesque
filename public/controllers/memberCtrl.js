app.controller('memberCtrl', function($scope, $location, profileData, AuthSrv){

  $scope.showUsersList = false;
  $scope.getUsersListError = false;
  $scope.usersListShow = false;

  profileData.getProfile()
		.success(function(data){
			$scope.user = data;
      $scope.member = ($scope.user.level > 1);
		})
		.error(function(err){
			console.log(err);
		});

  (function navbarResolution(){
      $('#nav-news').hide();
  })();

  // Javascript for parallax effect
  var yPos, header;
  var parallax = function(){
    yPos = window.pageYOffset;
    header = document.getElementById('memberAreaHeader');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);


  $scope.getUsersList = function(){
    profileData.getUsersList().success(function(data){
      $scope.usersList = data;
      $scope.usersListShow = true;
    }).error(function(err){
      console.log(err);
      $scope.getUsersListError = true;
    });
  }

  $scope.downloadUsersList = function(){
    profileData.downloadUsersList();
  }

  $scope.hideUserslist = function(){
    $scope.usersListShow = false;
  }
  $scope.backToAccount = function(){
    $location.url('/account');
    $('#nav-news').show();
  }
});
