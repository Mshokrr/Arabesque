app.controller('createProjectCtrl', function($scope, $location, profileData, AuthSrv){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
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

  $scope.createProject = function(){
    $scope.createprojectErrorTrigger = false;
    $scope.createProjectSuccess = false;
    profileData.createProject($scope.projectName, $scope.projectDescription, $scope.selectionPhases)
    .error(function(err){
      $scope.createprojectErrorTrigger = true;
      $scope.error = err.message;
    }).success(function(){
      $scope.createProjectSuccess = true;
    });
  }

});
