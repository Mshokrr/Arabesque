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
    replace : true
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
