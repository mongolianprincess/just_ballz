describe("Sphero", function() {
  var sphero;

  spyOn(Sphero, 'color', 'roll');

  beforeEach(function() {
    sphero = new SpheroCommands();
    });

    it("should #stop a sphero", function() {
      sphero.stopSphero();
      expect(sphero.color).toHaveBeenCalled();
  });
});
