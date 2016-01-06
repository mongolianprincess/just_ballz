describe('Steering System:', function(){

  beforeEach(function() {
    var hand;
    orb = { roll: function(speed, heading){},
            disconnect: function(){}
          };
  });

  describe('#handleRight', function() {

    it('assigns direction in upperLeftQuadrant', function() {
      hand = { palmPosition: [-50, null, -40],
               grabStrength: 0.8 };
      handleRight(hand);
      expect(heading).toEqual(308.6598082540901);
    });

    it('assigns direciton in lowerLeftQuadrant', function() {
      hand = { palmPosition: [-50, null, 40],
               grabStrength: 0.8 };
      handleRight(hand);
      expect(heading).toEqual(231.34019174590992);
    });

    it('assigns direction in lowerRightQuadrant', function() {
      hand = { palmPosition: [50, null, 40],
               grabStrength: 0.8} ;
      handleRight(hand);
      expect(heading).toEqual(128.65980825409008);
    });

    it('assigns direction in upperRightQuadrant', function() {
      hand = { palmPosition: [50, null, -40],
               grabStrength: 0.8 };
      handleRight(hand);
      expect(heading).toEqual(51.34019174590991);
    });

    it('recognises a deadzone', function() {
      hand = { palmPosition: [0, null, 0],
               grabStrength: 0.8 };
      handleRight(hand);
      expect(inDeadZone).toBeTruthy();
    });

    it('recognises when not in deadzone', function() {
      hand = { palmPosition: [50, null, -40],
               grabStrength: 0.8 };
      handleRight(hand);
      expect(inDeadZone).toBeFalsy();
    });

    it('disconnects the sphero',function(){
      hand = { palmPosition: [50, null, -40],
               grabStrength:1 };
      handleRight(hand);
      expect(isDisconnected).toBeTruthy();
    });
  });
});
