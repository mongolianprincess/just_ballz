var Leap = require("leapjs");
var Sphero = require("sphero");
var keypress = require("keypress");
var orb = Sphero("/dev/tty.Sphero-RGO-AMP-SPP", { timeout: 300});


orb.connect(listen);

function handle(ch, key) {
  var stop = orb.roll.bind(orb, 0, 0),
      roll = orb.roll.bind(orb, 60);

  if (key.ctrl && key.name === "c") {
    process.stdin.pause();
    process.exit();
  }

  if (key.name === "e") {
    orb.startCalibration();
  }

  if (key.name === "q") {
    orb.finishCalibration();
  }

  if (key.name === "up") {
    roll(0);
  }

  if (key.name === "down") {
    roll(180);
  }

  if (key.name === "left") {
    roll(270);
  }

  if (key.name === "right") {
    roll(90);
  }

  if (key.name === "space") {
    stop();
  }
}

function listen() {
  keypress(process.stdin);
  process.stdin.on("keypress", handle);

  console.log("starting to listen for arrow key presses");

  process.stdin.setRawMode(true);
  process.stdin.resume();
}
