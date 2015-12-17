"use strict";
// var sphero = require("../");
var orb;

function MovementCommands (orb){
  this.orb = orb;
}

MovementCommands.prototype = {
  stop: function() {
    this.orb.stop();
    }
  };
