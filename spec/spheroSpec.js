describe("Sphero", function() {
  var ball;

  spyOn(Sphero, 'color', 'roll');

  beforeEach(function() {
    ball = new SpheroCommands();
    });

    it("should #stop a sphero", function() {
      ball.stopSphero();
      expect(Sphero.color).toHaveBeenCalled();
  });
});
