app.controller('newsCtrl', function($scope, $http, AuthSrv, profileData){

  var currentUser = AuthSrv.currentUser();
  var viewerLevel;
  if (currentUser === undefined){
    viewerLevel = 0;
  }
  else{
    viewerLevel = currentUser.level;
  }

  $scope.admin = (viewerLevel > 2);

  (function getNews(){
    $http.get('/api/getNews/'+viewerLevel).success(function(data){
      $scope.news = data;
      $scope.noNews = ($scope.news.length === 0);
    });
  })();

  $scope.deleteNews = function(news){
    profileData.deleteNews(news._id).error(function(err){
      console.log(err);
    })
    .success(function(){
      $http.get('/api/getNews/'+viewerLevel).success(function(data){
        $scope.news = data;
        console.log(data);
        $scope.noNews = ($scope.news.length === 0);
      });
    });
  }

});
