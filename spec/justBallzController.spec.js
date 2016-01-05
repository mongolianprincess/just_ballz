describe('JustBallz Controller', function(){
  describe('justBallzController',function(){
    beforeEach(module('JustBallz'));

    var ctrl,scope;

    beforeEach(inject(function($controller){
      scope = {};
      ctrl = $controller('JustBallzController', {$scope:scope});
      console.log("hello");
    }));

    it('initializes with an empty input field',function(){
      expect(scope.connect).toBeUndefined();
    });
  });
});
