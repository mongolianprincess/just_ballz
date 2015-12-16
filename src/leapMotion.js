var Leap = require("leapjs");
var Sphero = require("sphero");
var orb = Sphero("/dev/tty.Sphero-OPW-AMP-SPP", { timeout: 300});
var framestring, commandString, hand;
var controllerOptions = {enableGestures: true};

function concatData(id, data){
  return id + ": " + data;
}


console.log("out of leap loop");
Leap.loop(controllerOptions, function(frame) {
  if(frame.hands[0] != null){
    framestring =  frame.hands[0].grabStrength;
      if (framestring > 0.9 && commandString !== "Stop") {
        commandString = "Stop";
        stop();
      } else if(framestring < 0.1 && commandString !== "Go") {
        commandString = "Go";
        go();
      }
  }

});

function go(){
  console.log("Go");
}

function stop(){
  console.log("Stop");
}
