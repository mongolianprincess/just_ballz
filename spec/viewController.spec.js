describe('seperation of views: ', function(){
  describe('ViewController',function(){
      var ctrl, scope;
      beforeEach(module('JustBallz'));

      beforeEach(inject(function($controller){
        scope = {};
        ctrl = $controller('ViewController', {$scope: scope});
      }));

      it('starts with the default view shown',function(){
        expect(ctrl.viewPane).toBeUndefined();
      });

      xit('can check which view should currently be shown',function(){

      });
  });
});
