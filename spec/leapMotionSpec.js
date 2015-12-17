describe('Leap Motion:', function(){

  describe('#concatData', function(){
    it('simplifies the data output from the leapmotion frame', function(){
        expect(concatData('Hand', 'right')).toEqual('Hand: right');
    });
  });
});
