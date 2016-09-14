app.controller('projectsCtrl', function($scope, $location, profileData, AuthSrv){

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
  })
  .error(function(err){
    console.log(err);
    $scope.error = true;
    $scope.errMessage = err.message;
  });

  $scope.participateInProject = function(project){
    $scope.participationSuccess = false;
    $scope.error = false;
    profileData.participateInProject(project._id, project.name).success(function(){
      $scope.participationSuccess = true;
    }).error(function(err){
      console.log(err);
      $scope.error = true;
      $scope.errMessage = err.message;
    })
  }

  $scope.backToAccount = function(){
    $('#nav-news').show();
    $location.url('/account');
  }

});
