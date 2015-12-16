var Leap = require("leapjs");

var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
  console.log(frame);
});
