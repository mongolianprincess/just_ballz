justBallz.controller('JustBallzController',['$scope', function($scope){
  $scope.heading = 'rotate(180deg)';

  $scope.submit = function(){
    $scope.orbName = $scope.name;
    $scope.viewPane = 2;
  };

  $scope.connect = function(){
    $scope.viewPane = 3;
  };

  $scope.connected = function(){
    $scope.viewPane = 4;
  };

  $scope.disconnect= function(){
    $scope.viewPane = 1;
  };
}]);
