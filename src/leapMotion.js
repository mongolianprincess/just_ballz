var Leap = require("leapjs");
var Sphero = require("sphero");

var orb = Sphero("/dev/tty.Sphero-RGO-AMP-SPP", { timeout: 300});



// wrapper connection function
orb.connect(function(){
orb.color("blue");


});
