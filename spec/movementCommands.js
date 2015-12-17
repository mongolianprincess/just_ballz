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

  describe('MovementCommands instantiation', function(){
    it('has a default speed', function() {
      expect(commands.DEFAULT_SPEED).toEqual(50);
    });

    it('has directions',function() {
      expect(commands.directions).toEqual({
        FORWARD: 0,
        SMALL_RIGHT: 45,
        MEDIUM_RIGHT: 90,
        LARGE_RIGHT: 135,
        BACKWARD: 180,
        LARGE_LEFT: 225,
        MEDIUM_LEFT: 270,
        SMALL_LEFT: 315
      });
    });
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
