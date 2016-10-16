app.controller('projectsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  (function unauthorizedAccess(){
    if (!(AuthSrv.isLoggedIn())) {
      $location.url("/");
    }
  })();

  (function navbarResolution(){
    $('#nav-news').hide();
  })();

  // Javascript for parallax effect
  var yPos, header;
  var parallax = function(){
    yPos = window.pageYOffset;
    header = document.getElementById('projectsHeader');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);


  $scope.error = false;
  $scope.particiationSuccess = false;

  profileData.getProjects()
  .success(function(data){
    $scope.projects = data;
    $scope.noProjects = ($scope.projects.length === 0);
  })
  .error(function(err){
    console.log(err);
    $scope.error = true;
    $scope.errMessage = err.message;
  });

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.member = ($scope.user.level > 1);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.participateInProject = function(project){

    MainSrv.setSelectedProject(project);
    $location.url('/confirmParticipation');
  }

  $scope.goToProjectParticipants = function(project){
    MainSrv.setSelectedProject(project);
    $location.url('/participants');
  }

  $scope.createInterviewSlot = function(project){
    MainSrv.setSelectedProject(project);
    $location.url('/createInterviewSlot');
  }

  $scope.manageInterviewSlots = function(project){
    MainSrv.setSelectedProject(project);
    $location.url('/manageInterviewSlots');
  }

  $scope.backToAccount = function(){
    $('#nav-news').show();
    $location.url('/account');
  }

});
