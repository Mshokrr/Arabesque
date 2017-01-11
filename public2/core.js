app = angular.module('arabesqueApp', ['ngRoute', 'ngFileUpload', 'ui.materialize']);

app.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl : 'partials/main.html',
    controller : 'mainCtrl'
  });

});

app.directive('homeHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'includes/header.html',
    controller: 'parallaxInit',
    replace : true
  }
});

app.directive('aboutDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'includes/about.html',
  }
});

app.directive('projectsDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'includes/projects.html',
  }
});

app.directive('middleParallax', function(){
  return {
    restrict: 'E',
    templateUrl: 'includes/middle.html',
    controller: 'parallaxInit'
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
