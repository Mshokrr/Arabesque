app.controller('createProjectCtrl', function($scope, $location, profileData, AuthSrv){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
  })();

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

  $scope.createprojectErrorTrigger = false;
  $scope.createProjectSuccess = false;

  $scope.selectionPhases = [];

  $scope.phasesNumberChange = function(){
    $scope.selectionPhases = [];
    var n = $scope.selectionPhasesNumber;
    for (var i=0; i < n; i++){
      $scope.selectionPhases[i] = "";
    }
  }

  $scope.checkFields = function(){
    var flag = false;
    if($scope.projectName === undefined){
      flag = true;
      $scope.error = "Please enter a name for the project";
    }
    if($scope.projectDescription === undefined){
      flag = true;
      $scope.error = "Please enter a description for the project";
    }
    if($scope.selectionPhasesNumber === undefined || $scope.selectionPhasesNumber < 2){
      flag = true;
      $scope.error = "Please input valid selection phases";
    }
    return flag;
  }

  $scope.createProject = function(){
    $scope.createProjectErrorTrigger = $scope.checkFields();
    $scope.createProjectSuccess = false;
    if(!$scope.createProjectErrorTrigger){
      profileData.createProject($scope.projectName, $scope.projectDescription, $scope.selectionPhases)
      .error(function(err){
        $scope.createprojectErrorTrigger = true;
        $scope.error = err.message;
      }).success(function(){
        $scope.createProjectSuccess = true;
      });
    }

  }

  $scope.backToAccount = function(){
    $location.url('/account');
  }

});
