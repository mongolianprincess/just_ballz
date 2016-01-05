var Leap = require("leapjs");
var Sphero = require("sphero");
var orb;
var controller = new Leap.Controller();
var counter = 0;
var collisionSystemActivated = false;
var colliding = false;
var x;
var z;
var arctan;
var inDeadZone;
var speed = 80;
var heading = 0;

function handleRight(hand) {

  if (hand.grabStrength > 0.9) {
    orb.roll(0,0);
    orb.disconnect(function() {
    });
  }

  moveSphero(hand);
}

function moveSphero(hand) {

  calculateHeading(hand);

  if (inDeadZone) {
    orb.roll(0,0);
  } else {
    orb.roll(speed, heading);
  }
}

function calculateHeading(hand) {

  calculateAngle(hand);

  var upperLeftQuadrant = x < 0 && z < 0;
  var lowerLeftQuadrant = x < 0 && z > 0;
  var lowerRightQuadrant = x > 0 && z > 0;
  var upperRightQuadrant = x > 0 && z < 0;
  inDeadZone = x > -40 && x < 30 && z > -20 && z < 30;

  if (upperLeftQuadrant) { heading = 360 - arctan; }
  if (lowerLeftQuadrant) { heading = 180 + arctan; }
  if (lowerRightQuadrant) { heading = 180 - arctan; }
  if (upperRightQuadrant) { heading = arctan; }
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

  if (collisionSystemActivated) {
    orb.detectCollisions();
    console.log("collision detection system activated");

    orb.on("collision", function() {
      colliding = !colliding;
      counter += 1;
      console.log("collisions: "+counter);

      if (colliding) {
        orb.color("red");
      } else {
        orb.color("purple");
      }

    });
  }

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

function startGame() {
  var name = process.argv[2];
  orb = Sphero("/dev/tty.Sphero-"+name+"-AMP-SPP", { timeout: 300});
  orb.connect(listen);
}

startGame();
