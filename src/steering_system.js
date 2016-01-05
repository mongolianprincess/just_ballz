var Leap = require("leapjs");
var Sphero = require("sphero");
var orb = Sphero("/dev/tty.Sphero-RGO-AMP-SPP", { timeout: 300});
var controller = new Leap.Controller();
var counter = 0;
var colliding = false;
var x;
var z;
var arctan;
var speed = 80;

orb.connect(listen);

function handleRight(hand) {

  moveSphero(hand);

  if (hand.grabStrength > 0.9) {
    orb.roll(0,0);
    orb.disconnect(function() {
    });
  }
}

function moveSphero(hand) {

  calculateAngle(hand);

  var inDeadZone = x > -40 && x < 30 && z > -20 && z < 30;
  var upperLeftQuadrant = x < 0 && z < 0;
  var lowerLeftQuadrant = x < 0 && z > 0;
  var lowerRightQuadrant = x > 0 && z > 0;
  var upperRightQuadrant = x > 0 && z < 0;

  if (inDeadZone) {
    orb.roll(0,0);
  } else {
    if (upperLeftQuadrant) { orb.roll(speed, (360 - arctan)); }
    if (lowerLeftQuadrant) { orb.roll(speed, (180 + arctan)); }
    if (lowerRightQuadrant) { orb.roll(speed, (180 - arctan)); }
    if (upperRightQuadrant) { orb.roll(speed, arctan); }
  }
}

function calculateAngle(hand) {
  x = hand.palmPosition[0];
  z = hand.palmPosition[2];
  arctan = (Math.atan(Math.abs(x)/Math.abs(z))*180/Math.PI);
}

function listen() {

  orb.color("purple");

  console.log("Start Calibration");
  orb.setBackLed(255);
  orb.setStabilization(0);

  setTimeout(function() {
    orb.setHeading(0);
    orb.setBackLed(0);
    orb.setStabilization(1);

    console.log("Finish Calibration");
  }, 10000);

  orb.detectCollisions();
  console.log("collision detection system activated");

  orb.on("collision", function() {
    colliding = !colliding;
    counter += 1;
    console.log(counter);
    console.log("collision detected");
    // console.log("  data:", data);

    if (colliding) {
      orb.color("red");
    } else {
      orb.color("purple");
    }

    //
    // var opts = {
    //   lmode: 0x01,
    //   lpower: 180,
    //   rmode: 0x01,
    //   rpower: 180
    // };
    //
    // orb.setRawMotors(opts, function(err, data) {
    //   console.log(err || "data: " + data);
    // });
    //
    // setTimeout(function() {
    //   orb.color("purple");
    // }, 200);
    //
    // orb.setStabilization(1, function(err, data) {
    //   console.log(err || "data: " + data);
    // });

  });

  controller.on('connect', function() {
    console.log('connected to leap motion');
    setInterval(function() {
      var frame = controller.frame();
      for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        if(hand){
          if (hand.type == 'right') {
            handleRight(hand);
          }
        }
      }
    }, 250);
  });

  controller.on('ready', function() {
      console.log('ready');
  });
  controller.on('deviceStreaming', function() {
      console.log('device connected');
  });
  controller.on('deviceStopped', function() {
      console.log('device disconnected');
  });

  controller.connect();
  console.log('waiting for the leap motion to connect');

}
