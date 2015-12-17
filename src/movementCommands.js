"use strict";
// var sphero = require("../");
var orb, directions;


function MovementCommands (orb){
  this.orb = orb;
  this.DEFAULT_SPEED = 50;
  this.directions = {
    FORWARD: 0,
    SMALL_RIGHT: 45,
    MEDIUM_RIGHT: 90,
    LARGE_RIGHT: 135,
    BACKWARD: 180,
    LARGE_LEFT: 225,
    MEDIUM_LEFT: 270,
    SMALL_LEFT: 315
  };
}

MovementCommands.prototype = {
  stop: function() {
    this.orb.stop();
    this.orb.color("red");
  },
  roll: function(speed, direction){
    this.orb.roll(this.DEFAULT_SPEED, direction);
    this.orb.color("blue");
  }
};
