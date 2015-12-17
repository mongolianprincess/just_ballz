describe("The movement commands for Sphero", function() {
  var commands, orb;

  beforeEach(function() {
    orb = {
      stop: function(){}
    };
    commands = new MovementCommands(orb);
  });

    describe('#stop', function(){

    it("should stop a sphero", function() {
      spyOn(orb, 'stop');
      commands.halt();
      expect(orb.stop).toHaveBeenCalled();
    });

    it("it should change color when it has stopped", function(){

    });
  });
});
