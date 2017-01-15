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
    templateUrl: 'directives/news.html'
  }
});

app.directive('adminDirective', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/admin.html',
    controller: 'adminCtrl'
  }
})

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
