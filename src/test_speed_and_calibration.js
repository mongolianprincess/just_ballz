var Leap = require("leapjs");
var Sphero = require("sphero");
var orb = Sphero("/dev/tty.Sphero-RGO-AMP-SPP", { timeout: 300});
var controller = new Leap.Controller();
var speed = 60;
var heading = 0;
var calibrating = false;

orb.connect(listen);

function handleRight(hand) {
  var x = hand.palmPosition[0];
  var z = hand.palmPosition[2];
  var arctan = (Math.atan(Math.abs(x)/Math.abs(z))*180/Math.PI);
  console.log([x,z]);

  if (x > -40 && x < 30 && z > -10 && z < 20) {
    orb.roll(0,0);
  } else {
    if (x < 0 && z < 0) { orb.roll(speed, (360 - arctan)); }
    if (x < 0 && z > 0) { orb.roll(speed, (180 + arctan)); }
    if (x > 0 && z > 0) { orb.roll(speed, (180 - arctan)); }
    if (x > 0 && z < 0) { orb.roll(speed, arctan); }
  }

}

function handleLeft(hand) {
  var x = hand.palmPosition[0];
  var y = hand.palmPosition[1];

  if (y > 50 && !calibrating) {
    speed += 1;
    console.log(speed);
  }

  if (y < 20 && !calibrating) {
    speed -= 1;
    console.log(speed);
  }

  if (x < -40 && calibrating) { //spin left incrementally by 5degrees
    heading += 5;
    orb.roll(0, heading);
  }

  if (x > 30 && calibrating) { //spin right decrementally by 5degrees
    heading -= 5;
    orb.roll(0, heading);
  }

  if (hand.pinchStrength > 0.9 && !calibrating) {
    orb.startCalibration();
    calibrating = true;
  }

  if (hand.grabStrength > 0.9 && calibrating) {
    calibrating = false;
    orb.finishCalibration();
  }

}

function listen() {

  controller.on('connect', function() {
    console.log('connected to leap motion');
    setInterval(function() {
      var frame = controller.frame();
      for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        if(hand){
          if (hand.type == 'right' && !calibrating) {
            handleRight(hand);
          }
          if (hand.type == 'left') {
            handleLeft(hand);
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

  orb.detectCollisions();

  orb.on("collision", function(data) {
    console.log("collision detected");
    console.log("  data:", data);

    orb.color("red");

    var opts = {
      lmode: 0x01,
      lpower: 180,
      rmode: 0x01,
      rpower: 180
    };

    orb.setRawMotors(opts, function(err, data) {
      console.log(err || "data: " + data);
    });

    setTimeout(function() {
      orb.color("green");
    }, 1000);

    orb.setStabilization(1, function(err, data) {
      console.log(err || "data: " + data);
    });

  });


}
