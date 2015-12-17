"use strict";
// var sphero = require("../");
var orb;

function MovementCommands (orb){
  this.orb = orb;
}

MovementCommands.prototype = {
  stop: function() {
    this.orb.stop();
    this.orb.color("red");
  },
  go: function(){
    this.orb.roll(50, 0);
  }
};
