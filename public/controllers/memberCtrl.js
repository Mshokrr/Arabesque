app.controller('memberCtrl', function($scope, $location, profileData, AuthSrv){

  $scope.showUsersList = false;
  $scope.getUsersListError = false;

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
    console.log("attempt to get Users list");
    profileData.getUsersList().success(function(data){
      $scope.usersList = data;
      console.log($scope.usersList);
    }).error(function(err){
      console.log(err);
      $scope.getUsersListError = true;
    });
  }
  $scope.backToAccount = function(){
    $location.url('/account');
    $('#nav-news').show();
  }
});
