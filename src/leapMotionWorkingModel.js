var Leap = require("leapjs");
var Sphero = require("sphero");
var keypress = require("keypress");
var orb = Sphero("/dev/tty.Sphero-RGO-AMP-SPP", { timeout: 300});
var controller = new Leap.Controller();

orb.connect(listen);

function handleRight(hand) {
  var handRoll = hand.roll();
  console.log(handRoll);

  if (hand.grabStrength > 0.9) {
    orb.stop();
  }
  if (hand.pinchStrength > 0.9) {
    orb.roll(60, 180);
  } else {
    if (handRoll < -0.7) {
      orb.roll(60, 90);
    }

    if (handRoll <= 0 && handRoll >= -0.15) {
      orb.roll(60, 0);
    }

    if (handRoll > 0.65) {
      orb.roll(60, 270);
    }

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
