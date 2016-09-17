app.controller('manageProjectsCtrl', function($scope, $location, profileData, AuthSrv, MainSrv){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
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
    header = document.getElementById('manageProjectsHeader');
    if(header !== null){
      header.style.top = yPos * 0.5 + 'px';
    }
  }
  window.addEventListener('scroll', parallax);


  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.admin = ($scope.user.level > 2);
  })
  .error(function(err){
    console.log(err);
  });

  profileData.getAllProjects()
  .success(function(data){
    $scope.projects = data;
  })
  .error(function(err){
    console.log(err);
    $scope.error = err.message;
  });

  $scope.toggleProject = function(project){
    profileData.toggleProjectStatus(project._id)
    .error(function(err){
        console.log(err.message);
    });
  }

  $scope.goToProjectSettings = function(project){
    MainSrv.setSelectedProject(project);
    $location.url('projectSettings');
  }

  $scope.backToAccount = function(){
    $('#nav-news').show();
    $location.url('/account');
  }

});
