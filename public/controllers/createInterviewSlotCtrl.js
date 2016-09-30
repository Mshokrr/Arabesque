app.controller('createInterviewSlotCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.member = ($scope.user.level > 1);
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.project = MainSrv.getSelectedProject();

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.project === undefined) {
      $location.url("/");
    }
  })();

  $scope.phases = {
    selected : null,
    options : $scope.project.selectionPhases
  }

  $scope.createSlot = function(){
    console.log($scope.date);
  }

  $scope.back = function(){
    $location.url('/projects');
  }

});
