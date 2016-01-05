describe('JustBallz Controller', function(){
  describe('justBallzController',function(){
    beforeEach(module('JustBallz'));

    var ctrl,scope;

    beforeEach(inject(function($controller){
      scope = {};
      ctrl = $controller('JustBallzController', {$scope:scope});
      console.log("hello");
    }));

    describe('#connect', function() {

      it('it has a connect function',function(){
        expect(scope.connect).toBeDefined();
      });

      it('changes the view variable', function() {
        scope.connect();
        expect(scope.viewPane).toEqual(2);
      });

    });

    describe("#connected",function(){

      it('it has a connected function',function(){
        expect(scope.connected).toBeDefined();
      });

      it('changes the view variable', function(){
        scope.connected();
        expect(scope.viewPane).toEqual(3);
      });
    });
    it('it has a disconnect function', function(){
      expect(scope.disconnect).toBeDefined();
    });


  });
});
