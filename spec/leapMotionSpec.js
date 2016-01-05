describe('Steering System:', function(){

  describe('#calculateHeading', function() {

    beforeEach(function() {
      var x, z, arctan, heading, inDeadZone;
    });

    it('upperLeftQuadrant', function() {
      var hand = { palmPosition: [-50, null, -40] };
      calculateHeading(hand);
      expect(heading).toEqual(308.6598082540901);
    });

    it('lowerLeftQuadrant', function() {
      var hand = { palmPosition: [-50, null, 40] };
      calculateHeading(hand);
      expect(heading).toEqual(231.34019174590992);
    });

    it('lowerRightQuadrant', function() {
      var hand = { palmPosition: [50, null, 40] };
      calculateHeading(hand);
      expect(heading).toEqual(128.65980825409008);
    });

    it('upperRightQuadrant', function() {
      var hand = { palmPosition: [50, null, -40] };
      calculateHeading(hand);
      expect(heading).toEqual(51.34019174590991);
    });

  });
});
