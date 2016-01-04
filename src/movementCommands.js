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
  this.speeds = {
    SLOW: 25,
    MEDIUM: 50,
    FAST: 100
  };
  this._setColor = function(color) {
    this.orb.color(color);
  };
}

MovementCommands.prototype = {
  stop: function() {
    this.orb.stop();
    this._setColor('red');
  },
  roll: function(speed, direction){
    this.orb.roll(this.DEFAULT_SPEED, direction);
    this._setColor('blue');
  },
};
