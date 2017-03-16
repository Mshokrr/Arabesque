app = angular.module('arabesqueApp', ['ngRoute', 'ngFileUpload', 'ui.materialize']);

app.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl : 'partials/main.html',
    controller : 'mainCtrl'
  })
  .when('/signUp', {
    templateUrl : 'partials/signUp.html',
    controller : 'signUpCtrl'
  })
  .when('/account', {
    templateUrl : 'partials/account.html',
    controller : 'accountCtrl'
  })
  .when('/projects', {
    templateUrl: 'partials/projects.html',
    controller: 'projectsCtrl'
  })
  .when('/createProject', {
    templateUrl: 'partials/createProject.html',
    controller: 'createProjectCtrl'
  })
  .when('/manageProjects', {
    templateUrl: 'partials/manageProjects.html',
    controller: 'manageProjectsCtrl'
  })
  .when('/projectSettings', {
    templateUrl: 'partials/projectSettings.html',
    controller: 'projectSettingsCtrl'
  })
  .when('/participants', {
    templateUrl: 'partials/participants.html',
    controller: 'participantsCtrl'
  })
  .when('/participantDetails', {
    templateUrl: 'partials/participantDetails.html',
    controller: 'participantDetailsCtrl'
  })
  .when('/activity', {
    templateUrl: 'partials/activity.html',
    controller: 'activityCtrl'
  })
  .when('/interviews', {
    templateUrl: 'partials/interviews.html',
    controller: 'interviewsCtrl'
  });

});

app.directive('homeHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/header.html',
    controller: 'parallaxInit',
    replace : true
  }
});

app.directive('aboutDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/about.html',
  }
});

app.directive('projectsDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/projects.html',
  }
});

app.directive('middleParallax', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/middle.html',
    controller: 'parallaxInit'
  }
});

app.directive('newsDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/news.html',
    controller: 'newsCtrl'
  }
});

app.directive('adminDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/admin.html',
    controller: 'adminCtrl'
  }
});

app.directive('dashboardDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/dashboard.html',
    controller: 'dashboardCtrl'
  }
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(e) {
            if(e.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'e': e});
                });
                e.preventDefault();
            }
        });
    };
});
