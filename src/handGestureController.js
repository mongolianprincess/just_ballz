var Leap = require("leapjs");

var options = { enableGestures: true };
var direction;
var speed;
// Main Leap Loop
var controller = new Leap.Controller(options);

controller.on('connect', function() {
  console.log('connected to leap motion');
  setInterval(function() {
    var frame = controller.frame();
    for (var i = 0, len = frame.hands.length; i < len; i++) {
      hand = frame.hands[i];
      if(hand){
        console.log(hand.type);
        if (hand.type == 'left') {
          handleLeft(hand);
        } else if (hand.type == 'right') {
          handleRight(hand);
        }
      }
    }
  }, 200);
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


var handleRight = function(hand) {
  var handRoll = hand.roll();
  if(hand.grabStrength > 0.9) {
    direction = "STOP";
  } else if(hand.pitch() > 0.75) {
    direction = "REVERSE";
  } else {
      if(handRoll < -0.7) {
        direction = 'LARGE RIGHT';
      } else if(handRoll < -0.375) {
        direction = 'MEDIUM RIGHT';
      } else if(handRoll < -0.15 ) {
        direction = 'SMALL RIGHT';
      } else if(handRoll <= 0 && handRoll >= -0.15) {
        direction = "STRAIGHT AHEAD";
      } else if(handRoll > 0.65) {
        direction = 'LARGE LEFT';
      } else if(handRoll > 0.375) {
        direction = 'MEDIUM LEFT';
      } else if(handRoll > 0.1) {
        direction = 'SMALL LEFT';
      }
    }

  console.log('Direction: ', direction);
};

var handleLeft = function(hand) {
  var handHeight = hand.palmPosition[1];
  if (handHeight > 250) {
    speed = 'FAST';
  } else if (handHeight > 130) {
    speed = 'MEDIUM';
  } else {
    speed = 'SLOW';
  }
  console.log('Speed: ', speed);
};

controller.connect();
console.log('waiting for the leap motion to connect');
