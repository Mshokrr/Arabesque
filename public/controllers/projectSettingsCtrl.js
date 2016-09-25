app.controller('projectSettingsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

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

  $scope.project = MainSrv.getSelectedProject();
  $scope.firstPrefWorkshops = [];
  $scope.secondPrefWorkshops = [];

  if($scope.project === undefined){
    $location.url("/account");
  }

  $scope.checkDescription = function(){
    $scope.editDescriptionErrorShow = false;
    $scope.editDescriptionSuccessShow = false;
    if($scope.projectDescription === "" || $scope.projectDescription === undefined){
      $scope.editDescriptionError = "Description can't be empty"
      return true;
    }
    else{
      return false;
    }
  }

  $scope.editDescription = function(){
    $scope.editDescriptionErrorShow = $scope.checkDescription();
    if(!$scope.editDescriptionErrorShow){
      var projectInfo = {
        projectID : $scope.project._id,
        projectDescription : $scope.projectDescription
      }
      profileData.editProject(projectInfo).success(function(){
        $scope.editDescriptionSuccessShow = true;
      })
      .error(function(err){
        $scope.editDescriptionErrorShow = true;
        $scope.editDescriptionError = err.message;
        console.log(err);
      })
    }

  }

  $scope.addPhase = function(){
    $scope.addPhaseShow = true;
    $scope.addPhaseErrorShow = false;
    $scope.addPhaseSuccessShow = false;
  }

  $scope.checkAddPhase = function(){
    var flag = false;
    $scope.addPhaseSuccessShow = false;
    $scope.addPhaseErrorShow = false;
    if($scope.addedPhase === "" || $scope.addedPhase === undefined){
      $scope.addPhaseError = "Please enter the phase name";
      flag = true;
    }
    for(var i = 0; i < $scope.project.selectionPhases.length; i++){
      if($scope.project.selectionPhases[i] === $scope.addedPhase){
        $scope.addPhaseErrorShow = true;
        $scope.addPhaseError = "Please avoid duplicate phase names";
        flag = true;
      }
    }
    return flag;
  }

  $scope.saveAddPhase = function(){
    $scope.addPhaseErrorShow = $scope.checkAddPhase();
    if(!$scope.addPhaseErrorShow){
      profileData.addPhase($scope.project._id, $scope.addedPhase).success(function(){
        $scope.addPhaseSuccessShow = true;
      })
      .error(function(err){
        console.log(err);
        $scope.addPhaseError = err.message;
        $scope.addPhaseErrorShow = true;
      })
    }
  }

  $scope.discardAddPhase = function(){
    $scope.addPhaseShow = false;
  }

  $scope.editWorkshops = function(){
    $scope.editWorkshopsShow = true;
  }

  $scope.firstPrefWorkshopsNumberChange = function(){
    $scope.firstPrefWorkshops = [];
    for (var i = 0; i < $scope.firstPrefWorkshopsNumber; i++){
      $scope.firstPrefWorkshops[i] = "";
    }
  }

  $scope.secondPrefWorkshopsNumberChange = function(){
    $scope.secondPrefWorkshops = [];
    for (var i = 0; i < $scope.secondPrefWorkshopsNumber; i++){
      $scope.secondPrefWorkshops[i] = "";
    }
  }

  $scope.checkEditWorkshops = function(){
    var flag = false;
    $scope.editWorkshopsSuccess = false;
    $scope.editWorkshopsErrorShow = false;
    for (var i = 0; i < $scope.firstPrefWorkshopsNumber; i++){
      if($scope.firstPrefWorkshops[i] === undefined || $scope.firstPrefWorkshops[i] === ""){
        flag = true;
        $scope.editWorkshopsError = "Please enter valid workshop names"
      }
    }
    for (var i = 0; i < $scope.secondPrefWorkshopsNumber; i++){
      if($scope.secondPrefWorkshops[i] === undefined || $scope.secondPrefWorkshops[i] === ""){
        flag = true;
        $scope.editWorkshopsError = "Please enter valid workshop names"
      }
    }
    return flag;
  }

  $scope.saveEditWorkshops = function(){

    $scope.editWorkshopsErrorShow = $scope.checkEditWorkshops();
    if(!$scope.editWorkshopsErrorShow){
      if($scope.firstPrefWorkshopsNumber === 0 || $scope.firstPrefWorkshopsNumber === undefined){
        profileData.editWorkshops($scope.project._id, $scope.project.firstPrefWorkshops, $scope.secondPrefWorkshops)
        .success(function(){
          $scope.editWorkshopsSuccess = true;
        })
        .error(function(err){
          console.log(err);
          $scope.editWorkshopsErrorShow = true;
          $scope.editWorkshopsError = err.message;
        });
      }

      if($scope.secondPrefWorkshopsNumber === 0 || $scope.secondPrefWorkshopsNumber === undefined){
        profileData.editWorkshops($scope.project._id, $scope.firstPrefWorkshops, $scope.project.secondPrefWorkshops)
        .success(function(){
          $scope.editWorkshopsSuccess = true;
        })
        .error(function(err){
          console.log(err);
          $scope.editWorkshopsErrorShow = true;
          $scope.editWorkshopsError = err.message;
        });
      }

      else{
        console.log($scope.firstPrefWorkshopsNumber);
        console.log($scope.secondPrefWorkshopsNumber);
        profileData.editWorkshops($scope.project._id, $scope.firstPrefWorkshops, $scope.secondPrefWorkshops)
        .success(function(){
          $scope.editWorkshopsSuccess = true;
        })
        .error(function(err){
          console.log(err);
          $scope.editWorkshopsErrorShow = true;
          $scope.editWorkshopsError = err.message;
        });
      }
    }
  }

  $scope.discardEditWorkshops = function(){
    $scope.firstPrefWorkshopsNumber = undefined;
    $scope.secondPrefWorkshopsNumber = undefined;
    $scope.editWorkshopsShow = false;
  }


  $scope.back = function(){
    $location.url('/manageProjects');
  }

});
