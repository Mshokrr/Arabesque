app.controller('newsCtrl', function($scope, $http, AuthSrv, profileData){
  console.log("ahlan wasahlan");

  profileData.getProfile()
  .success(function(data){
    $scope.user = data;
    $scope.admin = ($scope.user.level > 2);
    $scope.member = ($scope.user.level > 1);
  })
  .error(function(err){
    console.log(err);
  });

  $scope.news = [];
  (function getNews(){
    $http.get('/api/getNews').success(function(data){
      $scope.news = data;
      console.log($scope.news);
    });
  })();

});
