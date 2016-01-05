justBallz.controller('JustBallzController',['$scope', function($scope){
  $scope.heading = 'rotate(180deg)';

  $scope.connect = function(){
    $scope.viewPane = 2;
  };

  $scope.connected = function(){
    $scope.viewPane = 3;
  };

  $scope.disconnect= function(){
    $scope.viewPane = 1;
  };
}]);
