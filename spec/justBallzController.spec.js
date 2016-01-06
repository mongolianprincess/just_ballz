describe('JustBallz Controller', function(){
  describe('justBallzController',function(){
    beforeEach(module('JustBallz'));

    var ctrl,scope;

    beforeEach(inject(function($controller){
      scope = {};
      ctrl = $controller('JustBallzController', {$scope:scope});
    }));

    it('starts with the default view shown',function(){
      expect(scope.viewPane).toBeDefined();
      expect(scope.isInView(scope.viewPane)).toBeTruthy();
    });

    describe('#connect', function() {

      it('it has a connect function',function(){
        expect(scope.connect).toBeDefined();
      });

      it('changes the view variable', function() {
        scope.connect();
        expect(scope.viewPane).toEqual(3);
      });

    });

    describe("#connected",function(){

      it('it has a connected function',function(){
        expect(scope.connected).toBeDefined();
      });

      it('changes the view variable', function(){
        scope.connected();
        expect(scope.viewPane).toEqual(4);
      });
    });

    describe("#disconnect",function(){
      it('it has a disconnect function', function(){
        expect(scope.disconnect).toBeDefined();
      });

      it('changes the view variable when disconnected', function() {
        scope.disconnect();
        expect(scope.viewPane).toEqual(1);
      });
    });
  });
});
