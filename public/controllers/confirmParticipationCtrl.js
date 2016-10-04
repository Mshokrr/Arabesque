app.controller('confirmParticipationCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  $scope.project = MainSrv.getSelectedProject();

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn()) || $scope.project === undefined) {
      $location.url("/");
    }
  })();

  $scope.project = MainSrv.getSelectedProject();
  $scope.noFirstPref = ($scope.project.firstPrefWorkshops.length === 0);
  $scope.noSecondPref = ($scope.project.secondPrefWorkshops.length === 0);

  $scope.firstPrefWorkshops = {
    selected : null,
    options : $scope.project.firstPrefWorkshops
  };

  $scope.secondPrefWorkshops = {
    selected: null,
    options : $scope.project.secondPrefWorkshops
  }

  $scope.checkFields = function(){
    var flag = false;
    $scope.error = false;
    if($scope.firstPrefWorkshops.selected === null && $scope.noFirstPref === false){
      $scope.errMessage = "Please enter your first preference"
      flag = true;
    }
    else{
      if(($scope.firstPrefWorkshops.selected === $scope.secondPrefWorkshops.selected) && !$scope.noFirstPref && !$scope.noSecondPref){
        $scope.errMessage = "Please enter different preferences"
        flag = true;
      }
    }
    if($scope.academicYear === undefined || $scope.academicYear === ""){
      $scope.errMessage = "Please enter your academic year"
      flag = true;
    }
    return flag;
  }

  $scope.participate = function(){
    $scope.participationSuccess = false;
    $scope.error = $scope.checkFields();
    if (!$scope.error){
      profileData.participateInProject($scope.project._id, $scope.project.name, $scope.firstPrefWorkshops.selected, $scope.secondPrefWorkshops.selected, $scope.academicYear)
      .success(function(){
        $scope.participationSuccess = true;
      })
      .error(function(err){
        console.log(err);
        $scope.error = true;
        $scope.errMessage = err.message;
      });
    }
  }
  $scope.back = function(){
    $location.url('/projects');
  }
});
