app = angular.module('arabesqueApp', ['ngRoute', 'ngFileUpload']);

app.config(function($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl : '/partials/main.html',
		controller  : 'mainCtrl',
		css : 'css/main.css'
	})
	.when('/account', {
		templateUrl: '/partials/account.html',
		controller: 'accountCtrl',
		css: 'css/account.css'
	})
	.when('/signUp', {
		templateUrl: '/partials/signUp.html',
		controller: 'signUpCtrl',
		css: 'css/signUp.css'
	})
	.when('/signUpComplete', {
		templateUrl: 'partials/signUpComplete.html',
		controller: 'signUpCompleteCtrl'
	})
	.when('/accountSettings', {
		templateUrl: 'partials/accountSettings.html',
		controller: 'accountSettingsCtrl',
		css: 'css/accountSettings.css'
	})
	.when('/member', {
		templateUrl: 'partials/member.html',
		controller: 'memberCtrl'
	})
	.when('/upload', {
		templateUrl: 'partials/upload.html',
		controller: 'uploadCtrl'
	})
	.when('/contactDevs', {
		templateUrl: 'partials/contactDevs.html',
		controller: 'contactDevsCtrl'
	})
	.when('/admin', {
		templateUrl: 'partials/admin.html',
		controller: 'adminCtrl',
		css: 'css/admin.css'
	})
	.when('/createProject', {
		templateUrl: 'partials/createProject.html',
		controller: 'createProjectCtrl'
	})
	.when('/manageProjects', {
		templateUrl: 'partials/manageProjects.html',
		controller: 'manageProjectsCtrl'
	})
	.when('/projects', {
		templateUrl: 'partials/projects.html',
		controller: 'projectsCtrl'
	})
	.when('/activity', {
		templateUrl: 'partials/activity.html',
		controller: 'activityCtrl'
	})
	.when('/projectSettings', {
		templateUrl: 'partials/projectSettings.html',
		controller: 'projectSettingsCtrl'
	})
	.when('/participants', {
		templateUrl: 'partials/participants.html',
		controller: 'participantsCtrl',
		css: 'css/participants.css'
	})
	.when('/confirmParticipation', {
		templateUrl: 'partials/confirmParticipation.html',
		controller: 'confirmParticipationCtrl',
		css: 'css/confirmParticipation.css'
	})
	.when('/participantDetails', {
		templateUrl: 'partials/participantDetails.html',
		controller: 'participantDetailsCtrl',
		css: 'css/participantDetails.css'
	})
	.when('/createInterviewSlot', {
		templateUrl: 'partials/createInterviewSlot.html',
		controller: 'createInterviewSlotCtrl'
	})
	.when('/reserveInterviewSlot', {
		templateUrl: 'partials/reserveInterviewSlot.html',
		controller: 'reserveInterviewSlotCtrl'
	});

});

app.directive('head', ['$rootScope','$compile',
function($rootScope, $compile){
	return {
		restrict: 'E',
		link: function(scope, elem){
			var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
			elem.append($compile(html)(scope));
			scope.routeStyles = {};
			$rootScope.$on('$routeChangeStart', function (e, next, current) {
				if(current && current.$$route && current.$$route.css){
					if(!angular.isArray(current.$$route.css)){
						current.$$route.css = [current.$$route.css];
					}
					angular.forEach(current.$$route.css, function(sheet){
						delete scope.routeStyles[sheet];
					});
				}
				if(next && next.$$route && next.$$route.css){
					if(!angular.isArray(next.$$route.css)){
						next.$$route.css = [next.$$route.css];
					}
					angular.forEach(next.$$route.css, function(sheet){
						scope.routeStyles[sheet] = sheet;
					});
				}
			});
		}
	};
}
]);

app.directive("newsComponent", function() {
    return {
        templateUrl: 'partials/newsComponent.html',
        controller: "newsCtrl"
    };
});

app.directive("dashboardComponent", function() {
    return {
        templateUrl: 'partials/dashboard.html',
        controller: "dashboardCtrl"
    };
});

app.directive("galleryComponent", function(){
		return {
			templateUrl: 'partials/galleryComponent.html',
			controller: "galleryCtrl"
		}
});
