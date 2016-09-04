app.controller('adminCtrl', function($scope, $location, profileData, AuthSrv){

  $scope.resetPasswordArea = false;
  $scope.resetPasswordError = false;
  $scope.postNewsErrorTrigger = false;
  $scope.postNewsSucess = false;
  $scope.titleEmpty = false;
  $scope.contentEmpty = false;

  profileData.getProfile()
		.success(function(data){
			$scope.user = data;
      $scope.admin = ($scope.user.level > 2);
		})
		.error(function(err){
			console.log(err);
		});
  (function navbarResolution(){
    $('#nav-news').hide();
  })();

  $scope.resetPassword = function(){
  	$scope.resetPasswordArea = true;
  }
  $scope.savePasswordReset = function(){
		try{
			profileData.resetPassword($scope.userMobileNumber, $scope.newPassword).error(function(err){
        console.log(err);
        $scope.resetPasswordError = true;
      });
		} catch(err){
			console.log(err);
		}
		$scope.resetPasswordArea = false;
	}
  $scope.discardPasswordReset = function(){
		$scope.resetPasswordArea = false;
	}

  $scope.checkNewsFields = function(){
    $scope.titleEmpty = false;
    $scope.contentEmpty = false;
    var flag = false;

    if($scope.newsTitle === undefined || $scope.newsTitle === ""){
      flag = true;
      $scope.titleEmpty = true;
    }

    if($scope.newsContent === undefined || $scope.newsContent === ""){
      flag = true;
      $scope.contentEmpty = true;
    }

    return flag;
  }

  $scope.postNews = function(){
    var newFieldsError = $scope.checkNewsFields();
    if(!newFieldsError){
      profileData.postNews($scope.newsTitle, $scope.newsContent).error(function(err){
        console.log(err);
        $scope.postNewsErrorTrigger = true;
      }).success(function(){
        $scope.postNewsSucess = true;
        $scope.titleEmpty = false;
        $scope.contentEmpty = false;
      });
    }
  }

  $scope.backToAccount = function(){
    $location.url('/account');
    $('#nav-news').show();
  }
});
