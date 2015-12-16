var Leap = require("leapjs");
var framestring;
var hand;
var controllerOptions = {enableGestures: true};

function concatData(id, data){
  return id + ": " + data;
}

Leap.loop(controllerOptions, function(frame) {
  // framestring = concatData("Frame Number", frame.id);

  framestring = concatData("Grab Strength", frame.hands[0].grabStrength.toPrecision(2));
  console.log(framestring);


});
