app.controller('newsCtrl', function($scope, $http, AuthSrv, profileData){

  var currentUser = AuthSrv.currentUser();
  var viewerLevel;
  if (currentUser === undefined){
    viewerLevel = 0;
  }
  else{
    viewerLevel = currentUser.level;
  }
  console.log(viewerLevel);

  (function getNews(){
    $http.get('/api/getNews').success(function(data){
      $scope.news = data;
      $scope.noNews = ($scope.news.length === 0);
    });
  })();

});
