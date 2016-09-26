app.controller('createProjectCtrl', function($scope, $location, profileData, AuthSrv){

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
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

  // Javascript for parallax effect
  var yPos, header;
  var parallax = function(){
    yPos = window.pageYOffset;
    header = document.getElementById('createProjectHeader');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);

  $scope.createProjectErrorTrigger = false;
  $scope.createProjectSuccess = false;

  $scope.selectionPhases = [];
  $scope.workshops = [];

  $scope.phasesNumberChange = function(){
    $scope.selectionPhases = [];
    var n = $scope.selectionPhasesNumber;
    for (var i=0; i < n; i++){
      $scope.selectionPhases[i] = "";
    }
  }

  $scope.workshopsNumberChange = function(){
    $scope.workshops = [];
    var n = $scope.workshopsNumber;
    for(var i = 0; i < n; i++){
      $scope.workshops[i] = "";
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
    if($scope.selectionPhasesNumber === undefined || $scope.selectionPhasesNumber < 1){
      flag = true;
      $scope.error = "Please input valid selection phases";
    }
    for (var i = 0; i < $scope.selectionPhasesNumber; i++){
      if ($scope.selectionPhases[i] === ""){
        flag = true;
        $scope.error = "Please input valid selection phases names";
      }
    }
    var set = new Set($scope.selectionPhases);
    if (set.size !== $scope.selectionPhases.length){
      flag = true;
      $scope.error = "Please avoid duplicates in phases names";
    }

    for (var i = 0; i < $scope.workshopsNumber; i++){
      if ($scope.workshops[i] === ""){
        flag = true;
        $scope.error = "Please input valid workshops names";
      }
    }
    var set1 = new Set($scope.workshops);
    if (set1.size !== $scope.workshops.length){
      flag = true;
      $scope.error = "Please avoid duplicates in workshops names";
    }
    return flag;
  }

  $scope.createProject = function(){
    $scope.createProjectErrorTrigger = $scope.checkFields();
    $scope.createProjectSuccess = false;
    if(!$scope.createProjectErrorTrigger){
      profileData.createProject($scope.projectName, $scope.projectDescription, $scope.selectionPhases, $scope.workshops)
      .error(function(err){
        $scope.createProjectErrorTrigger = true;
        $scope.error = err.message;
      }).success(function(){
        $scope.createProjectSuccess = true;
      });
    }

  }

  $scope.backToAccount = function(){
    $('#nav-news').show();
    $location.url('/account');
  }

});
