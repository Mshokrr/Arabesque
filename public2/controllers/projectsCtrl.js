app.controller('projectsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

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

  profileData.getProjects()
  .success(function(data){
    $scope.projects = data;
    $scope.noProjects = ($scope.projects.length === 0);
  })
  .error(function(err){
    console.log(err);
  });

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.member = ($scope.user.level > 1);
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.createProject = function(){
    $location.url('/createProject');
  }

  $scope.manageProjects = function(){
    $location.url('/manageProjects');
  }

  $scope.participate = function(project){
    $scope.preferenceEmpty = false;
    $scope.academicYearEmpty = false;
    $scope.academicYear = undefined;
    $scope.selectedProject = project;
    $scope.firstPrefWorkshops = {
      selected : null,
      options : project.firstPrefWorkshops
    }
    $scope.secondPrefWorkshops = {
      selected : null,
      options : project.secondPrefWorkshops
    }
    $('#participateModal').modal('open');
  }

  $scope.participants = function(project){
    MainSrv.setSelectedProject(project);
    $location.url('/participants');
  }

  $scope.interviews = function(project){
    MainSrv.setSelectedProject(project);
    $location.url('/interviews');
  }

  $scope.confirmParticipation = function(){
    var flag = false;
    if($scope.firstPrefWorkshops.selected === null || $scope.secondPrefWorkshops.selected === null ||
    $scope.firstPrefWorkshops.selected === $scope.secondPrefWorkshops.selected){
      $scope.preferenceEmpty = true;
      flag = true;
    }
    if($scope.academicYear === undefined){
      $scope.academicYearEmpty = true;
      flag = true;
    }
    if(!flag){
      $('#participateModal').modal('close');
      profileData.participateInProject($scope.user._id, $scope.selectedProject._id, $scope.selectedProject.name, $scope.firstPrefWorkshops.selected, $scope.secondPrefWorkshops.selected, $scope.academicYear)
      .success(function(){
        $scope.feedback = "Participation request sent.";
        $('#confirmParticipationModal').modal('open');
      })
      .error(function(err){
        $scope.feedback = "You are already a participant.";
        $('#confirmParticipationModal').modal('open');
      });
    }
  }

});
