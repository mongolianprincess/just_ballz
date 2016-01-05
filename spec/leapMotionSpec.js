describe('Steering System:', function(){

  // describe('#concatData', function(){
  //   it('simplifies the data output from the leapmotion frame', function(){
  //       expect(concatData('Hand', 'right')).toEqual('Hand: right');
  //   });
  // });

  describe('Upper Left Quadrant', function() {

    beforeEach(function(){
      var x = -30;
      var z = -40;
    });

    it('correctly translates palm position to a heading', function() {
      var arctan = (Math.atan(Math.abs(x)/Math.abs(z))*180/Math.PI);

    });
  });
});
