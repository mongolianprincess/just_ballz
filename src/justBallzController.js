
justBallz.controller('JustBallzController',['$scope', '$window', function($scope, $window){
  $scope.viewPane = 1;
  $scope.$watch(function(){
    return $window.connected;
  },
  function(n,o){
    console.log("changed",n);
    $scope.setConnected();
    if($scope.connected === true){
      $scope.viewPane = 4;
      $scope.checkStatus();

    } else if ($scope.connected === 'not connecting') {
      $scope.viewPane = 2;
    }
  }
);
  $scope.watcher = function(){
    console.log('15 seconds until digest');
    setTimeout(function(){
      $scope.$digest();
      if($scope.connected === false){
        $window.connected = "not connecting";
      }
      $scope.$digest();
      console.log('digest ran');
    }, 15000);
  };
  $scope.setConnected = function(){
    $scope.connected = $window.connected;
  };
  $scope.isInView = function(viewPane){
    return $scope.viewPane === viewPane;
  };
  $scope.submit = function(){
    $scope.orbName = $scope.name;
    $scope.viewPane = 2;
    //updates connected variable
    $scope.setConnected();
  };
  $scope.connect = function(){
    $scope.viewPane = 3;
    $scope.watcher();
  };
  $scope.connected = function(){
    $scope.viewPane = 4;
  };
  $scope.disconnect= function(){
    $scope.viewPane = 1;
  };

  $scope.checkStatus = function (){
    setTimeout(function(){
      console.log('running a digest');
      $scope.$digest();
      $scope.setConnected();

      setTimeout(function(){
      if($scope.connected === false){
        $scope.viewPane = 2;
      }
    }, 1000);
    }, 10000);
  };

}]);
