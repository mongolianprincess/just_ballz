describe('JustBallz Controller', function(){
  describe('justBallzController',function(){
    beforeEach(module('JustBallz'));

    var ctrl,scope;

    beforeEach(inject(function($controller){
      scope = {};
      ctrl = $controller('JustBallzController', {$scope:scope});
      console.log("hello");
    }));

    it('it has a connect function',function(){
      expect(scope.connect).toBeDefined();
    });

    it('it has a connected function',function(){
      expect(scope.connected).toBeDefined();
    });

    it('it has a disconnect function', function(){
      expect(scope.disconnect).toBeDefined();
    });

  });
});
