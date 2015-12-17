describe("The movement commands for Sphero", function() {
  var commands, orb;
  var DEFAULT_SPEED = 50;

  beforeEach(function() {
    orb = {
      stop: function(){},
      color: function(color){},
      roll: function(speed, heading){}
    };
    commands = new MovementCommands (orb);
  });

  describe('#stop', function(){

    it("should stop a sphero", function() {
      spyOn(orb, 'stop');
      commands.stop();
      expect(orb.stop).toHaveBeenCalled();
    });

    it("changes color when it has stopped", function(){
      spyOn(orb, 'color');
      commands.stop();
      expect(orb.color).toHaveBeenCalledWith('red');
    });
  });

  describe('#forward',function(){
    it('rolls the ball forward', function(){
      spyOn(orb, 'roll');
      commands.roll(DEFAULT_SPEED, commands.directions.FORWARD);
      expect(orb.roll).toHaveBeenCalledWith(50, 0);
    });

    it('changes color when in motion',function(){
      spyOn(orb, 'color');
      commands.roll(DEFAULT_SPEED, commands.directions.FORWARD);
      expect(orb.color).toHaveBeenCalledWith('blue');
    });
  });
});
