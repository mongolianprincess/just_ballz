var Leap = require("leapjs");
var Sphero = require("sphero");
var orb = Sphero("/dev/tty.Sphero-RGO-AMP-SPP", { timeout: 300});
var controller = new Leap.Controller();

orb.connect(listen);

function handleRight(hand) {
  var x = hand.palmPosition[0];
  var z = hand.palmPosition[2];
  var arctan = (Math.atan(Math.abs(x)/Math.abs(z))*180/Math.PI);
  console.log([x,z]);

  if (x > -40 && x < 30 && z > -20 && z < 30) {
    orb.roll(0,0);
  } else {
    if (x < 0 && z < 0) { orb.roll(60, (360 - arctan)); }
    if (x < 0 && z > 0) { orb.roll(60, (180 + arctan)); }
    if (x > 0 && z > 0) { orb.roll(60, (180 - arctan)); }
    if (x > 0 && z < 0) { orb.roll(60, arctan); }
  }

  if (hand.grabStrength > 0.9) {
    orb.roll(0,0);
    orb.disconnect(function() {
      console.log("Now disconnected from Sphero");
    });
  }
}

function listen() {

  console.log("Start Calibration");
  orb.setBackLed(127);
  orb.setStabilization(0, function(err, data) {
    console.log(err || "data " + data);
  });

  setTimeout(function() {
    orb.setHeading(0);
    orb.setBackLed(0);
    orb.setStabilization(1, function(err, data) {
      console.log(err || "data " + data);
    });
    console.log("Finish Calibration");
  }, 10000);


  controller.on('connect', function() {
    console.log('connected to leap motion');
    setInterval(function() {
      var frame = controller.frame();
      for (var i = 0, len = frame.hands.length; i < len; i++) {
        hand = frame.hands[i];
        if(hand){
          if (hand.type == 'right') {
            console.log(frame);
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
