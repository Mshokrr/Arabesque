app.controller('createProjectCtrl', function($scope, $location, AuthSrv, profileData){

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
      $location.url("/");
    }
  })();

  (function navbarResolution(){

    $('ul#nav > li').hide();
    $('#nav-projects').show();
    $('#nav-contact').show();

    $('ul#nav-mobile > li').hide();
    $('#nav-mobile-projects').show();
    $('#nav-mobile-contact').show();

  })();

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.phases = [];
  $scope.workshops = [];

  $scope.phasesNumberChange = function(){
      $scope.phases = [];
      for (var i = 0; i < $scope.phasesNumber; i++){
        $scope.phases[i] = "";
      }
  }

  $scope.workshopsNumberChange = function(){
    $scope.workshops = [];
    for (var i = 0; i < $scope.workshopsNumber; i++){
        $scope.workshops[i] = "";
    }
  }

  var checkFields = function(){
    $scope.error = "";
    if($scope.projectName === undefined || $scope.projectName === ""){
      $scope.error = "Please enter the project name";
      return true;
    }
    if($scope.phasesNumber === undefined || $scope.phasesNumber < 1){
      $scope.error = "Please input valid selection phases";
      return true;
    }
    for (var i = 0; i < $scope.phasesNumber; i++){
      if ($scope.phases[i] === ""){
        $scope.error = "Please input valid selection phases names";
        return true;
      }
    }
    var set = new Set($scope.phases);
    console.log($scope.phases);
    if (set.size !== $scope.phases.length){
      $scope.error = "Please avoid duplicates in phases names";
      return true;
    }
    if($scope.workshopNaming === undefined || $scope.workshopNaming === ""){
      $scope.error = "Please specify the term to describe the workshop";
      return true;
    }
    for (var i = 0; i < $scope.workshopsNumber; i++){
      if ($scope.workshops[i] === ""){
        $scope.error = "Please input valid workshops names";
        return true;
      }
    }
    var set1 = new Set($scope.workshops);
    console.log($scope.workshops);
    if (set1.size !== $scope.workshops.length){
      $scope.error = "Please avoid duplicates in workshops names";
      return true;
    }
    return false;
  }

  $scope.createProject = function(){
    if(!checkFields()){
      console.log(1);
      profileData.createProject($scope.projectName, $scope.projectDescription, $scope.phases, $scope.workshopNaming, $scope.workshops)
      .error(function(err){
        $scope.error = err.message;
      }).success(function(){
        $location.url('/manageProjects');
      });
    }
  }

});
