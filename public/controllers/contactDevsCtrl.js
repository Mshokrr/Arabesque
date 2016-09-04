app.controller('contactDevsCtrl', function($scope, $location, $http, AuthSrv, profileData){

  (function unauthorizedAccess(){
    if (AuthSrv.getToken() === undefined) {
      $location.url("/");
    }
  })();

  $scope.emptySubject = false;
  $scope.emptyBody = false;

  $scope.send = function(){

    var subj = $scope.subject;
    var message = $scope.body;

    if(subj == undefined){
      $scope.emptySubject = true;
    }

    if(message == undefined){
      $scope.emptyBody = true;
    }

    if(!$scope.emptyBody && !$scope.emptySubject){

      //ready to send

      profileData.getProfile().success(function(userInfo){
        // $http.post('/api/contactDevs', {
        //   firstName: userInfo.firstName,
        //   lastName: userInfo.lastName,
        //   email: userInfo.email,
        //   subject: subj,
        //   body: message
        // });
      });

      $scope.sent = true;

    }

  }

  $scope.backToAccount = function(){
    $location.url('/account');
  }


});
