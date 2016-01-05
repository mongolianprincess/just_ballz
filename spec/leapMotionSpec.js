describe('Steering System:', function(){

  beforeEach(function() {
    orb = { roll: function(a,b){},
            disconnect: function(){}
          };
  });

  describe('#handleRight', function() {

    it('upperLeftQuadrant', function() {
      var hand = { palmPosition: [-50, null, -40] };
      handleRight(hand);
      expect(heading).toEqual(308.6598082540901);
    });

    it('lowerLeftQuadrant', function() {
      var hand = { palmPosition: [-50, null, 40] };
      handleRight(hand);
      expect(heading).toEqual(231.34019174590992);
    });

    it('lowerRightQuadrant', function() {
      var hand = { palmPosition: [50, null, 40] };
      handleRight(hand);
      expect(heading).toEqual(128.65980825409008);
    });

    it('upperRightQuadrant', function() {
      var hand = { palmPosition: [50, null, -40] };
      handleRight(hand);
      expect(heading).toEqual(51.34019174590991);
    });

    it('recognises a deadzone', function() {
      var hand = { palmPosition: [0, null, 0] };
      handleRight(hand);
      expect(inDeadZone).toBeTruthy();
    });

    it('recognises when not in deadzone', function() {
      var hand = { palmPosition: [50, null, -40] };
      calculateHeading(hand);
      expect(inDeadZone).toBeFalsy();
    });

  });
});
