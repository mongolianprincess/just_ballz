"use strict";
var sphero = require("../");
var orb = sphero(process.env.PORT);

function MovementCommands (orb){
  this.orb = orb;
  this.halt = function(){
    this.orb.stop();
  };
}
