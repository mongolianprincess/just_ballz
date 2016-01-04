describe('JustBallzController', function(){

  beforeEach(module('JustBallz'));

  var ctrl;

  beforeEach(inject(function($controller){
    ctrl = $controller('JustBallzController');
  }));

  it('initializes with an empty input field',function(){
    expect(ctrl.orbName).toBeUndefined();
  });
});
