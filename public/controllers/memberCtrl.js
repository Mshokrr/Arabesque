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
