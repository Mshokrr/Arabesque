app.controller('newsCtrl', function($scope, $http, AuthSrv, profileData){

  var currentUser = AuthSrv.currentUser();
  var viewerLevel;
  if (currentUser === undefined){
    viewerLevel = 0;
  }
  else{
    viewerLevel = currentUser.level;
  }

  (function getNews(){
    $http.get('/api/getNews/'+viewerLevel).success(function(data){
      $scope.news = data;
      $scope.noNews = ($scope.news.length === 0);
    });
  })();

});
