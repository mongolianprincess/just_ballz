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

  if (x > -40 && x < 30 && z > -10 && z < 20) {
    orb.roll(0,0);
  } else {
    if (x < 0 && z < 0) { orb.roll(60, (360 - arctan)); }
    if (x < 0 && z > 0) { orb.roll(60, (180 + arctan)); }
    if (x > 0 && z > 0) { orb.roll(60, (180 - arctan)); }
    if (x > 0 && z < 0) { orb.roll(60, arctan); }
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
