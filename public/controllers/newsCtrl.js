app.controller('newsCtrl', function($scope, $http, AuthSrv, profileData){

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.admin = ($scope.user.level > 2);
    $scope.member = ($scope.user.level > 1);
  })
  .error(function(err){
    console.log(err);
  });

  (function getNews(){
    $http.get('/api/getNews').success(function(data){
      $scope.news = data;
    });
  })();

});
