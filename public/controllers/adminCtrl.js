app.controller('adminCtrl', function($scope, $location, profileData, AuthSrv){


  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
      $location.url("/");
    }
  })();

  $scope.resetPasswordArea = false;
  $scope.resetPasswordError = false;
  $scope.postNewsErrorTrigger = false;
  $scope.postNewsSucess = false;
  $scope.titleEmpty = false;
  $scope.contentEmpty = false;
  $scope.viewersEmpty = false;
  $scope.changeLevelShow = false;
  $scope.changeLevelError = false;
  $scope.changeLevelErrorTrigger = false;

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

  // Javascript for parallax effect
  var yPos, header;
  var parallax = function(){
    yPos = window.pageYOffset;
    header = document.getElementById('adminAreaHeader');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);


  // resetting a password
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


  // Posting news
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
    if($scope.viewersData.selected === null){
      flag = true;
      $scope.viewersEmpty = true;
    }

    return flag;
  }

  $scope.viewersData = {
    selected : null,
    options : [
      {level: '0', name: 'Public'},
      {level: '1', name: 'Private'},
      {level: '2', name: 'Members'},
      {level: '3', name: 'Admins'}
    ]
  };

  $scope.postNews = function(){
    var newFieldsError = $scope.checkNewsFields();
    if(!newFieldsError){
      profileData.postNews($scope.newsTitle, $scope.newsContent, $scope.viewersData.selected).error(function(err){
        console.log(err);
        $scope.postNewsErrorTrigger = true;
      }).success(function(){
        $scope.postNewsSucess = true;
        $scope.titleEmpty = false;
        $scope.contentEmpty = false;
      });
    }
  }

 // changing a user level
  $scope.changeLevel = function(){
    $scope.changeLevelSucess = false;
    $scope.changeLevelShow = true;
  }

  $scope.saveChangeLevel = function(){
    $scope.changeLevelErrorTrigger = false;
    $scope.changeLevelSucess = false;
    if($scope.newLevel === undefined || isNaN($scope.newLevel) || $scope.newLevel > 3){
      $scope.changeLevelErrorTrigger = true;
    }
    profileData.changeLevel($scope.changeLevelUserMobileNumber, $scope.newLevel).error(function(err){
      $scope.changeLevelError = true;
      console.log(err.message);
    }).success(function(){
      $scope.changeLevelShow = false;
    });
  }

  $scope.discardChangeLevel = function(){
    $scope.changeLevelShow = false;
  }


  $scope.backToAccount = function(){
    $location.url('/account');
    $('#nav-news').show();
  }
});
