var Leap = require("leapjs");
var Sphero = require("sphero");
var orb = Sphero("/dev/tty.Sphero-RGO-AMP-SPP", { timeout: 300});
var options = { enableGestures: true };
var direction = 0;
var speed = 0;
var moveCommands = {
  "STRAIGHT AHEAD": 0,
  "SMALL RIGHT": 30,
  "MEDIUM RIGHT": 60,
  "LARGE RIGHT": 90,
  "REVERSE": 180,
  "LARGE LEFT": 270,
  "MEDIUM LEFT": 300,
  "SMALL LEFT": 330
};
var speedCommands = {
  "STOP": 0,
  "SLOW": 20,
  "MEDIUM": 50,
  "FAST": 100
};
// Main Leap Loop
var controller = new Leap.Controller(options);

orb.connect(function(){
  orb.color('yellow');
  orb.setBackLed();
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
        console.log(speedCommands[speed]);
        console.log(moveCommands[direction]);

        orb.roll(speedCommands[speed], moveCommands[direction]);
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
      if(hand.pitch() > 0.75) {
        orb.color('white');
        direction = "REVERSE";
      } else {
          orb.color("green");
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
      if (speed === "STOP") { console.log(speed); }
    };

    var handleLeft = function(hand) {
      var handHeight = hand.palmPosition[1];
      if(hand.grabStrength > 0.9) {
        orb.color('red');
        speed = "STOP";
      } else {
        if (handHeight > 250) {
          speed = 'FAST';
        } else if (handHeight > 130) {
          speed = 'MEDIUM';
        } else {
          speed = 'SLOW';
        }
      }

      console.log('Speed: ', speed);

    };

    controller.connect();
    console.log('waiting for the leap motion to connect');

});
