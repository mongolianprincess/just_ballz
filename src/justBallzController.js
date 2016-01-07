justBallz.controller('JustBallzController',['$scope', '$window', function($scope, $window){
  $scope.heading = 'rotate(180deg)';
  $scope.setConnected = function(){
    $scope.connected = $window.connected;
  };
  $scope.viewPane = 1;

  $scope.isInView = function(viewPane){
    return $scope.viewPane === viewPane;
  };

  $scope.submit = function(){
    $scope.orbName = $scope.name;
    $scope.viewPane = 2;
    $scope.setConnected();
  };

  $scope.connect = function(){
    $scope.viewPane = 3;
    $scope.setConnected();
  };

  $scope.connected = function(){
    $scope.viewPane = 4;

  };

  $scope.disconnect= function(){
    $scope.viewPane = 1;

  };


}]);
