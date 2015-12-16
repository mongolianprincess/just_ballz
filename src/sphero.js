"use strict";

var orb = sphero(process.env.PORT);

function SpheroCommands() {
}

SpheroCommands.prototype.stopSphero = function() {
  orb.color('blue');
  orb.stop();
};

SpheroCommands.prototype.goSphero = function() {
  orb.color('magenta');
  orb.roll(50,0,1);
};

SpheroCommands.prototype.leftSphero = function() {
  orb.color('red');
  orb.roll(50,270,1);
};

SpheroCommands.prototype.rightSphero = function() {
  orb.color('yellow');
  orb.roll(50,90,1);
};
